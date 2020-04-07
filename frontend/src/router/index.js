import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import authTypes from '@/types/auth';
import login from '../components/Auth/logincomponent'
import HelloWorld from '../components/HelloWorld.vue'
import store from '../store'
import register from '../components/Auth/register'
import MessengerComponent from '../components/Messenger/MessengerComponent'
import ProfileComponent from '../components/profile/profile'


const router = new Router({
    routes : [
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: { Auth: false, title: 'Iniciar sesión' },
            beforeEnter: (to, from, next) => {
                if(store.state.authModule.logged) {
                  next({ path: '/' });
                } else {
                  next();
                }
              }
        },
        {
          path: '/register',
          name: 'register',
          component: register,
          meta: { Auth: false, title: 'Registrar' },
          beforeEnter: (to, from, next) => {
              if(store.state.authModule.logged) {
                next({ path: '/' });
              } else {
                next();
              }
            }
      },
      {
        path: '/chat',
        name: 'chat',
        component: MessengerComponent,
        meta: { Auth: false, title: 'Chat' },
        beforeEnter: (to, from, next) => {
          if(!store.state.authModule.logged) {
            next({ path: '/' });
          } else {
            next();
          }
        }
        
      },
      
      {
        path: '/chat/:conversationId', 
        component: MessengerComponent,
          beforeEnter: (to, from, next) => {
            if(!store.state.authModule.logged) {
              next({ path: '/' });
            } else {
              next();
            }
          } },
        {
            path: '/',
            name: 'Home',
            component: HelloWorld,
            
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfileComponent,
          meta: { Auth: false, title: 'profile' },
          beforeEnter: (to, from, next) => {
            if(!store.state.authModule.logged) {
              next({ path: '/' });
            } else {
              next();
            }
          }
          
        },
    ],
    
    mode: 'history'
});

//para cada cambio de ruta
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if (to.meta.Auth && !store.state.authModule.logged) {
      next({path: '/login'});
    } else {
      if (store.state.authModule.logged) {
        store.commit(authTypes.mutations.setUser);
      }
      next();
    }
  });
  //.para cada cambio de ruta

export default router;