import i18n from '@/i18n';
import {Quasar} from 'quasar'
import zh from 'quasar/lang/zh-CN'
import en from 'quasar/lang/en-US'
import {useGlobalStateStore} from '@/utils/global-state';


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

export function hideScrollbar(isHide = true) {
    let currentIsHide = document.documentElement.getAttribute("hide-scrollbar")
    if (currentIsHide === 'true' && !isHide) {
        let toHide = 'false'
        document.documentElement.setAttribute('hide-scrollbar', toHide);
    } else if (currentIsHide !== 'true' && isHide) {
        let toHide = 'true'
        document.documentElement.setAttribute('hide-scrollbar', toHide);
    }
}

export function switchLanguage() {
    if (i18n.global.locale === 'en') {
        i18n.global.locale = 'zh'
        Quasar.lang.set(zh)
    } else {
        i18n.global.locale = 'en'
        Quasar.lang.set(en)
    }
}


export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

