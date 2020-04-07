<template>
    <div>
        <b-media :right-align="writtenByMe=='1'?true:false" vertical-align="center" class="mb-2">
            <template v-slot:aside>
                <b-img rounded="circle" :src="image" width="48" alt="placeholder"></b-img>
            </template>
            <b-card >
                <slot></slot>
            </b-card>
        </b-media>
    </div>
</template>

<script>
export default {
        props: {
            writtenByMe: String,
            image: String
        },
        data(){
            return{
        
            };
        },
        mounted() {
            
        }
    }
</script>