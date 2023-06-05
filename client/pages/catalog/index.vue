<template>
  <div class="catalog-head">
    <NuxtImg src="catalog.png"></NuxtImg>
    <div class="container">
      <h4>Каталог товаров</h4>
    </div>
  </div>
  <div class="container">
    <Categories></Categories>
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
  margin: 20px 1.875em 50px;
  position: relative;
  height: 200px;
  .br(10px);
  overflow: hidden;
  @media @lg {
    margin: 20px 1.3em 50px;

  }
  @media @md {
    margin: 20px 1em;
  }
  @media @sm {
    margin: 20px 0.5em;
  }

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translateX(13%);
    @media @lg {
      object-fit: cover;
    }
  }

  h4 {
    padding: 70px 0;
    font-weight: 600;
    font-size: 2.188em;
    line-height: 51px;
    color: #fff;
    text-transform: uppercase;
    @media @lg {
      font-size: 1.5em;
    }
  }
}
</style>