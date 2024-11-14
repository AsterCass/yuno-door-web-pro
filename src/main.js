import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import i18n from '@/i18n';
import {Quasar} from 'quasar'
import {createPinia} from 'pinia'
import quasarUserOptions from '@/options/quasar-user-options'
import {createPersistedStatePlugin} from "@/utils/global-state";
import clickOutside from "@/utils/click-outside"

//app
const app = createApp(App).use(Quasar, quasarUserOptions);
//save
const pinia = createPinia()
pinia.use(createPersistedStatePlugin())
app.use(pinia)
//language
app.use(i18n)
//route
app.use(router)
//click outside
app.directive('click-outside', clickOutside);


app.mount("#app");
