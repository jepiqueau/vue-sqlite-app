<template>
    <div v-if="platform === 'web'">
      <jeep-sqlite />
    </div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted } from "vue";
import { useSQLite } from 'vue-sqlite-hook/dist';
import { Capacitor } from '@capacitor/core';

export default defineComponent({
  name: "App",
  setup() {
    const platform = Capacitor.getPlatform();
    const app = getCurrentInstance();
    const jsonListeners = app?.appContext.config.globalProperties.$isJsonListeners;
    const contentMessage = app?.appContext.config.globalProperties.$messageContent;
    onMounted(async () => {
      console.log(' in App on Mounted');
      const onProgressImport = async (progress) => {
        if(jsonListeners.jsonListeners.value) {
          contentMessage.setMessage(
              contentMessage.message.value.concat(`${progress}\n`));
        }
      }
      const onProgressExport = async (progress) => {
        if(jsonListeners.jsonListeners.value) {
          contentMessage.setMessage(
            contentMessage.message.value.concat(`${progress}\n`));
        }
      }  
      if( app != null) { 
        app.appContext.config.globalProperties.$sqlite = useSQLite({
          onProgressImport,
          onProgressExport
        });
      }
    });
    return {platform}
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
