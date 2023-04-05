<template>
  <Navbar></Navbar>
  <div><slot></slot></div>
</template>

<script setup lang="ts">

const { getDeals } = useCatalog();
await getDeals();
</script>

<style lang="less"></style>
