import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify'
import DateFilter from './filters/date'
import AlertCmp from './components/shared/AlertView.vue'
import { monitorAuthState } from './firebaseConfig';  // Import the monitorAuthState function
import EditMeetupDetails from './components/Meetup/Edit/EditMeetupDetails.vue'
import EditMeetupDate from './components/Meetup/Edit/EditMeetupDate.vue'
import EditMeetupTime from './components/Meetup/Edit/EditMeetupTime.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

Vue.use(vuetify) // Use Vuetify plugin for UI components
Vue.config.productionTip = false // Disable production tip in console
Vue.component('app-edit-meetup-details', EditMeetupDetails) // Register component globally
Vue.component('app-edit-meetup-date', EditMeetupDate) // Register component globally
Vue.component('app-edit-meetup-time', EditMeetupTime) // Register component globally
Vue.component('app-meetup-register-dialog', RegisterDialog) // Register component globally

Vue.filter('date', DateFilter) // Register date filter globally
Vue.component('app-alert', AlertCmp) // Register Alert component globally

new Vue({
  router, // Pass router instance to Vue
  store, // Pass Vuex store instance to Vue
  vuetify, // Pass Vuetify instance to Vue
  render: h => h(App), // Render the main App component
  // Initialize the monitorAuthState function
  created() {
    monitorAuthState(this.$store);  // Call monitorAuthState to monitor authentication state changes
  }
}).$mount('#app') // Mount Vue instance to the HTML element with id 'app'
