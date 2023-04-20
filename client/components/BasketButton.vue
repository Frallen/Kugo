<template>
    <div class="basket-button">
        <Icon name="ri:shopping-basket-2-fill" class="icon"
        />
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="less">
.basket-button {
  cursor: pointer;
  padding: 10px;
  color: @purple;
  font-size: 1em;
  border: 1.3px solid #EAEBED;
  .br(300px);
  z-index: 2;
}
</style>