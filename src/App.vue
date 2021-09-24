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
    onMounted(async () => {
      console.log(' in App on Mounted');
      if( app != null) { 
        app.appContext.config.globalProperties.$sqlite = useSQLite();
        if(platform === "web") {
          await customElements.whenDefined('jeep-sqlite');
          const jeepSqliteEl = document.querySelector('jeep-sqlite');
          if(jeepSqliteEl != null) {
            // Initialize the Web Store since @capacitor-community/sqlite@3.2.3-1
            await app.appContext.config.globalProperties.$sqlite.initWebStore();
            console.log(`isSoreOpen ${await jeepSqliteEl.isStoreOpen()}`);
          } else {
            console.log('$$ jeepSqliteEl is null');
          }
        }
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
