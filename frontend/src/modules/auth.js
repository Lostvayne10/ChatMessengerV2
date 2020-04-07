import types from '../types/auth'
//import Vue from 'vue'
import axios from 'axios'


const state = {
      user: null,
      logged: !!window.localStorage.getItem('_token')
};

const actions = { 
    [types.actions.login]: ({commit}, userCredentials) => {
   
    
      axios.post('http://127.0.0.1:8000/api/v1/auth/login', userCredentials)
      .then((response) => {
   
      const auth = {
          acceso_token : '',
          user: ''
      }
      auth.acceso_token = response.data.token;
      auth.user = response.data.user;
      window.localStorage.setItem('_token', JSON.stringify(auth.acceso_token)); 
      window.localStorage.setItem('_user', JSON.stringify(auth.user)); 
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.acceso_token}`; 
      commit(types.mutations.setUser);
      
      
    })
    },
    [types.actions.register]: ({commit}, userCredentials) => {
 
      axios.post('http://127.0.0.1:8000/api/v1/auth/register', userCredentials)
      .then((response) => {
      
      const auth = {
          acceso_token : '',
          user: ''
      };
      auth.acceso_token = response.data.token;
      auth.user = response.data.user;
      window.localStorage.setItem('_token', JSON.stringify(auth.acceso_token)); 
      window.localStorage.setItem('_user', JSON.stringify(auth.user)); 
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.acceso_token}`; 
      commit(types.mutations.setUser);
      
      
    })
      
    },
    /*[types.actions.updateProfile]: ({commit}, userInput) => {
     
    
    },*/
    [types.actions.logout]: ({commit}) => {
      window.localStorage.removeItem('_token');
      window.localStorage.removeItem('_user');
      window.sessionStorage.removeItem('vuex');
      axios.post('http://127.0.0.1:8000/api/v1/auth/logout')
      .then(() => {
    
      });
      
      commit(types.mutations.setUser);
    }
};

const getters = {
    [types.getters.user]: (state) => {
      return state.user;
    },
    //está logueado?
    [types.getters.logged]: (state) => {
      return state.logged;
    }
};

const  mutations = {
    [types.mutations.setUser]: (state) => {
      if(window.localStorage.getItem('_user')) {
        const token =JSON.parse(window.localStorage.getItem('_user'));
        
        
        state.user = token;
        state.logged = true;
      } else {
        state.logged = false;
        state.user = null;
        
      }
    },
    //establecemos el estado del usuario
    [types.mutations.setLogged]: (state, logged) => {
      state.logged = logged;
    }
};


export default {
    state,
    actions,
    getters,
    mutations
  };