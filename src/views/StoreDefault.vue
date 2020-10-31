<template>
  <h1>StoreDefault</h1>
  <Suspense>
    <template #default>
      <DefaultTest />
    </template>
    <template #feedback>
      <div> Loading ... </div>
    </template>
  </Suspense>
</template>
<script>
import DefaultTest from '@/components/DefaultTest.vue';
export default {
  name: 'StoreDefault',
  components: { DefaultTest }
};
</script>
<style>
h1 {
    text-align: center;
}
</style>