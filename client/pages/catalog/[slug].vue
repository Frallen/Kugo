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
    middleware: "catalog-setup"
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