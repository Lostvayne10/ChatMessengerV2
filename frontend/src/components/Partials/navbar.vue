<template>
    <b-navbar toggleable="sm" type="dark" variant="primary">
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
            <b-navbar-brand to="/"> 
               Messenger
            </b-navbar-brand>
            <b-navbar-brand to="/chat"  v-if="isLogged" > 
               Chat
            </b-navbar-brand>
            <b-collapse id="nav-text-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    
                        <language-selector></language-selector>
                        
                        <b-nav-item  to="/login"  v-if="!isLogged" >
                            {{ $t('navigation.login') }}
                        </b-nav-item>
                        <b-nav-item to="/register"  v-if="!isLogged" >
                            {{ $t('navigation.register') }}
                        </b-nav-item>

                    <b-nav-item-dropdown v-if="isLogged" :text="user.name" right>
                    
                        <b-dropdown-item to="/profile" >
                            
                            {{ $t('navigation.profile') }}
                        </b-dropdown-item>
                        <b-dropdown-item href="#" >
                            <a href="#" @click.prevent="logout()" v-if="isLogged">{{ $t('navigation.logout') }}</a>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
        
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import authTypes from '@/types/auth';
import LanguageSelector from "./LanguageSelector";
export default {
    components: {LanguageSelector},
    name: 'navigation',
    methods: {
      ...mapActions({
        _logout: authTypes.actions.logout
      }),
      logout() {
          this._logout();
          this.$router.push({name: 'login'});
      }
    },
    computed: {
      ...mapGetters({
        isLogged: authTypes.getters.logged,
        user: authTypes.getters.user,
      })
    }
}
</script>