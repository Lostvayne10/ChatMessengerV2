import namespace from '../utils/namespace'

export default namespace('messenger', {

  state: [
    'messages',
    'selectedConversation',
    'conversations',
    'querySearch',
    'user'
  ],

  getters: [
    'conversationsFiltered',
    'getConversationById',
    'selectedConversation',
    'getQuerySearch',
    'getterMessages',
    'getUser',
    'getConversations'
  ],
  actions: [
    'getMessages',
    'getConversations',
    'postMessage'
  ],
  mutations: [
    'setUser',
    'newMessagesList',
    'addMessage',
    'selectConversation',
    'newQuerySearch',
    'newContactList'
  ]
});


