// https://quasar.dev/options/installing-icon-libraries
import 'quasar/dist/quasar.sass'
import zh from 'quasar/lang/zh-CN'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import 'animate.css'
import {Loading, Notify} from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
    plugins: {Loading, Notify},
    config: {loading: {}, notify: {}},
    lang: zh,
}