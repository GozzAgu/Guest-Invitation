<template>
  <div>

    <router-view/>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.app {
  background-color: white;
  color: rgb(38, 38, 97);
}

.dark {
  background-color: rgb(38, 38, 97);
  color: white;
}
</style>
