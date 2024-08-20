import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        id:'01', 
        title:'esquilo',
        date: '2024-08-17'
      },
      { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtSaiD7aywdj40H5cHgH1foGHUdwnmM-FZA&s', 
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
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'akakakaka'
      }
      // entre em contato com o firebase e armazene isso
      commit('createMeetup', meetup)
    }
  },
 
})
