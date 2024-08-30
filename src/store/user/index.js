
import { ref, remove, push, get} from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { database, auth } from '@/firebaseConfig'; // Import Firebase configuration


export default{
  state: {
   
    user: null, // Stores the currently logged-in user
  
  }, 
  getters: {
    user (state) {
      // Returns the current user
      return state.user
    },
   
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

    // Update the user's information
    setUser (state, payload) {
      state.user = payload
    },

 
  },
  actions: {
     async registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      
      const userRef = ref(database, '/users/' + user.id + '/registrations/')

        push(userRef, payload)
          .then((data) => {

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
    signUserIn ({commit, dispatch}, payload) {
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
            dispatch('loadMeetups', { root: true });
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
          const dataPairs = data.val()
          console.log('Data Pairs:', dataPairs) // Recupera os dados (pode ser null se não houver dados)
          if (dataPairs) {
            let registeredMeetups = [];
            let swappedPairs = {};

            for (let key in dataPairs) {
              registeredMeetups.push(dataPairs[key]);
              swappedPairs[dataPairs[key].id] = key; // Adicione o id para que possa ser usado para referência
            }
            
            const updatedUser = {
              id: getters.user.id,
              registeredMeetups: registeredMeetups,
              fbKeys: swappedPairs
            };
            
            commit('setLoading', false);
            commit('setUser', updatedUser);
          } else {
            // Se não houver dados, defina a lista de meetups como vazia
            const updatedUser = {
              id: getters.user.id,
              registeredMeetups: [],
              fbKeys: {}
            };
            
            commit('setLoading', false);
            commit('setUser', updatedUser);
          }
        })
        .catch((error) => {
          console.error(error);
          commit('setLoading', false);
        })  
    },
    // Logs out the current user
    async logout({commit}) {
      await signOut(auth)
      commit('setUser', null)
      commit('setLoadedMeetups', null, { root: true });
    },
  
  },
}
