import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/HomeView.vue'
import MeetupsView from '@/components/Meetup/MeetupsView.vue'
import UserProfile from '@/components/User/UserProfile.vue'
import CreateMeetups from '@/components/Meetup/CreateMeetups.vue'
import SigninView from '@/components/User/SigninView.vue'
import SignupView from '@/components/User/SignupView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetup',
    name: 'Meetups',
    component: MeetupsView
  },{
    path: '/meetups/new',
    name: 'CreateMeetups',
    component: CreateMeetups
  },{
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile
  },{
    path: '/signin',
    name: 'Signin',
    component: SigninView
  },{
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
