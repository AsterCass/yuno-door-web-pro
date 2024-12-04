import {Notify} from "quasar";
import lottie from 'lottie-web';
import {delay} from "@/utils/base-tools";
import {useGlobalStateStore} from "@/utils/global-state";

let notificationAnimationMap = new Map();

function loadLottieAnimation(elementId, path) {
    delay(300).then(() => {
        const thisAnimation = notificationAnimationMap.get(elementId);
        if (thisAnimation) {
            thisAnimation.stop();
            thisAnimation.play()
        } else {
            let newAnimation = lottie.loadAnimation({
                name: elementId,
                container: document.getElementById(elementId),
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: path,
            });
            newAnimation.setSpeed(0.8)
            notificationAnimationMap.set(elementId, newAnimation);
        }
    })
}

function removeAnimation(elementId) {
    delay(500).then(() => {
        notificationAnimationMap.delete(elementId)
        lottie.destroy(elementId)
    })
}


export function notifyTopNegative(msg, time = 3000) {
    const notificationId = "notification-pre-animation" + Math.floor(Math.random() * 10000)
    Notify.create({
        message: `<div class="row justify-center items-center">
                    <div id="${notificationId}" class="col" style="width: 30px; height: 30px;"></div> 
                    <div class="q-ml-sm q-mr-xs"> ${msg} </div>
                  </div>`,
        position: 'top',
        type: 'negative',
        icon: "",
        timeout: time,
        html: true,
        onDismiss: () => {
            removeAnimation(notificationId)
        },
    })
    loadLottieAnimation(notificationId, "/animation/error.json")
}

export function notifyTopInfo(msg, time = 3000) {
    const notificationId = "notification-pre-animation" + Math.floor(Math.random() * 10000)
    Notify.create({
        message: `<div class="row justify-center items-center">
                    <div id="${notificationId}" class="col" style="width: 30px; height: 30px;"></div> 
                    <div class="q-ml-sm q-mr-xs"> ${msg} </div>
                  </div>`,
        position: 'top',
        type: 'info',
        icon: "",
        timeout: time,
        html: true,
        onDismiss: () => {
            removeAnimation(notificationId)
        },
    })
    loadLottieAnimation(notificationId, "/animation/info.json")
}

export function notifyTopPositive(msg, time = 3000) {
    const notificationId = "notification-pre-animation" + Math.floor(Math.random() * 10000)
    Notify.create({
        message: `<div class="row justify-center items-center">
                    <div id="${notificationId}" class="col" style="width: 30px; height: 30px;"></div> 
                    <div class="q-ml-sm q-mr-xs"> ${msg} </div>
                  </div>`,
        position: 'top',
        type: 'positive',
        icon: "",
        timeout: time,
        html: true,
        onDismiss: () => {
            removeAnimation(notificationId)
        },
    })
    loadLottieAnimation(notificationId, "/animation/right.json")
}

export function notifyTopWarning(msg, time = 3000) {
    const notificationId = "notification-pre-animation" + Math.floor(Math.random() * 10000)
    Notify.create({
        message: `<div class="row justify-center items-center">
                    <div id="${notificationId}" class="col" style="width: 30px; height: 30px;"></div> 
                    <div class="q-ml-sm q-mr-xs"> ${msg} </div>
                  </div>`,
        position: 'top',
        type: 'warning',
        icon: "",
        timeout: time,
        html: true,
        onDismiss: () => {
            removeAnimation(notificationId)
        },
    })
    loadLottieAnimation(notificationId, "/animation/warning.json")
}

export function browserNotificationCheck() {
    const globalState = useGlobalStateStore();
    if (!globalState.allowBrowserNotification) {
        return
    }
    if (!("Notification" in window)) {
        notifyTopWarning("此浏览器不支持新消息通知， 请更换现代浏览器")
        return
    }
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                notifyTopWarning("浏览器通知权限未开启，请开启获得最佳体验")
            }
        });
    }
}

export function browserNotification(title, body) {
    const globalState = useGlobalStateStore();
    if (!globalState.allowBrowserNotification) {
        return
    }
    if (Notification.permission !== "granted") {
        notifyTopWarning("收到一条新消息，但浏览器通知权限未开启，请开启获得最佳体验。如不需要该功能，请在设置中关闭新消息通知")
        return
    }

    const notification = new Notification(title, {
        body: body,
    });
    notification.onclick = () => {
        window.focus();
    };
    notification.onclose = () => {

    };
}
