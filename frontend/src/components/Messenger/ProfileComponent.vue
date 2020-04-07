<template>
  <b-container >
    <b-form class="m-3" action="" v-on="data" method="post" enctype="multipart/form-data">
        <input type="hidden" name="_token" v-model="csrfToken">
      <b-form-group
        label="Correo Electronico:"
        >
        <b-form-input
          v-model="user.email"
          name="email"
          type="email"
          disabled
          placeholder="example@email.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ingresa tu nombre:" >
        <b-form-input
        name="name"
          v-model="user.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Nueva Contraseña (Solo si se desea modificar):" >
        <b-form-input
        type="password"
          name="password"
          
          placeholder="Ingresa tu nueva contraseña"
        ></b-form-input>
      </b-form-group>

        <b-img rounded="circle" :src="image" width="60" height="60" alt="Imagen de perfil"></b-img>
           
       <b-form-group label="Foto de perfil" >
        <b-form-file
          name="img"
          
          placeholder="Seleccione una imagen"
        ></b-form-file>
      </b-form-group>

             

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import profileModule from '../../types/profile'    
    export default {
      props:{
         
          csrfToken: String
      },
    data() {
      return {
          data: {}
      }
    },
    methods: {
        ...mapActions({
            update: profileModule.actions.updateProfile
        }),

        sendUpdate(){
          this.update(this.data);
        }
    },
    computed:{
      ...mapGetters({              
              user: profileModule.getters.getUser
                        
      }),

        image(){
            return `/users/${this.user.image}`;
        }
    }
  }
</script>