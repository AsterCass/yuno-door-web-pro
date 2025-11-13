import {serviceShiro} from '@/utils/request'


export function userLogin(body) {
    return serviceShiro({
        url: `/yui/user/login/v2`,
        method: 'post',
        data: body
    })
}

export function userLoginGoogle(body) {
    return serviceShiro({
        url: `/yui/user/google/login`,
        method: 'post',
        data: body
    })
}

export function userLoginGithub(body) {
    return serviceShiro({
        url: `/yui/user/github/login`,
        method: 'post',
        data: body
    })
}

export function sendRegMail(body) {
    return serviceShiro({
        url: `/yui/user/sendRegMail`,
        method: 'post',
        data: body
    })
}

export function sendResetMail(body) {
    return serviceShiro({
        url: `/yui/user/sendResetMail`,
        method: 'post',
        data: body
    })
}

export function userLogout() {
    return serviceShiro({
        url: `/yui/user/logout/auth`,
        method: 'post',
    })
}

export function userIsLogin() {
    return serviceShiro({
        url: `/yui/user/isLogin/authNoError`,
        method: 'get',
        params: {path: window.location.href},
    })
}


export function userDetail() {
    return serviceShiro({
        url: `/yui/user/detail/auth`,
        method: 'get',
    })
}

export function userDetailSimple(params) {
    return serviceShiro({
        url: `/yui/user/detail`,
        params: params,
        method: 'get',
    })
}


export function updateInfo(body) {
    return serviceShiro({
        url: `/yui/user/updateInfo/auth`,
        method: 'patch',
        data: body
    })
}

export function updateAvatar(data) {
    return serviceShiro({
        url: `/yui/user/updateAvatar/auth`,
        method: 'patch',
        data: data
    })
}

export function registry(body) {
    return serviceShiro({
        url: `/yui/user/registry/v2`,
        method: 'post',
        data: body
    })
}

export function resetPasswd(body) {
    return serviceShiro({
        url: `/yui/user/resetPasswd/v2`,
        method: 'post',
        data: body
    })
}

export function follow(body) {
    return serviceShiro({
        url: `/yui/user/follow/auth`,
        method: 'post',
        data: body
    })
}

export function isFollow(params) {
    return serviceShiro({
        url: `/yui/user/isFollow/authNoError`,
        params: params,
        method: 'post',
    })
}