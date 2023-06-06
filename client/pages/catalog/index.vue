<template>
  <div class="container">
    <div class="catalog-head">
      <NuxtImg src="catalog.png"></NuxtImg>
      <div class="container">
        <h4>Каталог товаров</h4>
      </div>
    </div>
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
  background: linear-gradient(88.23deg, #6F73EE 49%, rgba(111, 115, 238, 0) 59.45%);
  border-radius: 10px;
  margin: 20px 0 50px;
  position: relative;
  height: 200px;
  .br(10px);
  overflow: hidden;
  @media (min-width: 1921px) {
    background: linear-gradient(88.23deg, #6F73EE 50%, rgba(111, 115, 238, 0) 59.45%);
  }
  @media @xl{
    background: linear-gradient(88.23deg, #6F73EE 24.95%, rgba(111, 115, 238, 0) 59.45%);
  }
  @media @xs{
    height: 160px;
  }

  img {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    z-index: -1;
    transform: translateX(13%);

    @media (min-width: 1921px) {
      transform: translateX(0);
    }
    @media @xl {
      transform: translateX(20%);
      width: 100%;
      object-fit: cover;
    }
    @media @xs{
      transform:initial;
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
    @media @xs{
      font-size: 1.2em;
      padding: 55px 0;
    }
  }
}
</style>