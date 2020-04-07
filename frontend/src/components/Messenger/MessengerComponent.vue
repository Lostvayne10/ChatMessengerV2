<template>
    <div >
        <b-row no-gutters class="h-100">
        <b-col cols="3" md="4">
            <contact-form-component />
            <contact-list-component />
        </b-col>
        <b-col cols="9" md="8">
            <active-conversation-component v-if="selectedConversation" :myImage="MyImageUrl" />
        </b-col>
    </b-row>
    </div>        
</template>

<script>
    import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'
    import msgTypes from '../../types/messenger'    
    
    import Echo from 'laravel-echo';

    window.Pusher = require('pusher-js');

    window.Echo = new Echo({
        
        broadcaster: 'pusher',
        key: 'cf23ad3c3accd874e558',
        host: window.location.hostname,
        cluster: 'us2',
        forceTLS: true,
        authEndpoint: 'http://localhost:8000/broadcasting/auth',
        
        encrypted: true,
        
        auth:
        {
            headers:
            {
                
                'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('_token'))}`,
                'Accept': 'application/json',
            }
        }
    
    });

    export default {
       
        data(){
            return{
            };
        },
        mounted() {
            
            this.setUser();

            this.getConversations()
            .then(() => {
                const conversationId = this.$route.params.conversationId;
                
                if(conversationId){
                    const conversation = this.getConversationById(conversationId);
                    this.getMessages(conversation);
                }
            });
            

           
           window.Echo.private(`users.${this.user.id}`).listen('MessageSent', (data) => {
                const message = data.message;		 
                message.written_By_Me = '0';   
             
                 this.addMessage(message);
            });
            
            
            window.Echo.join(`messenger`).here((users) => {
                console.log(users);
                users.forEach(user =>
                this.changeStatus(user, true));
                
            })
            .joining(
            
                user => 
                this.changeStatus(user,true)
            )
            .leaving(
                user =>
                 this.changeStatus(user,false)
            );
            
        },
        methods: {
            ...mapActions({
                getMessages: msgTypes.actions.getMessages,
                getConversations: msgTypes.actions.getConversations,
                
                
            }),
            ...mapMutations({
                addMessage: msgTypes.mutations.addMessage,
                setUser: msgTypes.mutations.setUser
            }),


          
           
            changeStatus(user, status){
                
                const index = this.conversations.findIndex((conversation) => {
                    return conversation.contact_id == user.id;
                });
                if(index >= 0)
                    this.$set(this.conversations[index], 'online', status );
            }
        },
        computed:{

            ...mapGetters({

                            conversationsFiltered: msgTypes.getters.conversationsFiltered,
                            selectedConversation: msgTypes.getters.selectedConversation,
                            getConversationById: msgTypes.getters.getConversationById,
                            user: msgTypes.getters.getUser,
                            conversations: msgTypes.getters.getConversations
                        
            }),
            ...mapState({
               
                
            }),

            
            

            MyImageUrl(){
                return `/users/${this.user.image}`  ;
            }
        }
    }
</script>
