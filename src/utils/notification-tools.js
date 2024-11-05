import {Notify} from "quasar";


export function notifyTopNegative(msg, time = 3000) {
    Notify.create({
        message: msg,
        position: 'top',
        type: 'negative',
        timeout: time
    })
}

export function notifyTopPositive(msg, time = 3000) {
    Notify.create({
        message: msg,
        position: 'top',
        type: 'positive',
        timeout: time
    })
}

export function notifyTopWarning(msg, time = 3000) {
    Notify.create({
        message: msg,
        position: 'top',
        type: 'warning',
        timeout: time
    })
}
