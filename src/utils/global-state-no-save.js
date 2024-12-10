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
    socket: null,
    socketConnected: false,
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
})


watch(
    () => socketChatState.chattingDataWebSelected,
    (newValue) => {

        //todo 切换聊天框的时候页面有抖动

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
                    readMessage({
                        chatId: singleChatting.chatId,
                        messageId: singleChatting.lastMessageId
                    }).then(r => {
                    })
                    //数据同步到聊天树
                    updateChattingDataWebAboutLast(singleChatting)
                }
            }
        }

        if (!inChattingData) {
            socketChatState.webChattingFocusChat = null
        }
    }
);




