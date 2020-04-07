<template>
           <b-img rounded="circle" blank 
           :title="online ? 'Conectado' : 'Desconectado'"
           :blank-color="online ? 'green' : 'gray'" width="10" height="10" alt="placeholder"></b-img>          
</template>

<script>
export default {
    props:{
        online: Boolean
    }
}
</script>
