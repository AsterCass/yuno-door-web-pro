import {serviceShiro} from '@/utils/request'

export function getVideoBarrage(videoId) {
    return serviceShiro({
        url: `/ushio/videoBar/sub/detail/${videoId}`,
        method: 'get',
    })
}
