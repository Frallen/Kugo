<template>
    <div class="guarantee">
        <div class="guarantee-item">
            <NuxtImg src="14days.png"></NuxtImg>
        </div>
        <div class="guarantee-item">
            <NuxtImg src="Garant1Y.png"></NuxtImg>
        </div>
        <div class="guarantee-item">
            <NuxtImg src="Garant2Y.png"></NuxtImg>
        </div>
        <div class="guarantee-item">
            <NuxtImg src="Garant3Y.png"></NuxtImg>
        </div>
    </div>
</template>

<script lang="ts">
</script>

<style scoped lang="less">
.guarantee {
  margin: -30px 0 0 -30px;
  display: flex;
  flex-wrap: wrap;
  @media @md {
    flex-direction: column;
  }

  &-item {
    margin: 30px 0 0 30px;
    width: calc(100% / 2 - 30px);
    @media @md {
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>