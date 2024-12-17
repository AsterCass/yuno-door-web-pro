import {extend} from 'quasar'

function simplePage(param, pageNo) {
    let pageParam = {}
    extend(true, pageParam, param)
    pageParam.offset = (pageNo - 1) * 8
    pageParam.limit = 8
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

function customLargePage(param) {
    param.pageNo = 1
    param.pageSize = 100
    return param
}


export {
    simplePage, customPage, customPageNP, customLargePage
}

