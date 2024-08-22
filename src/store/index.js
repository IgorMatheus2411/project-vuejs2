import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        id:'01', 
        title:'esquilo',
        date: new Date(),
        location: 'Sorocaba',
        description: 'I am an animal'
      },
      { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtSaiD7aywdj40H5cHgH1foGHUdwnmM-FZA&s', 
        id: '03', 
        title: 'Imagem progama',
        date: new Date(),
        location: 'São Paulo',
        description: 'I am software developer'
      },
    ],
    user: null,
    loading: false,
    error: null,
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
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    //Atualizar as informações do usuário.
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    // Criar um novo meetup e adicionar à lista.
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
      // commit: Função para chamar mutations.
      commit('createMeetup', meetup)
    },
      //Registrar um novo usuário com email e senha usando Firebase. IMPORTANTISSIMO
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        ).catch( 
          error =>{
            commit('setLoading', true)
            commit('setError', error)
            console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        ).catch( 
          error =>{
            commit('setLoading', true)
            commit('setError', error)
            console.log(error)
        }
      )
    },
    clearError ({commit}) {
      commit('clearError')
    }

  },
 
})
