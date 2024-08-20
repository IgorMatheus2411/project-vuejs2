import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        id:'01', 
        title:'esquilo',
        date: '2024-08-17'
      },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtSaiD7aywdj40H5cHgH1foGHUdwnmM-FZA&s', 
        id: '03', 
        title: 'Imagem progama',
        date: '2024-08-19' 
      },
    ],
    user: {
      id: '2132',
      registeredMeetups: ['abcd']
    },
  }, 
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  },
  mutations: {
  },
  actions: {
  },
 
})
