import {Notify} from "quasar";


export function notifyTopNegative(msg, time) {
    Notify.create({
        message: msg,
        position: 'top',
        type: 'negative',
        timeout: time
    })
}

export function notifyTopPositive(msg, time) {
    Notify.create({
        message: msg,
        position: 'top',
        type: 'positive',
        timeout: time
    })
}
