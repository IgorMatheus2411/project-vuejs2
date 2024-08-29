import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify'
import DateFilter from './filters/date'
import AlertCmp from './components/shared/AlertView.vue'
import { monitorAuthState } from './firebaseConfig';  // Importe a função
import EditMeetupDetails from './components/Meetup/Edit/EditMeetupDetails.vue'
import EditMeetupDate from './components/Meetup/Edit/EditMeetupDate.vue'
import EditMeetupTime from './components/Meetup/Edit/EditMeetupTime.vue'


Vue.use(vuetify)
Vue.config.productionTip = false
Vue.component('app-edit-meetup-details', EditMeetupDetails)
Vue.component('app-edit-meetup-date', EditMeetupDate)
Vue.component('app-edit-meetup-time', EditMeetupTime)

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
