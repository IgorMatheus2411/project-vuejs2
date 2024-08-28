import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify'
import DateFilter from './filters/date'
import AlertCmp from './components/shared/AlertView.vue'
import { monitorAuthState } from './firebaseConfig';  // Importe a função
import EditMeetup from './components/Meetup/Edit/EditMeetup.vue'


Vue.use(vuetify)
Vue.config.productionTip = false
Vue.component('app-edit-meetup', EditMeetup)

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  // Inicialize a função monitorAuthState
  created() {
    monitorAuthState(this.$store);  // Passa o store como argumento
  }
}).$mount('#app')
