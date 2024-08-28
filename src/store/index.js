import Vue from 'vue'
import Vuex from 'vuex'
import { ref, push, get, update} from 'firebase/database';
import { uploadBytes, getDownloadURL, ref as refS } from 'firebase/storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, database, storage } from '../firebaseConfig'; // Ajuste o caminho conforme necessário



Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      // { imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      //   id:'01', 
      //   title:'esquilo',
      //   date: new Date(),
      //   location: 'Sorocaba',
      //   description: 'I am an animal'
      // },
      // { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtSaiD7aywdj40H5cHgH1foGHUdwnmM-FZA&s', 
      //   id: '03', 
      //   title: 'Imagem progama',
      //   date: new Date(),
      //   location: 'São Paulo',
      //   description: 'I am software developer'
      // },
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
    setLoadedMeetups (state, payload){
      state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if(payload.title) {
        meetup.title = payload.title
      }  
      if(payload.description) {
        meetup.description = payload.description
      }
      if(payload.date) {
        meetup.date = payload.date
      }
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
    // verifica o user para dar o load nos meetups dele
    loadMeetups ({commit}) {
      commit('setLoading', true)

      const meetupsRef = ref(database, 'meetups');
      get(meetupsRef)
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push( {
              id: key,
              title: obj [key].title,
              description: obj [key].description,
              imageUrl: obj [key].imageUrl,
              date: obj [key].date,
              location: obj [key].location,
              creatorId: obj [key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    // Criar um novo meetup e adicionar à lista.
    async createMeetup({ commit, getters }, payload) {

      if (!payload.image) {
        console.error('Imagem não fornecida')
        return
      }

      let imageUrl = '';

      const filename = payload.image.name
      const fileRef = refS(storage, 'meetups/' + filename)

      await uploadBytes(fileRef, payload.image).then(() => {
        const filename = payload.image.name
        const fileRef = refS(storage, 'meetups/' + filename)
        return getDownloadURL(fileRef)
      }).then((url) => {
        imageUrl = url;
      }).catch(() => {
        console.log('ERRO')
      });

      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        imageUrl,
        creatorId: getters.user.id
      }

      //ERRADO === firebase.database().ref('meetups').push(meetup)

      // Cria uma referência para o local onde os meetups serão armazenados
      const meetupsRef = ref(database, 'meetups');
      push(meetupsRef, meetup)
        .then((data) => {
          commit('createMeetup', {
            ...meetup,
            id: data.key
          })
        }).catch((error) =>{
          console.log(error);
        })
      // entre em contato com o firebase e armazene isso
      // commit: Função para chamar mutations.
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if(payload.title) {
        updateObj.title = payload.title
      }  
      if(payload.description) {
        updateObj.description = payload.description
      }
      if(payload.date) {
        updateObj.date = payload.date
      }
        const meetupRef = ref(database, `meetups/${payload.id}`)
      update(meetupRef, updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', {
            id: payload.id,
            ...updateObj //pra passar oq foi att e carregar na hora
          });
    
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
              id: user.user.uid,
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
              id: user.user.uid,
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
    autoSignin({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      commit('setUser', null)
    },
    clearError ({commit}) {
      signOut(auth)
      commit('clearError')
    }

  },
 
})
