import {reactive, watch} from 'vue';

export const scrollState = reactive({
    scrollTop: 0,
    scrollLeft: 0,
});

export const socketChatState = reactive({
    stompClient: null,
    socket: null,
    socketConnected: false,
    chattingData: [],
    chattingDataWeb: [],
    chattingDataWebExpand: [],
    chattingDataWebSelected: null,
    webChattingFocusChat: null,
    unReadAllMessages: new Set(),
    needBrowserNotification: true,
})


watch(
    () => socketChatState.chattingDataWebSelected,
    (newValue) => {
        if (!newValue || !socketChatState.chattingData || socketChatState.chattingData.length === 0) {
            socketChatState.webChattingFocusChat = undefined
            return
        }

        let inChattingData = false
        for (const singleChatting of socketChatState.chattingData) {
            if (singleChatting.chatId === newValue) {
                inChattingData = true
                socketChatState.webChattingFocusChat = singleChatting
            }
            //web render
            if (socketChatState.webChattingFocusChat.chatGroupUsers
                && socketChatState.webChattingFocusChat.chatGroupUsers.length > 11) {
                socketChatState.webChattingFocusChat.chatGroupUsers =
                    socketChatState.webChattingFocusChat.chatGroupUsers.slice(0, 11)
                socketChatState.webChattingFocusChat.chatGroupUserMany = true
            }
        }

        if (!inChattingData) {
            socketChatState.webChattingFocusChat = undefined
        }
    }
);




