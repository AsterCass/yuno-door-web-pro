import axios from 'axios'
import Qs from 'qs'
import {notifyTopWarning} from "@/utils/notification-tools";
import i18n from '@/i18n';
import {useGlobalStateStore} from "@/utils/global-state";
import {delay} from "@/utils/base-tools";

const t = i18n.global.t
const BASE_ADD = process.env.VUE_APP_BASE_ADD


const requestConfig = config => {
    const globalState = useGlobalStateStore()
    config.headers.set('User-Token', globalState.loginToken)
    return config
}

const responseConfig = response => {
    if (response && 200 === response.status) {
        const globalState = useGlobalStateStore()

        const serverData = response.data
        let bizStatus = 0
        if (serverData instanceof Object) {
            bizStatus = serverData.status
            if (600 === bizStatus) {
                notifyTopWarning(t('no_login'))
                globalState.updateToken(null)
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
            //因为后续才会设置用户其他数据，所以需要延迟token的注入时间
            //todo 这里需要斟酌一下， 最好还是在登录退出的时候进行该操作，当初这么写是因为方便后续出更新token的功能
            // 但是现在，updateToken之后会有很多前端操作，最好还是别统一操作了
            delay(1000).then(() => {
                globalState.updateToken(response.headers.get("User-Token"))
            })
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