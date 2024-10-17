import {serviceShiro} from '@/utils/request'


export function getCommentWebsite(param) {
    return serviceShiro({
        url: `/yui/comment/website/authNoError`,
        method: 'get',
        params: param
    })
}

export function replyCommentWebsite(body) {
    return serviceShiro({
        url: `/yui/comment/website/authNoError`,
        method: 'post',
        data: body
    })
}

export function getCommentTree(mainId) {
    return serviceShiro({
        url: `/yui/comment/${mainId}/list/authNoError`,
        method: 'get',
    })
}

export function replyComment(body) {
    return serviceShiro({
        url: `/yui/comment/insert/authNoError`,
        method: 'post',
        data: body
    })
}

export function likeComment(mainId, likeStatus) {
    return serviceShiro({
        url: `/yui/comment/like/${mainId}/auth?likeStatus=${likeStatus}`,
        method: 'post',
    })
}
