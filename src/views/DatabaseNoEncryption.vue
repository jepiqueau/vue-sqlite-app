<template>
  <h1>DatabaseNoEncryption</h1>
  <Suspense>
    <template #default>
      <NoEncryptionTest />
    </template>
    <template #feedback>
      <div> Loading ... </div>
    </template>
  </Suspense>
</template>
<script>
import NoEncryptionTest from '@/components/NoEncryptionTest.vue';
export default {
  name: 'DatabaseNoEncryption',
  components: { NoEncryptionTest }
};
</script>
<style>
h1 {
    text-align: center;
}
</style>