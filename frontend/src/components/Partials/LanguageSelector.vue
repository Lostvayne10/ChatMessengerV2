<template>
 

    <b-nav-item-dropdown :text="$t('navigation.language')" right>
                    
                        <b-dropdown-item href="#" @click.prevent="updateLanguage('es')">
                           Español
                        </b-dropdown-item>
                        <b-dropdown-item href="#" @click.prevent="updateLanguage('en')">
                           Ingles
                        </b-dropdown-item>
    </b-nav-item-dropdown>
   

</template>

<script>
  import globalTypes from '../../types/global';
  import {mapActions} from 'vuex';
  export default {
    name: 'language-selector',
    data () {
      return {
        selected_language: 'es',
        languages: [
          { value: 'es', label: 'Español' },
          { value: 'en', label: 'Inglés' },
        ]
      }
    },
    methods: {
      ...mapActions({
            setLanguage: globalTypes.actions.changeLanguage
      }),
      updateLanguage (language) {
        this.selected_language = language;
        this.setLanguage(this.selected_language);
        this.$i18n.locale = this.selected_language;
      }
    },
    computed: {
      currentLanguage () {
        return this.languages.filter(language => language.value === this.selected_language)[0].label;
      }
    }
  }
</script>
