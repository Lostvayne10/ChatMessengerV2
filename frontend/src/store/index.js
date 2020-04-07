import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex);

import authModule from '../modules/auth'
import messengerModule from '../modules/messenger'
import globalTypes from '../types/global';
import profileModule from '../modules/profile'


const store = new Vuex.Store({

   

    state:{
        language: 'es'
    },
    actions:{
        [globalTypes.actions.changeLanguage]: ({commit}, lang) => {
            commit(globalTypes.mutations.setLanguage, lang);
        }
    },
    getters:{
        [globalTypes.getters.language]: state => state.language
    },
    mutations:{
        [globalTypes.mutations.setLanguage] (state, lang) {
            state.language = lang;
        }
    },
    modules:{
        authModule,
        messengerModule,
        profileModule
    }
});

export default store;