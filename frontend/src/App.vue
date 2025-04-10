<template>
  <div id="app">
    <h1>Welcome</h1>
    <router-link to="/signup">Go to Sign Up</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
#app {
  text-align: center;
  margin-top: 40px;
}
</style>
