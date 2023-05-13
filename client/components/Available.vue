<template>
    <div class="stat">
        <div class="stat-icon"></div>
        В наличии
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.stat {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: @gray;

  &-icon {
    width: 9px;
    height: 9px;
    background: #75D14A;
    .br(100%);
    margin: 0 10px 0 0;
  }
}
</style>