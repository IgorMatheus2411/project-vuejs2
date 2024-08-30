

export default {
  state: {
    loading: false, // Indicates if data is currently being loaded
    error: null, // Stores error messages
  }, 

  getters: {
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
    // Clears the error message and signs out the user
    clearError ({commit}) {
      commit('clearError')
    }
  },
}
