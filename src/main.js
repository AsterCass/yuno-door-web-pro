import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import i18n from '@/i18n';
import {Quasar} from 'quasar'
import {createPinia} from 'pinia'
import quasarUserOptions from '@/options/quasar-user-options'
import {createPersistedStatePlugin} from "@/utils/global-state";


const app = createApp(App).use(Quasar, quasarUserOptions);
const pinia = createPinia()
pinia.use(createPersistedStatePlugin())
app.use(i18n)
app.use(router)
app.use(pinia)

app.mount("#app");
