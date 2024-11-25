import axios from 'axios'
import Qs from 'qs'
import {notifyTopWarning} from "@/utils/notification-tools";
import i18n from '@/i18n';

const t = i18n.global.t
const BASE_ADD = process.env.VUE_APP_BASE_ADD


const requestConfig = config => {
    config.headers.set('User-Token', "")
    //todo get user token and set token to request
    //config.headers.set('User-Token', userToken)
    return config
}

const responseConfig = response => {
    if (response && 200 === response.status) {
        const serverData = response.data
        let bizStatus = 0
        if (serverData instanceof Object) {
            bizStatus = serverData.status
            if (600 === bizStatus) {
                notifyTopWarning(t('error_request'))
                //todo clear token in browser
                return null
            }
            if (400 === bizStatus) {
                notifyTopWarning(t('error_request'))
                return null
            }
            if (500 === bizStatus) {
                notifyTopWarning(serverData.message)
                return null
            }
        }
        if (bizStatus === 200 && response.headers.get("User-Token")) {
            //todo update token
        }
    } else {
        notifyTopWarning(t('error_request'))
        return null
    }
    return response;
}
const responseErrorConfig = error => {
    notifyTopWarning(t('error_request'))
    return undefined
}


const serviceShiro = axios.create({
    baseURL: BASE_ADD,
    timeout: 20000,
    paramsSerializer: {
        paramsSerializer: function (params) {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    }
})

serviceShiro.interceptors.request.use(requestConfig)

serviceShiro.interceptors.response.use(responseConfig, responseErrorConfig)


export {
    serviceShiro
}