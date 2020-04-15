import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import lib from '@/lib/js/lib.js'
Vue.prototype.$app = lib

const app = new Vue({
    ...App
})
app.$mount()
