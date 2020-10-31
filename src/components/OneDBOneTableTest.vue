<template>
  <div id="onedb-onetable-container">
    <div id="log">
        <pre>
          <p>{{log}}</p>
        </pre>
    </div>
  </div>
</template>

<script >
import { defineComponent, ref } from 'vue';
import { useStorageSQLite } from 'vue-data-storage-sqlite-hook/dist';

export default defineComponent({
  name: 'OneDBOneTableTest',
  async setup() {
    const log = ref("");
    const { openStore, getItem, setItem, getAllKeys,
            clear} = useStorageSQLite();
    log.value = log.value.concat("**** Starting Test One DB One Table Store ****\n"); 
    // open store
    const resOpen = await openStore({database:"myStore",table:"saveData"});
    if( !resOpen ) {
      log.value = log.value.concat("openStore failed \n");
      return { log };
    } else {
      log.value = log.value.concat("openStore was successful \n");
    }
    // clear the store 
    const rClear = await clear();
    if( !rClear ) {
      log.value = log.value.concat("clear failed \n");
      return { log };
    } else {
      log.value = log.value.concat("clear was successful \n");
    }
    // store a string 
    await setItem("app","App Opened");
    const app = await getItem('app');
    if(app != "App Opened") {
      log.value = log.value.concat("setItem/getItem app failed \n");
      return { log };
    } else {
      log.value = log.value.concat("setItem/getItem app was successful \n");
    }
    // store a JSON Object in the default store
    const data = {'age':40,'name':'jeep','email':'jeep@example.com'};
    await setItem("user",JSON.stringify(data));
    const testUser = await getItem("user");
    if( testUser != JSON.stringify(data) ) {
      log.value = log.value.concat("setItem/getItem user failed \n");
      return { log };
    } else {
      log.value = log.value.concat("setItem/getItem user was successful \n");
    }
    // Get All Keys
    const keys = await getAllKeys();
    if(keys.length != 2) {
      log.value = log.value.concat("getAllKeys failed \n");
      return { log };
    } else {
      for(let i = 0; i< keys.length;i++) {
        log.value = log.value.concat(' key[' + i + "] = " + keys[i] + "\n");
      }
      log.value = log.value.concat("getAllKeys was successful \n");
    }
    log.value = log.value.concat("\n**** Test One DB One Table Store was successful ****\n"); 
    return { log };
  }

});
</script>
