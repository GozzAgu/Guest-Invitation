<template>
  <div :class="[mode ? 'dark-mode' : '']">
    <button @click="toggle" class="btn btn-success mt-2" >
      <i v-if="mode" class="ri-contrast-2-fill"></i>
      <i v-else class="ri-contrast-2-line"></i>
    </button>
    
    <router-view/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const mode = ref(true);
const iconShow = ref(false)

const toggle = () => {
  mode.value = !mode.value
  iconShow.value = !iconShow.value
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dark-mode {
  background-color: #2c3e50;
}
</style>
