<template>
  <div class="favorite">
    <Icon name="ph:heart-straight-fill" class="icon" v-if="isFavorite" @click.stop="userFavorites(id,false)"
    />
    <Icon name="ph:heart-straight" class="icon" v-else @click.stop="userFavorites(id,true)"
    />
  </div>
</template>

<script setup lang="ts">
const {userFavorites} = useUser()

interface propsType {
  id: number,
  isFavorite: boolean;
}

let {isFavorite, id} = defineProps<propsType>()
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