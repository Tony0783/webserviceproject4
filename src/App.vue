<template>
  <div id="app">
    <!-- Header -->
    <HeaderComponent />
    <!-- 라우터를 통해 렌더링 -->
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from './app/layout/header/header.component.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #141414;
}

#app {
  text-align: center;
}
</style>
