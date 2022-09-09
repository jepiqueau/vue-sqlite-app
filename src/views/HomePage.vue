<template>
  <h1>Home</h1>
  <button @click="$router.push('/databasenoencryption')">
    DatabaseNoEncryption
  </button>
</template>
<style>
h1 {
  text-align: center;
}
button {
  font-size: 20px;
  margin-top: 1em;
  margin-left: 2em;
}
</style>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "HomePage",
});
</script>
