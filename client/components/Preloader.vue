<template>
    <div class="preloader">
        <NuxtImg

                src="preloader.gif"
        ></NuxtImg>
    </div>
</template>

<script lang="ts" setup>


</script>

<style scoped lang="less">
.preloader {
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
}
</style>