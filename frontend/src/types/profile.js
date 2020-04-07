import namespace from '../utils/namespace'

export default namespace('profile', {
  state: [
    'user'
  ],
  getters: [
    'getUser'
  ],
  actions: [
    'updateProfile'
  ],
  mutations: [
    'setUser'
  ]
});
