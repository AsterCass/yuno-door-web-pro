import {reactive, watch} from 'vue';
import {messageTimeLabelBuilder, updateChattingDataWebAboutLast} from "@/utils/chat-socket";
import {useGlobalStateStore} from "@/utils/global-state";
import {readMessage} from "@/api/chat";

export const scrollState = reactive({
    scrollTop: 0,
    scrollLeft: 0,
});

export const socketChatState = reactive({
    stompClient: null,
    socketConnected: false,
    // 强制聚焦的聊天，正常进入聊天界面会聚焦最新聊天，当该对象有值的时候，会聚焦该聊天
    forceFocusChat: {},
    //原生数据 + web渲染
    chattingData: [],
    //转化为树结构数据
    chattingDataWeb: [],
    //树结构当前展开树列表
    chattingDataWebExpand: [],
    //当前选中叶子节点chatId
    chattingDataWebSelected: null,
    //当前选中叶子节点数据，由原生数据赋值，此时数据为引用，对于数据的改变会影响chattingData的数据
    webChattingFocusChat: null,
    //未读消息chatId，一个聊天只算一个
    unReadAllMessages: new Set(),
    //是否需要浏览器通知，如果用户当前在聊天页面则不需要发送浏览器通知
    needBrowserNotification: true,
    //聊天滚动条，用于每次切换聊天，滚动条发到底部
    chatBodyScrollerOut: null,
})


watch(
    () => socketChatState.chattingDataWebSelected,
    (newValue) => {

        if (!newValue || !socketChatState.chattingData || socketChatState.chattingData.length === 0) {
            socketChatState.webChattingFocusChat = null
            return
        }

        const globalState = useGlobalStateStore()

        //赋值
        let inChattingData = false
        for (const singleChatting of socketChatState.chattingData) {
            if (singleChatting.chatId === newValue) {
                inChattingData = true
                socketChatState.webChattingFocusChat = singleChatting
                //重新渲染时间label
                messageTimeLabelBuilder(socketChatState.webChattingFocusChat.userChattingData)
                //已读所有内容
                if (!singleChatting.latestRead && globalState.isLogin) {
                    singleChatting.latestRead = true
                    if (singleChatting.lastMessageId) {
                        readMessage({
                            chatId: singleChatting.chatId,
                            messageId: singleChatting.lastMessageId
                        }).then(r => {
                        })
                    }
                } else if (!singleChatting.latestRead) {
                    singleChatting.latestRead = true
                    globalState.updateReadMessageMap(singleChatting.chatId, singleChatting.lastMessageId)
                }
                //数据同步到标记
                if (globalState.pinChatIdMap[singleChatting.chatId]) {
                    globalState.pinChatIdMap[singleChatting.chatId].read = singleChatting.latestRead
                }
                //数据同步到聊天树
                updateChattingDataWebAboutLast(singleChatting, false)
            }
        }

        if (!inChattingData) {
            socketChatState.webChattingFocusChat = null
        }
    }
);




