import {serviceShiro} from '@/utils/request'


export function getAllVideoCol(param) {
    return serviceShiro({
        url: `/ushio/videoCol/list`,
        method: 'get',
        params: param
    })
}

export function getAdminVideoCol(param) {
    return serviceShiro({
        url: `/ushio/videoCol/person/admin`,
        method: 'get',
        params: param
    })
}

export function getPersonVideoCol(param) {
    return serviceShiro({
        url: `/ushio/videoCol/person`,
        method: 'get',
        params: param
    })
}

export function getVideoListByColId(param) {
    return serviceShiro({
        url: `/ushio/video/list/auth`,
        method: 'get',
        params: param
    })
}

export function geVideoColDetail(id) {
    return serviceShiro({
        url: `/ushio/videoCol/detail/${id}`,
        method: 'get',
    })
}
