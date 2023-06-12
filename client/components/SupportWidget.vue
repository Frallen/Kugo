<template>
    <div class="support" @click.prevent.stop="ServiceModalChanger(true)">
        <NuxtImg src="support.png" class="img"></NuxtImg>
        <p>Менеджер ответит на любой ваш вопрос о продуктах Kugoo
            <span>Задать вопрос</span></p>
    </div>
</template>

<script setup lang="ts">
const {ServiceModalChanger}=useMain()
</script>

<style scoped lang="less">
.support {
  width: 255px;
  padding: 10px;
  text-decoration: none;
  position: relative;
  .br(5px);
  background: #F4F7FB;
  display: flex;
  align-items: center;
  cursor: pointer;

  .img {
      width: 40%;
    overflow: hidden;
    .br(10px)
  }

  p {
    margin: 0 0 0 10px;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: @black;

    span {
      display: block;
      margin: 5px 0 0 0;

      color: @purple;
    }
  }

}
</style>