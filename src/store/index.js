import Vue from 'vue'
import Vuex from 'vuex'
import { ref, remove, push, get, update} from 'firebase/database';
import { uploadBytes, getDownloadURL, ref as refS } from 'firebase/storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, database, storage } from '../firebaseConfig'; // Import Firebase configuration

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      // Sample data for loaded meetups
      // { imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      //   id:'01', 
      //   title:'squirrel',
      //   date: new Date(),
      //   location: 'Sorocaba',
      //   description: 'I am an animal'
      // },
      // { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtSaiD7aywdj40H5cHgH1foGHUdwnmM-FZA&s', 
      //   id: '03', 
      //   title: 'Program Image',
      //   date: new Date(),
      //   location: 'São Paulo',
      //   description: 'I am a software developer'
      // },
    ],
    user: null, // Stores the currently logged-in user
    loading: false, // Indicates if data is currently being loaded
    error: null, // Stores error messages
  }, 
  getters: {
    loadedMeetups (state) {
      // Returns all loaded meetups, sorted by date
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      // Returns the first 5 meetups from the loaded meetups
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      // Returns a meetup based on its ID
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      // Returns the current user
      return state.user
    },
    loading (state) {
      // Returns the loading state
      return state.loading
    },
    error (state) {
      // Returns the current error message
      return state.error
    }
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup === id) >= 0) {
        return
      } 
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },

    setLoadedMeetups (state, payload){
      // Sets the loaded meetups in the state
      state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
      // Adds a new meetup to the loaded meetups list
      state.loadedMeetups.push(payload)
    },
    updateMeetup(state, payload) {
      // Updates an existing meetup based on the payload
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

    // Update the user's information
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      // Sets the loading state
      state.loading = payload
    },
    setError (state, payload) {
      // Sets the error message
      state.error = payload
    },
    clearError (state) {
      // Clears the error message
      state.error = null
    }
  },
  actions: {
     async registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      
      const userRef = ref(database, '/users/' + user.id + '/registrations/')

        push(userRef, payload)
          .then((data) => {
          console.log(1000)

            commit('setLoading', false)
            commit('registerUserForMeetup', {id: payload, fbKey: data.key})
          })
          .catch(error => {
            console.log(error)
            commit('setLoading', false)
          })
    },
    async unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]

      const usersRef = ref(database, '/users/' + user.id + '/registrations/' + fbKey)
        await remove(usersRef)
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })

    },
    // Loads meetups from Firebase and commits them to the state
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
    // Creates a new meetup and adds it to Firebase
    async createMeetup({ commit, getters }, payload) {

      if (!payload.image) {
        console.error('Image not provided')
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
        console.log('ERROR')
      });

      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        imageUrl,
        creatorId: getters.user.id
      }

      // Create a reference for where the meetups will be stored
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
    },
    // Updates a meetup's data in Firebase
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
            ...updateObj // Updates the meetup in the state
          });
    
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    // Registers a new user with email and password using Firebase
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.user.uid,
              registeredMeetups: [],
              fbKeys: {}
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
    // Signs in an existing user with email and password using Firebase
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
    // Automatically signs in a user with their UID
    autoSignin({commit}, payload) {
      commit('setUser', {
          id: payload.uid,
          registeredMeetups: [],
          fbKeys: {}
        })
    },
    async fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      const userId = getters.user.id;
      const fetchRef = ref(database, '/users/' + userId + '/registrations/'); // Cria a referência ao caminho
    
      get(fetchRef)
      .then((data) => {
        const dataPairs = data.val(); // Recupera os dados (pode ser null se não houver dados)
        let registeredMeetups = []
        let swappedPairs = {}

        for (let key in dataPairs) {
          registeredMeetups.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
          
        }
        const updatedUser = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          fbKeys: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
  
      })
      .catch((error) => {
        console.error(error)
        commit('setLoading', false)

      })
    

    },
    // Logs out the current user
    logout ({commit}) {
      signOut(auth)
      commit('setUser', null)
    },
    // Clears the error message and signs out the user
    clearError ({commit}) {
      commit('clearError')
    }
  },
})
