

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import store from './store'
import router from './router'
import axios from 'axios'
import moment from 'moment'



//axios.defaults.headers.common['Authorization'] = 'Bearer';
//axios.defaults.baseURL = '';


Vue.use(axios);
Vue.use(moment);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);



Vue.component('navbar-component', 
require('./components/Partials/navbar.vue').default);

Vue.component('contact-component', 
require('./components/Messenger/ContactComponent.vue').default);

Vue.component('status-component', 
require('./components/Messenger/StatusComponent.vue').default);

Vue.component('profile-form-component', 
require('./components/Messenger/ProfileComponent.vue').default);

Vue.component('contact-list-component', 
require('./components/Messenger/ContactListComponent.vue').default);

Vue.component('active-conversation-component', 
require('./components/Messenger/ActiveConversationComponent.vue').default);

Vue.component('message-conversation-component', 
require('./components/Messenger/MessageConversationComponent.vue').default);

/*Vue.component('messenger-component', 
require('./components/MessengerComponent.vue').default);
*/
Vue.component('contact-form-component', 
require('./components/Messenger/ContactFormComponent.vue').default);


import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import messages from './translations';
const i18n = new VueI18n({
  locale: store.state.language,
  messages
});

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  i18n,
  router
});
