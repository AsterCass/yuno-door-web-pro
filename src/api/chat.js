import {serviceShiro} from '@/utils/request'

export function moreMessage(params) {
    return serviceShiro({
        url: `/yui/user/chat/message/authNoError`,
        params: params,
        method: 'get',
    })
}

export function chattingUsers() {
    return serviceShiro({
        url: `/yui/user/chat/chattingUsers/authNoError`,
        method: 'get',
        params: {path: window.location.pathname + window.location.search},
    })
}


export function privateInitChat(body) {
    return serviceShiro({
        url: `/yui/user/chat/private/auth`,
        method: 'post',
        data: body
    })
}

export function hideChat(params) {
    return serviceShiro({
        url: `/yui/user/chat/hide/auth`,
        method: 'post',
        params: params
    })
}


export function readMessage(params) {
    return serviceShiro({
        url: `/yui/user/chat/read/message/auth`,
        method: 'post',
        params: params
    })
}
