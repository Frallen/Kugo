<template>
  <div class="catalog-head">
    <NuxtImg src="catalog.png"></NuxtImg>
    <div class="container">
      <h1>Каталог товаров</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  breadcrumb: 'Каталог',
})

</script>

<style scoped lang="less">
.catalog-head {

  background: linear-gradient(88.23deg, #6F73EE 24.95%, rgba(111, 115, 238, 0) 59.45%);
  border-radius: 10px;
  margin: 0 1.875em 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-weight: 600;
    font-size: 2.188em;
    line-height: 51px;
    color: #fff;
    text-transform: uppercase;
    z-index: 2;
  }
}
</style>