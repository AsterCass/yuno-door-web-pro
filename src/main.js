import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import i18n from '@/i18n';
import {Quasar} from 'quasar'
import {createPinia} from 'pinia'
import quasarUserOptions from '@/options/quasar-user-options'


const app = createApp(App).use(Quasar, quasarUserOptions);

app.use(i18n)
app.use(router)
app.use(createPinia())

app.mount("#app");
