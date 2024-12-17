// quasar的事件总线有问题，似乎在某些情况下 off 不生效
// import {EventBus} from 'quasar'
// const emitter = new EventBus()

import mitt from 'mitt'

export const emitter = mitt()

export default emitter