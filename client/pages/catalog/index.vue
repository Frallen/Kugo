<template>
    <StockBlock></StockBlock>
    <div class="container">
        <div class="catalog">
            <Filter class="catalog-filter" ></Filter>
            <div class="catalog-body"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.catalog {
  display: flex;

  &-filter {
    width: 30%;
  }

  &-body {
    width: 65%;
  }
}
</style>