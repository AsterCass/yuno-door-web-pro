import {chattingUsers, readMessage} from "@/api/chat";
import {socketChatState} from "@/utils/global-state-no-save";
import {useGlobalStateStore} from "@/utils/global-state";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "webstomp-client";
import {browserNotification, notifyTopWarning} from "@/utils/notification-tools";
import i18n from "@/i18n";
import {date} from "quasar";
import {ZodiacSign} from "@/utils/date-to-zodiac";
import {delay, gotoSpecifySite} from "@/utils/base-tools";

const t = i18n.global.t
const BASE_ADD = process.env.VUE_APP_BASE_ADD
const emojiRegex = /\[#b[0-9][0-9]]/g;
const emojiCodeFormat = "[#b%s]"

function buildStarZodiac(birth, outputData) {
    if (!birth || typeof birth !== "string") {
        return
    }
    const birthday = new Date(date.formatDate(birth))
    const ret = new ZodiacSign(birthday, 'zh')
    outputData.chatUserStar = ret.sign
    outputData.chatUserZodiac = ret.chinese.sign
}

function timeTextSwitch(diff, thisTime, currentTime, withTime) {
    let label = ""
    let type = 0
    if (diff <= 1) {
        label = t('main_chat_chat_time_now')
        type = 1
    } else if (diff < 60) {
        label = diff + " " + t('main_chat_chat_time_min')
        type = 1
    } else if (thisTime.getFullYear() !== currentTime.getFullYear()) {
        if (withTime) {
            label = date.formatDate(thisTime, "YYYY-MM-DD HH:mm")
        } else {
            label = date.formatDate(thisTime, "YYYY/MM/DD")
        }
        type = 2
    } else if (thisTime.getMonth() !== currentTime.getMonth()) {
        if (withTime) {
            label = date.formatDate(thisTime, "MM-DD HH:mm")
        } else {
            label = date.formatDate(thisTime, "MM/DD")
        }
        type = 2
    } else if (thisTime.getDay() !== currentTime.getDay()) {
        if (withTime) {
            label = date.formatDate(thisTime, "MM-DD HH:mm")
        } else {
            label = date.formatDate(thisTime, "MM/DD")
        }
        type = 2
    } else {
        label = date.formatDate(thisTime, "HH:mm")
        type = 2
    }
    return {label: label, type: type}
}

function timeToText(time) {
    if (!time || typeof time !== 'string') return ""
    const thisTime = new Date(date.formatDate(time))
    const currentTime = new Date()
    const unit = 'minutes'
    const diff = date.getDateDiff(currentTime, thisTime, unit)
    return timeTextSwitch(diff, thisTime, currentTime).label
}

// todo 表情输出支持：颜文字、普通emoji，颜文字最好支持使用代码，如果输入某个代码，在输入框自动转换成颜文字

export function messageTimeLabelBuilder(list) {
    if (!list || 0 === list.length) {
        return
    }
    //从某个标签开始渲染
    let onlyLastStartBuild = false
    //build
    const currentTime = new Date()
    let lastTime = new Date()
    const unit = 'minutes'
    for (let count = 0; count < list.length; ++count) {
        //如果没有被渲染过，从头渲染，否则从type为1的地方开始渲染
        if (list[count].webTimeLabelType === 1) {
            onlyLastStartBuild = true
        }
        if (0 === count && !list[count].webTimeLabel) {
            onlyLastStartBuild = true
        }
        if (!onlyLastStartBuild) {
            continue
        }
        //build one
        const thisTime = new Date(date.formatDate(list[count].sendDate))
        const diff = date.getDateDiff(currentTime, thisTime, unit)
        const diffWithLast = Math.abs(date.getDateDiff(thisTime, lastTime, unit))
        lastTime = thisTime
        if (diffWithLast <= 5) {
            continue
        }
        let webTimeLabelType = timeTextSwitch(diff, thisTime, currentTime, true)
        list[count].webTimeLabel = webTimeLabelType.label
        list[count].webTimeLabelType = webTimeLabelType.type
    }
}

export function updateChattingDataWebAboutLast(chat) {
    if (!socketChatState.chattingDataWeb || socketChatState.chattingDataWeb.length === 0) {
        return
    }
    const chatTree = socketChatState.chattingDataWeb[chat.chatType]
    if (!chatTree || !chatTree.children || chatTree.children.length === 0) {
        return
    }

    //更改最后一条时间、内容等
    let currentIndex = 0
    for (let index = 0; index < chatTree.children.length; ++index) {
        if (chatTree.children[index].id === chat.chatId) {
            chatTree.children[index].lastMessageTime = chat.lastMessageTime
            chatTree.children[index].lastMessageTimeWeb = timeToText(chat.lastMessageTime)
            chatTree.children[index].lastMessageText = chat.lastMessageText
            chatTree.children[index].lastMessageId = chat.lastMessageId
            chatTree.children[index].latestRead = chat.latestRead
            currentIndex = index
        }
    }
    //将当前对话置顶
    if (currentIndex > 0) {
        const mvElement = chatTree.children[currentIndex]
        chatTree.children.splice(currentIndex, 1);
        chatTree.children.unshift(mvElement);
    }
}

export function rebuildChattingDataWeb(selectFirst) {

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
            singleChattingWeb.chatType = singleChatting.chatType
            singleChattingWeb.latestRead = singleChatting.latestRead
            singleChattingWeb.lastMessageTime = singleChatting.lastMessageTime
            singleChattingWeb.lastMessageTimeWeb = timeToText(singleChatting.lastMessageTime)
            singleChattingWeb.lastMessageText = singleChatting.lastMessageText
            singleChattingWeb.lastMessageId = singleChatting.lastMessageId
            singleChattingWeb.chatUserRoleType = singleChatting.chatUserRoleType
            singleChattingWeb.chatUserGender = singleChatting.chatUserGender
            singleChattingWeb.chatUserBirth = singleChatting.chatUserBirth
            singleChattingWeb.chatUserMotto = singleChatting.chatUserMotto
            singleChattingWeb.socialLink = singleChatting.socialLink
            //私聊对象渲染
            if (0 === singleChattingWeb.chatType) {
                buildStarZodiac(singleChattingWeb.chatUserBirth, singleChatting)
            }
            //push
            socketChatState.chattingDataWeb[singleChatting.chatType].children.push(singleChattingWeb)
            if (!insertFirstChat && selectFirst) {
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

            // 如果当前聊天框已经在底部，或者为本人发送就需要自动将鼓滚动条再次拉到底部
            let chatScrollerDiv =
                document.getElementById("chat-body-infinite-id-" + singleChatting.chatId)
            let needToBottom = false
            if (chatScrollerDiv) {
                const isAtBottom = chatScrollerDiv.scrollHeight -
                    chatScrollerDiv.scrollTop - chatScrollerDiv.clientHeight < 5;
                if (isAtBottom || (globalState.userData && globalState.userData.id === data.sendUserId)) {
                    needToBottom = true
                }
            }

            //数据插入
            singleChatting.userChattingData.push(
                {
                    messageId: data.sendMessageId,
                    sendUserId: data.sendUserId,
                    sendUserAvatar: data.sendUserAvatar,
                    sendUserNickname: data.sendUserNickname,
                    sendUserGender: data.sendUserGender,
                    sendUserRoleType: data.sendUserRoleType,
                    message: data.sendMessage,
                    sendDate: data.sendDate,
                }
            )
            singleChatting.lastMessageTime = data.sendDate
            singleChatting.lastMessageId = data.sendMessageId
            singleChatting.lastMessageText = data.sendMessage
            messageTimeLabelBuilder(singleChatting.userChattingData)
            //发送已读消息
            if (socketChatState.chattingDataWebSelected === singleChatting.chatId && needToBottom) {
                singleChatting.latestRead = true
                if (globalState.userData.id !== data.sendUserId) {
                    readMessage({
                        chatId: data.fromChatId,
                        messageId: data.sendMessageId
                    }).then(r => {
                    })
                } else if (!globalState.isLogin) {
                    globalState.updateReadMessageMap(
                        data.fromChatId, data.sendMessageId
                    )
                }
            } else {
                singleChatting.latestRead = false
            }
            //数据同步到聊天树
            updateChattingDataWebAboutLast(singleChatting)
            // 如果当前聊天框已经在底部，或者为本人发送就需要自动将鼓滚动条再次拉到底部
            if (needToBottom) {
                delay(100).then(() => {
                    gotoSpecifySite(chatScrollerDiv, chatScrollerDiv.scrollHeight)
                })
            }
        }
        //更新当前新消息数量
        if (!singleChatting.latestRead) {
            socketChatState.unReadAllMessages.add(singleChatting.chatId)
        }
    }
    // //不在列表中，则重新加载，在列表中直接重新构建侧边栏
    // if (!alreadyInChatList) {
    //     chattingDataInit()
    // } else {
    //     rebuildChattingDataWeb()
    // }
    if (socketChatState.needBrowserNotification && globalState.userData) {
        if (globalState.userData.id !== data.sendUserId) {
            browserNotification(`来自 ${data.sendUserNickname} 的新消息`, data.sendMessage)
        }
    }
}

