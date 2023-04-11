<template>
    <StockBlock></StockBlock>
    <div class="container">
        <div class="catalog">
            <Filter class="catalog-filter"></Filter>
            <div class="catalog-body"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const {categories} = useCatalog()

definePageMeta({
    validate: async (route) => {
        return categories.some(p => p.attributes.Slug === route.params.slug)
    }
})
</script>

<style scoped lang="less">
.catalog {
  display: flex;

  &-filter {
    width: 25%;
  }

  &-body {
    width: 70%;
  }
}
</style>