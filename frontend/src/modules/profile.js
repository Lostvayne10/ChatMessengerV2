import types from '../types/profile'
//import Vue from 'vue'
import axios from 'axios'

const state = {
    user: null
};

const getters = {
    [types.getters.getUser]: (state) => {
       
          return state.user;
      
      },
};

const actions = {
    [types.actions.updateProfile]: ({commit}, params) => {
         
  
        return new Promise(() => {
          const token = JSON.parse(window.localStorage.getItem('_token'));
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          axios.post(`http://127.0.0.1:8000/api/v1/profile`, params)
                  .then(response => { 
                  
                      if(response.status==200){
                        const newUser = response.data;
                        window.localStorage.setItem('_user', JSON.stringify(newUser)); 
                        commit(types.mutations.setUser);
                        
                      }
                  }
                );
        });
                
      },
};

const mutations = {
    [types.mutations.setUser]: (state) => {
        return new Promise(() => {
          if(window.localStorage.getItem('_user')) {
            const token =JSON.parse(window.localStorage.getItem('_user'));
         
            
            state.user = token;
            
          } else {
           
            state.user = null;
          }
        })
      },
};

export default {
    state,
    actions,
    getters,
    mutations
  };