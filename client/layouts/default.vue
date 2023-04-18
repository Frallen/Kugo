<template>
    <Navbar></Navbar>
    <div>
        <slot></slot>
    </div>
    <transition name="fade">
    <Preloader v-show="isLoading"></Preloader>
    </transition>
</template>

<script setup lang="ts">

const {getFilters,isLoading} = useCatalog();

await getFilters()
</script>

<style lang="less">

</style>
