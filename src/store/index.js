import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', id:'01', title:'esquilo'},
                    { src:'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', id:'02', title:'Lago' },
                    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtSaiD7aywdj40H5cHgH1foGHUdwnmM-FZA&s', id: '03', title: 'Imagem progama' },
    ]
  }, 
  user: {
    id: '2132',
    registerMeetups: ['abcd']
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
 
})
