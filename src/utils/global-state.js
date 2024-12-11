import {defineStore} from 'pinia';
import {chattingDataInit, initChatSocket} from "@/utils/chat-socket";

export function createPersistedStatePlugin() {
    return (context) => {
        const {store} = context;

        // 从 Local Storage 加载初始状态
        const savedState = localStorage.getItem(store.$id);
        if (savedState) {
            store.$patch(JSON.parse(savedState));
        }

        // 监听 store 变化并保存到 Local Storage
        store.$subscribe((mutation, state) => {
            localStorage.setItem(store.$id, JSON.stringify(state));
        });
    };
}

export const useGlobalStateStore = defineStore('globalState', {
    state: () => ({
        curThemeName: 'light',
        hideScroller: true,
        language: 'en',
        saveLoginData: true,
        screenMini: false,
        isLogin: false,
        loginToken: "",
        userData: null,
        allowBrowserNotification: true,
        readMessageMap: {},
        pinChatIdMap: {},
    }),
    actions: {
        updateTheme(code) {
            this.curThemeName = code;
        },
        updateHideScroller(isHide) {
            this.hideScroller = isHide;
        },
        updateLanguage(code) {
            this.language = code;
        },
        updateSaveLoginData(isSave) {
            this.saveLoginData = isSave;
        },
        updateScreenMini(isMini) {
            this.screenMini = isMini;
        },
        updateToken(token) {
            if (token) {
                this.isLogin = true;
                this.loginToken = token;
            } else {
                this.isLogin = false;
                this.loginToken = "";
                this.userData = null
            }
            chattingDataInit(true)
            initChatSocket()
        },
        updateUserData(data) {
            this.userData = data
        },
        updateAllowBrowserNotification(isAllowBrowser) {
            this.allowBrowserNotification = isAllowBrowser
        },
        updateReadMessageMap(chatId, messageId) {
            this.readMessageMap[chatId] = messageId;
        },
        addPinChat(chatId, data) {
            this.pinChatIdMap[chatId] = data
        },
        deletePinChat(chatId) {
            this.pinChatIdMap[chatId] = undefined
        }
    },
});