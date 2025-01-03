import {serviceShiro} from "@/utils/request";

export function uploadUserFile(params, data) {
    return serviceShiro({
        url: `/yui/user/file/upload/auth`,
        method: 'post',
        params: params,
        data: data
    })
}


export function getEmojiList(params) {
    return serviceShiro({
        url: `yui/user/file/emoji/list/authNoError`,
        method: 'get',
        params: params,
    })
}

export function getStarEmojiList(params) {
    return serviceShiro({
        url: `yui/user/file/emoji/star/list/auth`,
        method: 'get',
        params: params,
    })
}

export function starEmoji(emojiId) {
    return serviceShiro({
        url: `yui/user/file/emoji/star/auth?emojiId=${emojiId}`,
        method: 'post',
    })
}