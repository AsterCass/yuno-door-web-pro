import {reactive} from 'vue';

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
    webChattingFocusChat: {
        chatId: "",
        userChattingData: [],
        webUserChattingDataBak: [],
        webScrollDisable: false,
        latestRead: false,
    },
    unReadAllMessages: new Set(),
    needBrowserNotification: true,
})