let chattingDataInitStatus = false

export function chattingDataInit(selectFirst = false) {
    if (chattingDataInitStatus) {
        return
    }
    chattingDataInitStatus = true
    const globalState = useGlobalStateStore()

    chattingUsers().then(res => {
        //check
        if (!res || !res.data || !res.data.data || 0 === res.data.data.length) {
            socketChatState.chattingData = []
            chattingDataInitStatus = false
            return
        }
        //build
        socketChatState.webChattingFocusChat = null
        socketChatState.chattingDataWebSelected = null
        socketChatState.chattingData = res.data.data
        socketChatState.unReadAllMessages.clear()
        socketChatState.chattingData.forEach(data => {
            if (!data.userChattingData) {
                data.userChattingData = []
            } else {
                data.userChattingData = data.userChattingData.reverse()
            }
            //用户在不同聊天框的输入
            data.webInputText = ""
            //侧片栏生效
            data.chatScrollDisable = false
            //群成员渲染
            if (data.chatGroupUsers && data.chatGroupUsers.length > 11) {
                data.chatGroupUsers = data.chatGroupUsers.slice(0, 11)
                data.chatGroupUserMany = true
            }
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
        // let firstChattingLen = socketChatState.chattingData[0].userChattingData.length
        // if (0 !== firstChattingLen) {
        //     socketChatState.webChattingFocusChat = socketChatState.chattingData[0]
        //     //messageTimeLabelBuilder(socketChatState.webChattingFocusChat.userChattingData)
        //     //todo 如果打开某个聊天框，并且这个聊天框内容有未读，则存入浏览器缓存，并将已读消息发送到后端
        // }
        rebuildChattingDataWeb(selectFirst)
        chattingDataInitStatus = false
    })
}

let socketSendStatus = false

export function socketSend(chatId, message) {
    if (socketSendStatus) {
        return
    }
    socketSendStatus = true
    if (socketChatState.stompClient && socketChatState.socketConnected) {
        const msg = {chatId: chatId, message: message};
        socketChatState.stompClient.send("/socket/message/send", JSON.stringify(msg));
    }
    socketSendStatus = false
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
