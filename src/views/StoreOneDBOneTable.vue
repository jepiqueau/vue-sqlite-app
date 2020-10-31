<template>
  <h1>StoreOneDBOneTable</h1>
  <Suspense>
    <template #default>
      <OneDBOneTableTest />
    </template>
    <template #feedback>
      <div> Loading ... </div>
    </template>
  </Suspense>
</template>
<script>
import OneDBOneTableTest from '@/components/OneDBOneTableTest.vue';
export default {
  name: 'StoreOneDBOneTable',
  components: { OneDBOneTableTest }
};
</script>
<style>
h1 {
    text-align: center;
}
</style>