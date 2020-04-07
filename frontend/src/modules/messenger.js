import types from '../types/messenger'
//import Vue from 'vue'
import axios from 'axios'

const state = {
    messages: [],
    selectedConversation: null,
    conversations: [],
    querySearch: '',
    user: null
};

const actions = { 
  [types.actions.getMessages]: ({commit}, conversation) => {
         
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(window.localStorage.getItem('_token'))}`;
        axios.get(`http://127.0.0.1:8000/api/v1/messages?contact_id=${conversation.contact_id}&from_id=${state.user.id}`)
            .then(response => { 
            
                commit(types.mutations.selectConversation, conversation);
                commit(types.mutations.newMessagesList, response.data);   
               
            }
           );
  },
  [types.actions.getConversations]: ({commit}) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(window.localStorage.getItem('_token'))}`;
    return axios.get(`http://127.0.0.1:8000/api/v1/conversations?user_id=${state.user.id}`)
    .then((response) => {
      
        commit(types.mutations.newContactList, response.data);
       
    });
    
  },
  /*[types.actions.updateProfile]: ({commit}, userInput) => {
   
  
  },*/
  [types.actions.postMessage]: ({commit}, newMessage) => {
        const params = {
            from_id: state.user.id,
            to_id: state.selectedConversation.contact_id,
            content: newMessage
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(window.localStorage.getItem('_token'))}`;
        axios.post('http://127.0.0.1:8000/api/v1/messages', params)
        .then((response) => {
        if(response.data.success){
            newMessage = '';
            const message = response.data.message;
            message.written_By_Me = '1';
        
            commit(types.mutations.addMessage, message);
        }
        
        });
  }
};

const getters = {
  [types.getters.conversationsFiltered]: (state) => {
    return state.conversations.filter(
        (conversations) => conversations.contact_name
        .toLowerCase()
        .includes(state.querySearch)
        );
  },
  //está logueado?
  [types.getters.getConversationById]: (state) => {
    return function(conversationId){
       
        return state.conversations.find(
             conversation =>
             conversation.id == conversationId 
         );
     }
  }, 

  [types.getters.selectedConversation]: (state) => {
    return state.selectedConversation;
  },

  [types.getters.getQuerySearch]: (state) => {
    return state.querySearch;
  },

  [types.getters.getterMessages]: (state) => {
    return state.messages;
  },

  [types.getters.getUser]: (state) => {
    return state.user;
  },

  [types.getters.getConversations]: (state) => {
    return state.conversations;
  },
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
  [types.mutations.newMessagesList]: (state, messages) => {
    state.messages = messages;
  },
  
  [types.mutations.addMessage]: (state, message) => {
    const conversation = state.conversations.find(function(conversation){
        return conversation.contact_id == message.from_id 
                || conversation.contact_id == message.to_id;
    });

    const author = state.user.id === message.from_id ? 'Tú' : conversation.contact_name;
    conversation.last_message = `${author}: ${message.content}`;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + 
    today.getSeconds();
    var dateTime = date+' '+time;
    conversation.last_time = dateTime;
    
    if(state.selectedConversation.contact_id == message.from_id
        || state.selectedConversation.contact_id == message.to_id){
       
        state.messages.push(message);
    }
  },
  
  [types.mutations.selectConversation]: (state, conversation) => {
    
    state.selectedConversation = conversation;
  },

  [types.mutations.newQuerySearch]: (state, newValue) => {
    state.querySearch = newValue;
  },

  [types.mutations.newContactList]: (state, contacts) => {
   
    state.conversations = contacts;
  }
};


export default {
  state,
  actions,
  getters,
  mutations
};