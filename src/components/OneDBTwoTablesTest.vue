<template>
  <div id="onedb-twotables-container">
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
  name: 'OneDBTwoTablesTest',
  async setup() {
    const log = ref("");
    const { openStore, getItem, setItem, getAllKeys, getAllKeysValues,
            setTable, clear} = useStorageSQLite();
    log.value = log.value.concat("**** Starting Test One DB Two Tables Store ****\n");
    // Set first table 
    const retFirst =  await setFirstTable(log, openStore, getItem, setItem,
                                                getAllKeys, clear);
    if(!retFirst) {
        log.value = log.value.concat("\n**** Test One DB Two Table Store first table failed ****\n"); 
        log.value = log.value.concat("\n**** Test One DB Two Tables Store failed ****\n"); 
        return { log };
    } else {
        // Set second table
        const retSecond =  await setSecondTable(log, openStore, getItem, setItem,
                                                getAllKeys, setTable, clear);
        if(!retSecond) {
            log.value = log.value.concat("\n**** Test One DB Two Table Store second table failed ****\n"); 
            log.value = log.value.concat("\n**** Test One DB Two Tables Store failed ****\n"); 
            return { log };
        } else {
            // update first table
            const retFirst = await updateFirstTable(log, getItem, setItem,
                                                getAllKeys, setTable )
            if(!retFirst) {
                log.value = log.value.concat("\n**** Test One DB Two Table Store update first table failed ****\n"); 
                log.value = log.value.concat("\n**** Test One DB Two Tables Store failed ****\n"); 
                return { log };
            } else {
                const retSecond = await getKeysValuesFromSecondTable(log, getAllKeysValues,
                                            setTable)
                if(!retSecond) {
                    log.value = log.value.concat("\n**** Test One DB Two Table Store get values from second table failed ****\n"); 
                    log.value = log.value.concat("\n**** Test One DB Two Tables Store failed ****\n"); 
                    return { log };
                } else {
                    log.value = log.value.concat("\n**** Test One DB Two Tables Store was successful ****\n"); 
                    return { log };
                }
            }
        }
    }
  }
});
async function setFirstTable(log, openStore, getItem, setItem,
                            getAllKeys, clear) {
    log.value = log.value.concat("-> Starting Set First Table \n");
    // open store
    const resOpen = await openStore({database:"myStore",table:"saveData"});
    if( !resOpen ) {
      log.value = log.value.concat("openStore failed \n");
      return false;
    } else {
      log.value = log.value.concat("openStore was successful \n");
    }
    // clear the store 
    const rClear = await clear();
    if( !rClear ) {
      log.value = log.value.concat("clear 'saveData' failed \n");
      return false;
    } else {
      log.value = log.value.concat("clear 'saveData' was successful \n");
    }
    // store a string 
    await setItem("app","App Opened");
    const app = await getItem('app');
    if(app != "App Opened") {
      log.value = log.value.concat("setItem/getItem app failed \n");
      return false;
    } else {
      log.value = log.value.concat("setItem/getItem app was successful \n");
    }
    // store a JSON Object in the store
    const data = {'age':40,'name':'jeep','email':'jeep@example.com'};
    await setItem("user",JSON.stringify(data));
    const testUser = await getItem("user");
    if( testUser != JSON.stringify(data) ) {
      log.value = log.value.concat("setItem/getItem user failed \n");
      return false;
    } else {
      log.value = log.value.concat("setItem/getItem user was successful \n");
    }
    // Get All Keys
    const keys = await getAllKeys();
    if(keys.length != 2) {
      log.value = log.value.concat("getAllKeys failed \n");
      return false;
    } else {
      for(let i = 0; i< keys.length;i++) {
        log.value = log.value.concat(' key[' + i + "] = " + keys[i] + "\n");
      }
      log.value = log.value.concat("getAllKeys was successful \n");
    }
    return true;

}
async function setSecondTable(log, openStore, getItem, setItem,
                            getAllKeys, setTable, clear) {
    log.value = log.value.concat("-> Starting Set Second Table \n");
    const retTable = await setTable("otherData");
    if(!retTable.result) {
        log.value = log.value.concat("setTable 'otherData' failed \n");
        return false;
    } else {
        log.value = log.value.concat("setTable 'otherData' was successful \n");
    }
    const rClear = await clear();
    if( !rClear ) {
      log.value = log.value.concat("clear 'otherData' failed \n");
      return false;
    } else {
      log.value = log.value.concat("clear 'otherData' was successful \n");
    }
    // store a string 
    await setItem("key1", "Hello World!");
    const key1 = await getItem('key1');
    if(key1 != "Hello World!") {
      log.value = log.value.concat("setItem/getItem key1 failed \n");
      return false;
    } else {
      log.value = log.value.concat("setItem/getItem key1 was successful \n");
    }
    // store a JSON Object in the store
    const data = {'a':60,'pi':'3.141516','b':'cool'};
    await setItem("key2",JSON.stringify(data));
    const key2 = await getItem("key2");
    if( key2 != JSON.stringify(data) ) {
      log.value = log.value.concat("setItem/getItem key2 failed \n");
      return false;
    } else {
      log.value = log.value.concat("setItem/getItem key2 was successful \n");
    }
    // Get All Keys
    const keys = await getAllKeys();
    if(keys.length != 2) {
      log.value = log.value.concat("getAllKeys failed \n");
      return false;
    } else {
      for(let i = 0; i< keys.length;i++) {
        log.value = log.value.concat(" key[" + i + "] = " + keys[i] + "\n");
      }
      log.value = log.value.concat("getAllKeys was successful \n");
    }
    return true;
}
async function updateFirstTable(log, getItem, setItem,
                                getAllKeys, setTable) {
    log.value = log.value.concat("-> Starting Update First Table \n");
    const retTable = await setTable("saveData");
    if(!retTable.result) {
        log.value = log.value.concat("setTable 'saveData' failed \n");
        return false;
    } else {
        log.value = log.value.concat("setTable 'saveData' was successful \n");
    }
    // store a JSON Object in the store
    const data = {'color':"#ff235a",'opacity':0.75};
    await setItem("state",JSON.stringify(data));
    const state = await getItem("state");
    if( state != JSON.stringify(data) ) {
      log.value = log.value.concat("setItem/getItem state failed \n");
      return false;
    } else {
      log.value = log.value.concat("setItem/getItem state was successful \n");
    }
    // Get All Keys
    const keys = await getAllKeys();
    if(keys.length != 3) {
      log.value = log.value.concat("getAllKeys failed \n");
      return false;
    } else {
      for(let i = 0; i< keys.length;i++) {
        log.value = log.value.concat(' key[' + i + "] = " + keys[i] + "\n");
      }
      log.value = log.value.concat("getAllKeys was successful \n");
    }
    return true;
}
async function getKeysValuesFromSecondTable(log, getAllKeysValues,
                                            setTable) {
    log.value = log.value.concat("-> Starting Get Keys Values from Second Table \n");
    const retTable = await setTable("otherData");
    if(!retTable.result) {
        log.value = log.value.concat("setTable 'otherData' failed \n");
        return false;
    } else {
        log.value = log.value.concat("setTable 'otherData' was successful \n");
    }
    // Get All Keys/Values
    const keysvalues = await getAllKeysValues();
    if(keysvalues.length != 2) {
      log.value = log.value.concat("getAllKeysValues failed \n");
      return false;
    } else {
      for(let i = 0; i< keysvalues.length;i++) {
        log.value = log.value.concat(" key[" + i + "] = " + keysvalues[i].key +
            ' value[' + i + "] = " + keysvalues[i].value  + "\n");
      }
      log.value = log.value.concat("getAllKeysValues was successful \n");
    }
    return true;

}
                                
</script>
