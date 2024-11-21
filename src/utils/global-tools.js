import i18n from '@/i18n';
import {Quasar} from 'quasar'
import zh from 'quasar/lang/zh-CN'
import en from 'quasar/lang/en-US'
import {useGlobalStateStore} from '@/utils/global-state';
import {isMiniScreenMethod} from "@/utils/base-tools";

export function initGlobalState() {
    const globalState = useGlobalStateStore();
    //theme
    document.documentElement.setAttribute('data-theme', globalState.curThemeName);
    //show scroller bar
    document.documentElement.setAttribute('hide-scrollbar', String(globalState.hideScroller));
    //language
    const lang = globalState.language
    i18n.global.locale = lang
    if (lang === 'en') {
        Quasar.lang.set(en)
    } else if (lang === 'zh') {
        Quasar.lang.set(zh)
    }
    //screen size
    globalState.updateScreenMini(isMiniScreenMethod());
    //login data

    //more
}

export function updateTheme(code) {
    if (code === 'dark' || code === 'light' || code === 'green') {
        const globalState = useGlobalStateStore();
        document.documentElement.setAttribute('data-theme', code);
        globalState.updateTheme(code);
    }
}

export function switchTheme() {
    const globalState = useGlobalStateStore();

    let curThemeName = document.documentElement.getAttribute("data-theme")
    let themeName = 'dark'
    if (curThemeName === 'dark') {
        themeName = 'green'
    } else if (curThemeName === 'green') {
        themeName = 'light'
    }
    document.documentElement.setAttribute('data-theme', themeName);
    globalState.updateTheme(themeName);
}

export function hideScrollbar(isHide) {
    const globalState = useGlobalStateStore();
    let currentIsHide = document.documentElement.getAttribute("hide-scrollbar")
    if (currentIsHide !== 'false' && !isHide) {
        let toHide = 'false'
        document.documentElement.setAttribute('hide-scrollbar', toHide);
        globalState.updateHideScroller(isHide)
    } else if (currentIsHide === 'false' && isHide) {
        let toHide = 'true'
        document.documentElement.setAttribute('hide-scrollbar', toHide);
        globalState.updateHideScroller(isHide)
    }
}

export function updateLanguage(code) {
    const globalState = useGlobalStateStore();
    if (code === 'en') {
        i18n.global.locale = 'en'
        Quasar.lang.set(en)
        globalState.updateLanguage(code);
    } else if (code === 'zh') {
        i18n.global.locale = 'zh'
        Quasar.lang.set(zh)
        globalState.updateLanguage(code);
    }
}

export function updateScreenSizeMini(isMini) {
    const globalState = useGlobalStateStore();
    if (isMini && !globalState.screenMini) {
        globalState.updateScreenMini(isMini);
    } else if (!isMini && globalState.screenMini) {
        globalState.updateScreenMini(isMini);
    }
}

export function switchLanguage() {
    const globalState = useGlobalStateStore();
    if (i18n.global.locale === 'en') {
        i18n.global.locale = 'zh'
        Quasar.lang.set(zh)
        globalState.updateLanguage('zh');
    } else {
        i18n.global.locale = 'en'
        Quasar.lang.set(en)
        globalState.updateLanguage('en');
    }
}

export function updateSaveLoginData(isSave) {
    const globalState = useGlobalStateStore();
    globalState.updateSaveLoginData(isSave)
}