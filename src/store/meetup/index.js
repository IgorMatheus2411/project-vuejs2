
import { ref, push, get, update} from 'firebase/database';
import { uploadBytes, getDownloadURL, ref as refS } from 'firebase/storage';
import { database, storage } from '@/firebaseConfig'; // Import Firebase configuration

export default {
  state: {
   loadedMeetups: [],
  }, 
  getters: {
    loadedMeetups (state) {
      // Returns all loaded meetups, sorted by date
      return state.loadedMeetups?.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      // Returns the first 5 meetups from the loaded meetups
      return getters.loadedMeetups?.slice(0, 5)
    },
    loadedMeetup (state) {
      // Returns a meetup based on its ID
      return (meetupId) => {
        return state.loadedMeetups?.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
  
   
  },
  mutations: {
    

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

  

  },
  actions: {
    
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
  
  },
}
