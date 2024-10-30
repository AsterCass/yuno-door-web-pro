import i18n from '@/i18n';
import {Quasar} from 'quasar'
import zh from 'quasar/lang/zh-CN'
import en from 'quasar/lang/en-US'


export function switchTheme() {
    let curThemeName = document.documentElement.getAttribute("data-theme")
    let themeName = 'dark'
    if (curThemeName === 'dark') {
        themeName = 'green'
    } else if (curThemeName === 'green') {
        themeName = 'light'
    }
    document.documentElement.setAttribute('data-theme', themeName);
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

