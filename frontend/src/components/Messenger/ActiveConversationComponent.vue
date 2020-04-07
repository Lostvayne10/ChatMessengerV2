<template>
    <b-row  class="h-100">
        
        <b-col cols="8">
            <b-card no-body
                footer-bg-variant="info"
                footer-border-variant="dark"
                class="h-100"
              >
                <b-card-body class="card-body-scroll">

                    <message-conversation-component   
                        v-for="message in messages"
                        :key="message.id"
                        :writtenByMe =  "message.written_By_Me"
                        :image="message.written_By_Me=='1' ? myImage : selectedConversation.contact_image">
                        {{ message.content }}
                    </message-conversation-component> 

                </b-card-body> 

                <div slot="footer">
                    <b-form class="mb-0" @submit.prevent="postMessages" autocomplete="off">

                        <b-input-group>
                            <b-form-input class="text-center"
                            type="text"
                            v-model="newMessage"
                            :placeholder="$t('messenger.insertMessage')">
                            </b-form-input>
                            <b-input-group-append>
                                <b-button type="submit" variant="primary"> {{ $t('messenger.btnSend') }} </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form>
                </div>
            </b-card>
        </b-col>
        <b-col cols="4">
            <b-img :src="selectedConversation.contact_image" rounded="circle"   width="60" height="60"   alt="img" class="mb-0"></b-img>
            <p>{{ selectedConversation.contact_name }}</p>
            <hr>
            <b-form-checkbox> 
                Desactivar Notificaciones
            </b-form-checkbox>
        </b-col>
    </b-row>
</template>

<style >
    .card-body-scroll{
        max-height : calc(100vh - 150px);
        overflow-y: auto;
    }
</style>

<script>
import msgTypes from '../../types/messenger'
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
        props: {
            myImage: String
        },
        data(){
            return{
                newMessage: ''
                
            };
        },
        mounted() {
            
          this.scrollToBottom();
         
        },
        methods: {
            ...mapActions({
                spostMessages: msgTypes.actions.postMessage
            }),

            postMessages(){
                
               this.spostMessages(this.newMessage);
               this.newMessage = '';
            },
            scrollToBottom(){
                const el = document.querySelector('.card-body-scroll');
                el.scrollTop = el.scrollHeight;
            }
        },
        updated(){
            this.scrollToBottom();
        },
        computed: {

            ...mapGetters({
                selectedConversation: msgTypes.getters.selectedConversation,
                messages: msgTypes.getters.getterMessages
            }),

            ...mapState({
                
               
            }),

            
        
        }

    }
</script>