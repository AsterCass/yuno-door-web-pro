import {notifyTopNegative, notifyTopPositive} from "@/utils/notification-tools";
import i18n from "@/i18n";

const t = i18n.global.t

export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function download(src, name, suffix) {
    let link = document.createElement('a');
    link.download = name + '.' + suffix;
    link.href = src
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function copy(text) {
    if (!navigator.clipboard) {
        notifyTopNegative(t('main_login_fail_copy'))
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        notifyTopPositive(t('main_login_success_copy'))
    }, function () {
        notifyTopNegative(t('main_login_fail_copy'))
    });
}

export function openLink(url, newBlank = true) {
    if (newBlank) {
        window.open(url, "_blank");
    } else {
        window.location.href = url;
    }

}

export function isMiniScreenMethod() {
    return document.documentElement.clientWidth < 1440
}

export function gotoPageTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

export function gotoSpecifySite(obj, top) {
    if(!obj) {
        return
    }
    obj.scrollTo({top: top, behavior: 'smooth'})
}

export function togoElement(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }
}

export function togoElementCenter(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
        });
    }
}



