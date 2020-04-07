<template>
    <b-container>
        <b-row align-h="center">
            <b-col cols="8">
                <b-card :header="$t('register.title')" header-tag="header">
                    <b-card-text>
                    
                
                    
                            <b-alert show > {{ $t('register.message') }}  </b-alert>
                    
                            <b-form-group  
                            label-align-sm="right" 
                            label-cols-sm="4" 
                            :label="$t('register.name')" 
                            label-for="name">
                            
                            <b-col cols="8">
                                    <b-form-input 
                                    name="name"
                                    v-model="credentials.name"
                                    required 
                                    autofocus
                                    placeholder=""/>
                                </b-col>
                            </b-form-group>

                            <b-form-group  
                            label-align-sm="right" 
                            label-cols-sm="4" 
                            :label="$t('register.email')" 
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
                            :label="$t('register.password')" 
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

                            <b-form-group 
                            label-align-sm="right" 
                            label-cols-sm="4" 
                            :label="$t('register.password_confirmation')" 
                            label-for="confirm_password">

                                <b-col cols="8">
                                    <b-form-input 
                                    name="confirm_password"
                                    type="password"
                                    v-model="credentials.confirm_password"
                                    required 
                                    autocomplete="current-password"/>
                                </b-col>
                            </b-form-group>
                    
                        
                        
                    
                            <b-row align-h="center">
                                <b-button variant="primary" type="submit"  @click="processRegister()">
                                    {{ $t('register.title') }}
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
     name: 'register',
    data(){
        return{
            credentials: {
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            }
        }
    },
    methods: {
        ...mapActions({
            register: authTypes.actions.register
        }),
        processRegister(){
            this.register(
                this.credentials
            ).then(() => {
                this.$router.push('/');
            }  
                
            );
        }
    }
}
</script>