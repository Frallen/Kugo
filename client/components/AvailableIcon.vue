<template>
    <div class="icon-button stat">
        <div class="stat-icon"></div>
        В наличии
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.stat {

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