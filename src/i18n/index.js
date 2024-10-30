import {createI18n} from 'vue-i18n';
import en from '@/i18n/en.json';
import zh from '@/i18n/zh.json';

const messages = {
    en,
    zh
};

const i18n = createI18n({
    locale: 'en',   //default
    fallbackLocale: 'en', //not match
    messages
});

export default i18n;