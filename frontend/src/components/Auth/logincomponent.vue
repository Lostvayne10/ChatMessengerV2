<template>
    <b-container>
        
        <b-row align-h="center">
            <b-col cols="8">
                <b-card :header="$t('login.title')" header-tag="header">
                    <b-card-text>
                    
                
                    
                            <b-alert show > {{ $t('login.message') }}  </b-alert>
                    
                            <b-form-group  
                            label-align-sm="right" 
                            label-cols-sm="4" 
                            :label="$t('login.email')" 
                            label-for="email">
                            
                            <b-col cols="8">
                                    <b-form-input 
                                    name="email"
                                    v-model="credentials.email"
                                    required 
                                    autofocus
                                    placeholder="example@email.com"/>
                                </b-col>
                            </b-form-group>
                        
                            <b-form-group 
                            label-align-sm="right" 
                            label-cols-sm="4" 
                            :label="$t('login.password')" 
                            label-for="password">

                                <b-col cols="8">
                                    <b-form-input 
                                    name="password"
                                    type="password"
                                    v-model="credentials.password"
                                    required 
                                    autocomplete="current-password"/>
                                </b-col>
                            </b-form-group>
                    
                        
                        
                    
                            <b-row align-h="center">
                            <b-button variant="primary" type="submit"  @click="processLogin()">
                                {{ $t('login.title') }}
                            </b-button>
                            <b-button href="#" variant="link">
                                {{ $t('login.forgot') }}
                            </b-button>
                            </b-row>

                    
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import {mapActions} from 'vuex'
import authTypes from '../../types/auth'

export default {
    
    name: 'login',
    data(){
        return{
            credentials: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions({
            login: authTypes.actions.login
        }),
        processLogin(){
            this.login(
                this.credentials
            ).then(()=> {
                this.$router.push('/');
            }, 
             
                
            );
        }
    }
}
</script>