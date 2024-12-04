import {chattingUsers} from "@/api/chat";
import {socketChatState} from "@/utils/global-state-no-save";
import {date} from "quasar";
import {useGlobalStateStore} from "@/utils/global-state";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "webstomp-client";
import {browserNotification, notifyTopWarning} from "@/utils/notification-tools";

const BASE_ADD = process.env.VUE_APP_BASE_ADD
const emojiRegex = /\[#b[0-9][0-9]]/g;
const emojiCodeFormat = "[#b%s]"

function singleDateTimeBuilder(obj, nowDateTime) {
    let sendDateTime = new Date(obj.sendDate).getTime()
    let waitSec = (nowDateTime - sendDateTime) / 1000
    if (waitSec < 60) {
        obj.webChatLabel = "刚刚"
    } else if (waitSec < 3600) {
        obj.webChatLabel = Math.floor(waitSec / 60) + "分钟前"
    } else if (waitSec < 3600 * 3) {
        obj.webChatLabel = Math.floor(waitSec / 3600) + "小时前"
    } else if (waitSec < 3600 * 24) {
        obj.webChatLabel = date.formatDate(sendDateTime, 'HH:mm')
    } else {
        obj.webChatLabel = date.formatDate(sendDateTime, 'YYYY-MM-DD HH:mm')
    }
}

function messageTimeLabelBuilder(list) {
    if (!list || 0 === list.length) {
        return
    }
    let nowDateTime = new Date()
    let lastIndex = list.length - 1
    for (let count = lastIndex; count >= 0; --count) {
        let sendDateTime = new Date(list[count].sendDate).getTime()
        let waitLastSec = null
        let waitSec = (nowDateTime - sendDateTime) / 1000
        if (count < lastIndex) {
            let lastSendDateTime = new Date(list[count + 1].sendDate).getTime()
            waitLastSec = (lastSendDateTime - sendDateTime) / 1000
        }
        if (waitSec < 60) {
            list[count].webChatLabel = "刚刚"
        } else if (waitSec < 3600) {
            list[count].webChatLabel = Math.floor(waitSec / 60) + "分钟前"
        } else if (waitSec < 3600 * 3) {
            list[count].webChatLabel = Math.floor(waitSec / 3600) + "小时前"
        } else if (waitSec < 3600 * 24) {
            list[count].webChatLabel = date.formatDate(sendDateTime, 'HH:mm')
        } else {
            list[count].webChatLabel = date.formatDate(sendDateTime, 'YYYY-MM-DD HH:mm')
        }
        if (waitLastSec && waitLastSec < 600) {
            list[count + 1].webChatLabel = ""
        }


        // let message = list[count].message
        // const emojiSet = new Set();
        // let matches;
        // while ((matches = emojiRegex.exec(message)) !== null) {
        //     emojiSet.add(matches[0])
        // }
        // if (emojiSet.size > 0) {
        //     for (let emoji of emojiSet) {
        //         const createImg = document.createElement("img");
        //         createImg.src = require("@/assets/emoji/bili/bili-" + emoji.substring(3, 5) + ".png")
        //         createImg.style = "height: 1.5rem;margin: 0 .15rem -.35rem .15rem"
        //         const imgElToString = createImg.outerHTML
        //         list[count].message = list[count].message.replaceAll(emoji, imgElToString)
        //     }
        // }
        // todo 表情输出支持：颜文字、普通emoji，颜文字最好支持使用代码，如果输入某个代码，在输入框自动转换成颜文字
    }
}

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
            singleDateTimeBuilder(obj, nowDateTime);
            list.push(obj)
        } else {
            let lastSendDateTime = new Date(list[list.length - 1].sendDate).getTime()
            let waitLastSec = (nowDateTime - lastSendDateTime) / 1000
            if (waitLastSec < 600) {
                obj.webChatLabel = ""
            } else {
                singleDateTimeBuilder(obj, nowDateTime);
            }
            list.push(obj)
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
    if (!alreadyInChatList) {
        chattingDataInit()
    }
    if (socketChatState.needBrowserNotification && globalState.userData) {
        if (globalState.userData.id !== data.sendUserId) {
            browserNotification(`来自 ${data.sendUserNickname} 的新消息`, data.sendMessage)
        }
    }
}

export function chattingDataInit() {
    const globalState = useGlobalStateStore()

    chattingUsers().then(res => {
        if (!res || !res.data || !res.data.data || 0 === res.data.data.length) {
            socketChatState.chattingData = []
            socketChatState.webChattingFocusChat = undefined
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
            messageTimeLabelBuilder(socketChatState.webChattingFocusChat.userChattingData)
            //todo 如果打开某个聊天框，并且这个聊天框内容有未读，则存入浏览器缓存，并将已读消息发送到后端
        }
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
