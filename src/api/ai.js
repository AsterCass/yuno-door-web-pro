import {serviceShiro} from "@/utils/request";

export function isOnline() {
    return serviceShiro({
        url: "/yui/user/ai/online",
        method: 'get',
    })
}

export function loadHistory(param) {
    return serviceShiro({
        url: "/yui/user/ai/history",
        method: 'get',
        params: param
    })
}

export function clearHistory(param) {
    return serviceShiro({
        url: "/yui/user/ai/clear",
        method: 'delete',
        params: param
    })
}