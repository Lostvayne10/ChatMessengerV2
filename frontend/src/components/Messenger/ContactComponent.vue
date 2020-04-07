<template>
         <b-list-group-item :variant="variant">
            <b-row class="p-2" align-h="center">
                <b-col cols="12" md="3" class="text-center">
                  <b-img rounded="circle" :src="conversation.contact_image" width="60" height="60" alt="placeholder"></b-img>  
                 <!--  <b-img src="https://picsum.photos/125/125/?image=58" width="60" height="60" rounded="circle" alt="Circle image"></b-img> -->
                   
                </b-col>
                <b-col cols="6" align-self="center" class="d-none d-md-block">
                    <p class="mb-1">
                      <status-component :online="conversation.online"/>
                      {{conversation.contact_name}}</p>

                    <p class="text-muted small mb-0">{{conversation.last_message}}</p>
                </b-col>
                <b-col cols="3" class="d-none d-md-block">
                    <p class="text-muted small ">{{ lastTime }}</p>
                </b-col>
            </b-row>
        </b-list-group-item>
</template>

<script>
import moment from 'moment'
    export default {
        props:{
            conversation: Object,
            selected: Boolean
        },
        data(){
            return{
               
            };  
        },
        mounted() {
            
        },
        computed:{
            lastTime(){
                return moment(this.conversation.last_time, "YYYY-MM-DD hh:mm:ss").locale('es').fromNow();
            },
            variant(){
                return this.selected ? 'secondary' : '';
            }

        }
    }
</script>
