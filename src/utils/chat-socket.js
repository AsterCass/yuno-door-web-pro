import {chattingUsers} from "@/api/chat";
import {socketChatState} from "@/utils/global-state-no-save";
import {date} from "quasar";
import {useGlobalStateStore} from "@/utils/global-state";

const BASE_ADD = process.env.VUE_APP_BASE_ADD
const emojiRegex = /\[#b[0-9][0-9]]/g;
const emojiCodeFormat = "[#b%s]"


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
    }
}


export function chattingDataInit(loadAll) {
    const globalState = useGlobalStateStore()

    chattingUsers().then(res => {
        if (!res || !res.data || !res.data.data || 0 === res.data.data.length) {
            socketChatState.chattingData = []
            socketChatState.webChattingFocusChat = undefined
            return
        }
        socketChatState.chattingData = res.data.data
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
            }
        })
        //简单构建后面就不用执行了
        if (!loadAll) {
            return
        }
        let firstChattingLen = socketChatState.chattingData[0].userChattingData.length
        if (0 !== firstChattingLen) {
            socketChatState.webChattingFocusChat = socketChatState.chattingData[0]
            messageTimeLabelBuilder(socketChatState.webChattingFocusChat.userChattingData)
            //todo 如果打开某个聊天框，并且这个聊天框内容有未读，则存入浏览器缓存，并将已读消息发送到后端
        }
    })
}
