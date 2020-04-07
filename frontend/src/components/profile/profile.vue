<template>
    <b-container >
    <b-form class="m-3" @submit.prevent="sendUpdate" enctype="multipart/form-data">
        
      <b-form-group
        label="Correo Electronico:"
        >
        <b-form-input
          v-model="data.email"
          name="email"
          type="email"
          disabled
          placeholder="example@email.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ingresa tu nombre:" >
        <b-form-input
        name="name"
          v-model="data.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Nueva Contraseña (Solo si se desea modificar):" >
        <b-form-input
        type="password"
          name="password"
          v-model="data.password"
          placeholder="Ingresa tu nueva contraseña"
        ></b-form-input>
      </b-form-group>

        <b-img rounded="circle" :src="image" width="60" height="60" alt="Imagen de perfil"></b-img>
           
       <b-form-group label="Foto de perfil" >
        <b-form-file
          name="img"
          ref="file-input"
          @change="onFileSelected"
          placeholder="Seleccione una imagen"
        ></b-form-file>
      </b-form-group>

             

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
 import { mapActions, mapGetters, mapMutations} from 'vuex'
import profileTypes from '../../types/profile' 
export default {
      props:{
          csrfToken: String
      },
    data() {
      return {
          img: '',
          data: {
            email:'',
            name:'',
            password: '',
            selectedFile: null,
          }
      }
    },
     mounted() {
            
            this.setUser();

            this.data.name = this.user.name;
            this.data.email = this.user.email;
            this.data.password = '';
            this.img = this.user.image;
         },   
    methods: {
        onFileSelected(event){
            this.data.selectedFile = event.target.files[0]
        },
        sendUpdate(){
          
            let data2 = new FormData();
            
            if(this.data.selectedFile){
              data2.append('img', this.data.selectedFile);
            }
            data2.append('name', this.data.name);
            data2.append('email', this.data.email);
            data2.append('password', this.data.password);
        
            this.updateProfile(data2);
             this.$refs['file-input'].reset();
                   this.data.password;
        },
        ...mapActions({
                updateProfile: profileTypes.actions.updateProfile,
              
                
            }),
        ...mapMutations({
            
            setUser: profileTypes.mutations.setUser
        }),
    },
    computed:{
        ...mapGetters({
            usser: profileTypes.getters.getUser     
        }),
        
        user(){
           return  this.usser;
        },
        image(){
            if(this.user.image)
              return `/users/${this.user.image}`;
            else
              return '';
        }
    }
  }
</script>