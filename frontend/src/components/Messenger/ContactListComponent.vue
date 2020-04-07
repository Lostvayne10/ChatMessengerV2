<template>
       
        <b-list-group>
            <contact-component v-for="conversation in conversationsFiltered"
                                :key="conversation.id"
                                :conversation="conversation"
                                :selected="isSelected(conversation)"
                                @click.native="SelectConversation(conversation)">
            </contact-component>
        </b-list-group>
    
        
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import messengerTypes from '../../types/messenger'
    export default {
       
        methods: {
            ...mapActions({
                getMessages: messengerTypes.actions.getMessages,

            }),
           
            SelectConversation(conversation){
                this.$router.push(`/chat/${conversation.id}`)
                this.getMessages(conversation);
            },
            isSelected(conversation){
                
                if(this.selectedConversation)
                    return this.selectedConversation.id === conversation.id;

                return false;
            }
        },
        computed: {
           
            
            ...mapGetters({

                conversationsFiltered: messengerTypes.getters.conversationsFiltered,
                 selectedConversation: messengerTypes.state.selectedConversation
               
            }),

           
        }
    }
</script>
