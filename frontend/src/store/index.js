import { createStore, storeKey } from "vuex";
import tokenService from "@/_services/tokenService";
//import article from './article'


// VOIR ICI POUR LES REQUETES AVEC AXIOS
const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:8888'
})

export default createStore({
  state: {

    token: null, //servira pour envoyer le token dans local storage
    user: {

    }, //servira a la creation user et a récuperer pour le profile
  },
  getters: {

  },
  mutations: {

    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_USER: (state, user) => {
      state.user = user
    }
  },
  actions: {
    createUser: ({ commit }, userInfos) => {
      //Ici requet put creer user
      //commit;
      console.log(userInfos);
      console.log(userInfos.nom);
      instance.put('/users', userInfos)
        .then(res => {
          console.log(res.data.data)
          let user = res.data.data
          commit('SET_USER', user)
        })
        .catch(err => console.log(err))
    },

    loginUser: ({ commit }, userInfos) => {
      //Ici requet put log user
      //commit,
      console.log(userInfos);
      instance.post('/auth/login', userInfos)
        .then(data => {
          console.log(data.data.access_token)
          let token = data.data.access_token
          commit('SET_TOKEN', token)
          // sauvegarde dans le localstorage
          tokenService.saveToken(token)
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
    //article
  },
});
