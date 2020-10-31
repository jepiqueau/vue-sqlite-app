<template>
  <div id="default-container">
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
  name: 'DefaultTest',
  async setup() {
    const log = ref("");
    const { openStore, getItem, setItem, getAllKeys, getAllValues,
            getAllKeysValues, isKey, removeItem,
            clear} = useStorageSQLite();
    log.value = log.value.concat("**** Starting Test Default Store ****\n"); 
    // open store
    const resOpen = await openStore({});
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
    await setItem("session","Session Opened");
    const session = await getItem('session');
    if(session != "Session Opened") {
      log.value = log.value.concat("setItem/getItem session failed \n");
      return { log };
    } else {
      log.value = log.value.concat("setItem/getItem session was successful \n");
    }
    // store a JSON Object in the default store
    const data = {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}};
    await setItem("testJson",JSON.stringify(data));
    const testJson = await getItem("testJson");
    if( testJson != JSON.stringify(data) ) {
      log.value = log.value.concat("setItem/getItem testJson failed \n");
      return { log };
    } else {
      log.value = log.value.concat("setItem/getItem testJson was successful \n");
    }
    // store a number in the default store
    const data1 = 243.567;
    await setItem("testNumber",data1.toString());
    // read number from the store
    const testNumber = await getItem("testNumber");
    if( testNumber != data1 ) {
      log.value = log.value.concat("setItem/getItem testNumber failed \n");
      return { log };
    } else {
      log.value = log.value.concat("setItem/getItem testNumber was successful \n");
    }
    // isKey tests
    const iskey = await isKey('testNumber');
    if( !iskey ) {
      log.value = log.value.concat("isKey testNumber failed \n");
      return { log };
    } else {
      log.value = log.value.concat("isKey testNumber was successful \n");
    }
    const iskey1 = await isKey('foo');
    if( iskey1 ) {
      log.value = log.value.concat("isKey foo failed \n");
      return { log };
    } else {
      log.value = log.value.concat("isKey foo was successful \n");
    }
    // Get All Keys
    const keys = await getAllKeys();
    if(keys.length != 3) {
      log.value = log.value.concat("getAllKeys failed \n");
      return { log };
    } else {
      for(let i = 0; i< keys.length;i++) {
        log.value = log.value.concat(' key[' + i + "] = " + keys[i] + "\n");
      }
      log.value = log.value.concat("getAllKeys was successful \n");
    }
    // Get All Values
    const values = await getAllValues();
    if(values.length != 3) {
      log.value = log.value.concat("getAllValues failed \n");
      return { log };
    } else {
      for(let i = 0; i< values.length;i++) {
        log.value = log.value.concat(' key[' + i + "] = " + values[i] + "\n");
      }
      log.value = log.value.concat("getAllValues was successful \n");
    }
    // Get All KeysValues
    const keysvalues = await getAllKeysValues();
    if(keysvalues.length != 3) {
      log.value = log.value.concat("getAllKeysValues failed \n");
      return { log };
    } else {
      log.value = log.value.concat("getAllKeysValues was successful \n");
    }
    // Remove a key 
    const res = await removeItem('testJson')
    if( !res ) {
      log.value = log.value.concat("removeItem failed \n");
      return { log };
    } else {
      log.value = log.value.concat("removeItem was successful \n");
    }
    // Get All Keys
    const keys1 = await getAllKeys();
    if(keys1.length != 2) {
      log.value = log.value.concat("getAllKeys after removeItem failed \n");
      return { log };
    } else {
      for(let i = 0; i< keys1.length;i++) {
        log.value = log.value.concat(' key[' + i + "] = " + keys1[i] + "\n");
      }
      log.value = log.value.concat("getAllKeys after removeItem was successful \n");
    }
    log.value = log.value.concat("\n**** Test Default Store was successful ****\n"); 
    return { log };
  }

});
</script>
