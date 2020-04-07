<template>
    <b-form class=" my-3 mx-2">
        <b-form-input
        class="text-center"
        type="text"
        :placeholder="$t('messenger.searchContact')"
        v-model="querySearch"
        >
        </b-form-input>
    </b-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import msgTypes from '../../types/messenger'
export default {
    methods:{
        ...mapMutations({
            newQuerySearch: msgTypes.mutations.newQuerySearch
        })
    },

    computed:{
        ...mapState({
            squerySearch: msgTypes.state.querySearch
        }),
        
        querySearch: {
            get(){
                return this.squerySearch;
            },
            set (value){
                this.newQuerySearch(value);
            }
        }
    }
}
</script>