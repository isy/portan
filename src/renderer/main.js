import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLaugh, faFlushed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faLaugh, faFlushed);

Vue.component('font-awesome-icon', FontAwesomeIcon);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
