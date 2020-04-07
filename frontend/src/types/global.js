import namespace from '../utils/namespace'

export default namespace('global', {
    actions: [
        'changeLanguage'
    ],
    getters: [
        'language'
    ],
    mutations: [
        'setLanguage'
    ]
});