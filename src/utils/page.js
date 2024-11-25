import {extend} from 'quasar'

function simplePage(param, pageNo) {
    let pageParam = {}
    extend(true, pageParam, param)
    pageParam.offset = (pageNo - 1) * 4
    pageParam.limit = 4
    return pageParam
}

function customPage(param, offset, limit) {
    let pageParam = {}
    extend(true, pageParam, param)
    pageParam.offset = offset
    pageParam.limit = limit
    return pageParam
}

function customPageNP(offset, limit) {
    let pageParam = {}
    pageParam.offset = offset
    pageParam.limit = limit
    return pageParam
}


export {
    simplePage, customPage, customPageNP
}

