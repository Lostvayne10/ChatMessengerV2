<template>
  <div  fluid style="height: calc(100vh - 80px)">
    <navbar-component></navbar-component>
    <router-view fluid style="height: calc(100vh - 80px)"></router-view>
    
  </div>
</template>

<script>

export default {
  name: 'App',
 
}
</script>


