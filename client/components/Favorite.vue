<template>
    <div class="favorite" @click.stop="">
        <Icon name="ph:heart-straight-fill" class="icon" v-if="isFavorite"
        />
        <Icon name="ph:heart-straight" class="icon" v-else
        />
    </div>
</template>

<script setup lang="ts">
interface propsType {
    isFavorite: boolean;
}

let {isFavorite} = withDefaults(defineProps<propsType>(), {
    isFavorite: false
})
</script>

<style scoped lang="less">
.favorite {
  cursor: pointer;
  padding: 10px;
  color: @purple;
  font-size: 1em;
  border: 1.3px solid #EAEBED;
  .br(300px);
  z-index: 2;
}

.active {

}
</style>