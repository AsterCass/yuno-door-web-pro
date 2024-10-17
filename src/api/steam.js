import {serviceShiro} from '@/utils/request'


export function gameDetail(steamId) {
    return serviceShiro({
        url: `/nezuko/steam/game/${steamId}/detail`,
        method: 'get',
    })
}

export function searchGames(params) {
    return serviceShiro({
        url: `/nezuko/steam/game/search`,
        method: 'get',
        params: params
    })
}

export function checkUrlAvailable(params) {
    return serviceShiro({
        url: `/nezuko/steam/checkUrl`,
        method: 'get',
        params: params
    })
}

export function checkUrlListAvailable(params) {
    return serviceShiro({
        url: `/nezuko/steam/checkUrlList`,
        method: 'get',
        params: params
    })
}

export function getPopularGames() {
    return serviceShiro({
        url: `/nezuko/steam/game/popular`,
        method: 'get',
    })
}
