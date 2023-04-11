<template>
  <Navbar></Navbar>
  <div><slot></slot></div>
</template>

<script setup lang="ts">

const { getDeals,getFilters } = useCatalog();
await getDeals();
await getFilters()
</script>

<style lang="less">

</style>
