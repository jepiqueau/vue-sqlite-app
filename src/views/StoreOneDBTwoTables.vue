<template>
  <h1>StoreOneDBTwoTables</h1>
  <Suspense>
    <template #default>
      <OneDBTwoTablesTest />
    </template>
    <template #feedback>
      <div> Loading ... </div>
    </template>
  </Suspense>
</template>
<script>
import OneDBTwoTablesTest from '@/components/OneDBTwoTablesTest.vue';
export default {
  name: 'StoreOneDBTwoTables',
  components: { OneDBTwoTablesTest }
};
</script>
<style>
h1 {
    text-align: center;
}
</style>