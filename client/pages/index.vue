<template>
    <Slider></Slider>
    <div class="container">
        <Offers :offerType="filteredOffer('samokats')"></Offers>
    </div>
</template>

<script setup lang="ts">

const {filteredOffer} = useCatalog()


</script>

<style scoped lang="less"></style>
