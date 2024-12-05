import {chattingUsers} from "@/api/chat";
import {socketChatState} from "@/utils/global-state-no-save";
import {useGlobalStateStore} from "@/utils/global-state";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "webstomp-client";
import {browserNotification, notifyTopWarning} from "@/utils/notification-tools";
import i18n from "@/i18n";
import {date} from "quasar";

const t = i18n.global.t
const BASE_ADD = process.env.VUE_APP_BASE_ADD
const emojiRegex = /\[#b[0-9][0-9]]/g;
const emojiCodeFormat = "[#b%s]"

function timeToText(time) {
    if (!time || typeof time !== 'string') return ""
    const thisTime = new Date(date.formatDate(time))
    const currentTime = new Date()
    const unit = 'minutes'
    const diff = date.getDateDiff(currentTime, thisTime, unit)

    let label = ""
    if (diff <= 1) {
        label = "刚刚"
    } else if (diff < 60) {
        label = diff + " 分钟前"
    } else if (diff < 60 * 4) {
        label = Math.floor(diff / 60) + " 小时前"
    } else if (thisTime.getFullYear() !== currentTime.getFullYear()) {
        label = date.formatDate(thisTime, "YYYY/MM/DD")
    } else if (thisTime.getMonth() !== currentTime.getMonth()) {
        label = date.formatDate(thisTime, "MM/DD")
    } else if (thisTime.getDay() !== currentTime.getDay()) {
        label = date.formatDate(thisTime, "MM/DD")
    } else {
        label = date.formatDate(thisTime, "HH:mm")
    }

    return label
}

// todo 表情输出支持：颜文字、普通emoji，颜文字最好支持使用代码，如果输入某个代码，在输入框自动转换成颜文字

export function messageTimeLabelInput(list, obj) {
    if (list) {
        //emoji
        let message = obj.message
        const emojiSet = new Set();
        let matches;
        while ((matches = emojiRegex.exec(message)) !== null) {
            emojiSet.add(matches[0])
        }
        if (emojiSet.size > 0) {
            // for (let emoji of emojiSet) {
            //     const createImg = document.createElement("img");
            //     createImg.src = require("@/assets/emoji/bili/bili-" + emoji.substring(3, 5) + ".png")
            //     createImg.style = "height: 1.5rem;margin: 0 .15rem -.35rem .15rem"
            //     const imgElToString = createImg.outerHTML
            //     obj.message = obj.message.replaceAll(emoji, imgElToString)
            // }
        }
        //date
        let nowDateTime = new Date()
        if (0 === list.length) {
            //singleDateTimeBuilder(obj, nowDateTime);
            list.push(obj)
        } else {
            let lastSendDateTime = new Date(list[list.length - 1].sendDate).getTime()
            let waitLastSec = (nowDateTime - lastSendDateTime) / 1000
            if (waitLastSec < 600) {
                obj.webChatLabel = ""
            } else {
                //singleDateTimeBuilder(obj, nowDateTime);
            }
            list.push(obj)
        }
    }
}

function rebuildChattingDataWeb() {

    //未初始化的列表，展示所有非0组
    let chattingDataWebInitialized =
        socketChatState.chattingDataWeb && socketChatState.chattingDataWeb.length > 0

    socketChatState.chattingDataWeb = [
        {
            id: 'main_chat_type_con',
            label: t('main_chat_type_con'),
            selectable: false,
            children: [
                {
                    noContent: true,
                    label: t('main_chat_no_content'),
                    selectable: false,
                },
            ],
        },
        {
            id: 'main_chat_type_group',
            label: t('main_chat_type_group'),
            selectable: false,
            children: [
                {
                    noContent: true,
                    label: t('main_chat_no_content'),
                    selectable: false,
                },
            ],
        },
        {
            id: 'main_chat_type_ann',
            label: t('main_chat_type_ann'),
            selectable: false,
            children: [
                {
                    noContent: true,
                    label: t('main_chat_no_content'),
                    selectable: false,
                },
            ],
        },
        {
            id: 'main_chat_type_group_public',
            label: t('main_chat_type_group_public'),
            selectable: false,
            children: [
                {
                    noContent: true,
                    label: t('main_chat_no_content'),
                    selectable: false,
                },
            ],
        },
    ]

    if (socketChatState.chattingData && socketChatState.chattingData.length > 0) {
        let insertFirstChat = false
        for (let singleChatting of socketChatState.chattingData) {
            let singleChattingWeb = {}
            //base
            singleChattingWeb.id = singleChatting.chatId
            singleChattingWeb.label = singleChatting.chatName
            singleChattingWeb.avatar = singleChatting.chatAvatar
            //more
            singleChattingWeb.latestRead = singleChatting.latestRead
            singleChattingWeb.lastMessageTime = singleChatting.lastMessageTime
            singleChattingWeb.lastMessageTimeWeb = timeToText(singleChatting.lastMessageTime)
            singleChattingWeb.lastMessageText = singleChatting.lastMessageText
            singleChattingWeb.lastMessageId = singleChatting.lastMessageId
            singleChattingWeb.chatUserRoleType = singleChatting.chatUserRoleType
            singleChattingWeb.chatUserGender = singleChatting.chatUserGender
            //push
            socketChatState.chattingDataWeb[singleChatting.chatType].children.push(singleChattingWeb)
            if (!insertFirstChat) {
                socketChatState.chattingDataWebSelected = singleChattingWeb.id
                insertFirstChat = true
            }
        }
    }

    for (let singleChattingWeb of socketChatState.chattingDataWeb) {
        const realSum = singleChattingWeb.children.length - 1
        singleChattingWeb.label = singleChattingWeb.label + " (" + realSum + ")"
        if (!chattingDataWebInitialized && realSum > 0) {
            socketChatState.chattingDataWebExpand.push(singleChattingWeb.id)
        }
        if (singleChattingWeb.children.length > 1) {
            singleChattingWeb.children.shift()
        }
    }

}


function socketMsgReceiveDataParse(callback) {
    const globalState = useGlobalStateStore()

    const data = JSON.parse(callback.body)
    socketChatState.unReadAllMessages.clear()
    //如果已经在聊天列表中，那么更新列表，如果不在列表中，则重新加载
    let alreadyInChatList = false
    for (let singleChatting of socketChatState.chattingData) {
        if (singleChatting.chatId === data.fromChatId) {
            alreadyInChatList = true
            messageTimeLabelInput(singleChatting.userChattingData, {
                chatTimeStamp: 0,
                messageId: data.sendMessageId,
                sendUserId: data.sendUserId,
                sendUserAvatar: data.sendUserAvatar,
                sendUserNickname: data.sendUserNickname,
                sendUserGender: data.sendUserGender,
                sendUserRoleType: data.sendUserRoleType,
                message: data.sendMessage,
                sendDate: data.sendDate,
            })
            //todo 该聊天框打开状态，则存入浏览器缓存，并将已读消息发送到后端
            if (socketChatState.webChattingFocusChat === data.fromChatId) {
                //
            } else {
                singleChatting.latestRead = false
            }
            //todo 页面滑动到新消息位置
        }
        //更新当前新消息数量
        if (!singleChatting.latestRead) {
            socketChatState.unReadAllMessages.add(singleChatting.chatId)
        }
    }
    //不在列表中，则重新加载，在列表中直接重新构建侧边栏
    console.log(alreadyInChatList)
    if (!alreadyInChatList) {
        chattingDataInit()
    } else {
        rebuildChattingDataWeb()
    }
    if (socketChatState.needBrowserNotification && globalState.userData) {
        if (globalState.userData.id !== data.sendUserId) {
            browserNotification(`来自 ${data.sendUserNickname} 的新消息`, data.sendMessage)
        }
    }
}

let chattingDataInitStatus = false

export function chattingDataInit() {
    if (chattingDataInitStatus) {
        return
    }
    chattingDataInitStatus = true
    const globalState = useGlobalStateStore()

    chattingUsers().then(res => {
        if (!res || !res.data || !res.data.data || 0 === res.data.data.length) {
            socketChatState.chattingData = []
            socketChatState.webChattingFocusChat = undefined
            chattingDataInitStatus = false
            return
        }
        socketChatState.chattingData = res.data.data
        socketChatState.unReadAllMessages.clear()
        socketChatState.chattingData.forEach(data => {
            if (!data.userChattingData) {
                data.userChattingData = []
            } else {
                data.userChattingData = data.userChattingData.reverse()
            }
            data.webInputText = ""
            //如果用户未登录，用浏览器缓存数据判断是否已读
            if (!globalState.isLogin) {
                data.latestRead = globalState.readMessageMap[data.chatId] === data.lastMessageId
                if (!data.latestRead) {
                    socketChatState.unReadAllMessages.add(data.chatId)
                }
            } else {
                if (!data.latestRead) {
                    socketChatState.unReadAllMessages.add(data.chatId)
                }
            }
        })
        let firstChattingLen = socketChatState.chattingData[0].userChattingData.length
        if (0 !== firstChattingLen) {
            socketChatState.webChattingFocusChat = socketChatState.chattingData[0]
            //messageTimeLabelBuilder(socketChatState.webChattingFocusChat.userChattingData)
            //todo 如果打开某个聊天框，并且这个聊天框内容有未读，则存入浏览器缓存，并将已读消息发送到后端
        }
        rebuildChattingDataWeb()
        chattingDataInitStatus = false
    })
}

let initChatSocketStatus = false

export function initChatSocket() {
    if (initChatSocketStatus) {
        return
    }
    initChatSocketStatus = true
    const globalState = useGlobalStateStore()

    if (!globalState.isLogin) {
        if (socketChatState.stompClient) {
            socketChatState.stompClient.disconnect();
            socketChatState.stompClient = null
            socketChatState.socket = null
        }
        socketChatState.socketConnected = false;
        initChatSocketStatus = false
        return
    }

    if (socketChatState.stompClient && socketChatState.stompClient.connected && socketChatState.socketConnected) {
        initChatSocketStatus = false
        return
    }

    socketChatState.socket = new SockJS(BASE_ADD +
        "yui/chat-websocket/socketAuthNoError?User-Token=" + globalState.loginToken)
    socketChatState.stompClient = Stomp.over(socketChatState.socket)
    socketChatState.stompClient.connect(
        {},
        () => {
            socketChatState.socketConnected = true;
            socketChatState.stompClient.subscribe("/user/" + globalState.loginToken + "/message/receive", callback => {
                socketMsgReceiveDataParse(callback);
            });
            socketChatState.stompClient.subscribe("/user/all/message/receive", callback => {
                socketMsgReceiveDataParse(callback);
            });
            socketChatState.stompClient.subscribe("/user/" + globalState.loginToken + "/error/receive", callback => {
                notifyTopWarning(callback.body)
            });
            initChatSocketStatus = false
        },
        () => {
            socketChatState.socketConnected = false;
            initChatSocketStatus = false
        }
    )

}
