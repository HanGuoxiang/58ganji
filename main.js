import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import cuCustomHeader from './colorui/components/cu-custom-header.vue'
import cuCustomFoot from './colorui/components/cu-custom-foot.vue'
import store from './store'
import uView from 'uview-ui';
// import c from 'modules/common.js'
// import b from 'modules/bll.js'

Vue.use(uView);

Vue.component('cu-custom',cuCustom)
Vue.component('cu-custom-header',cuCustomHeader)
Vue.component('cu-custom-foot',cuCustomFoot)
Vue.prototype.$store = store


//用户头像集合
Vue.prototype.$userPhotoUrlDict = {};

// Vue.prototype.c=c;

Vue.config.productionTip = false

App.mpType = 'app'



const app = new Vue({
	...App,
	store
})
app.$mount()
