<template>
  <div class="categories" v-if="categories">
    <div class="categories-header">
      <h3>Популярные категории</h3>
      <SupportWidget></SupportWidget>
    </div>
    <div class="categories-wrapper">
      <NuxtLink :to="`/catalog/${item.attributes.Slug}`" v-for="item in categories.data" :key="item.id"
                class="categories-item">
        <NuxtImg provider="cloudinary"
                 :src="item.attributes.Image.data.attributes.url"></NuxtImg>
        <span>{{ item.attributes.publicTitle }}</span></NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const {categories} = storeToRefs(useCatalog())

</script>

<style scoped lang="less">
.categories {
  margin: 50px 0;

  &-header {
    display: flex;
    justify-content: space-between;
    margin: 0 0 68px 0;
    @media @sm {
      margin: 0 0 38px 0;
      flex-direction: column;
      align-items: center;
    }

    .support {
      @media @sm {
        margin: 20px 0 0;
      }
    }

    h3 {
      @media @sm {
        text-align: center
      }
    }
  }

  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: -30px 0 0 -20px;
    @media @lg {
      margin: -20px 0 0 -15px;
    }
    @media @sm {
      justify-content: center;
      margin: -10px 0 0 0;

    }

  }

  &-item {
    width: calc(100% / 4 - 20px);
    height: 264px;
    margin: 30px 0 0 20px;
    position: relative;
    .br(10px);
    overflow: hidden;
    display: block;
    @media @xl {
      width: calc(100% / 3 - 15px);
      margin: 20px 0 0 15px;
    }
    @media @md {
      width: calc(100% / 2 - 15px);
      margin: 20px 0 0 15px;
    }
    @media @sm {
      width: 80%;
      margin: 10px 0 0 0;
    }
    @media @xs {
      width: 100%;
    }

    span {
      padding: 10px 16px;
      display: block;
      position: absolute;
      bottom: 10%;
      left: 10%;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
      .br(10px);
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      color: #fff;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>