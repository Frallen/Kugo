<template>
  <div class="empty">
    <NuxtImg src="empty.png"></NuxtImg>
    <h5>{{ title }}</h5>
    <p>{{ text }}</p>
    <NuxtLink to="/catalog" class="button button-primary">Перейти в каталог</NuxtLink>
  </div>
</template>
<script setup lang="ts">

interface propsType {
  title: string
  text: string
}

const {title, text} = defineProps<propsType>()
</script>
<style scoped lang="less">
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #F4F7FB;
  .br(10px);
  width: 100%;
  padding: 45px 0;

  .button {
    margin: 25px 0 0 0;
  }

  h5 {
    font-weight: 600;
    font-size: 25px;
    line-height: 36px;
    text-transform: uppercase;
    color: @black;
    margin: 25px 0 10px 0;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    color: @black;
    line-height: 20px;
    padding: 0;
    margin: 0;
  }
}
</style>