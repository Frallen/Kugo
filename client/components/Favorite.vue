<template>
  <div class="favorite">
    <template v-if="isAuth">
      <Icon name="ph:heart-straight-fill" class="icon" v-if="isFavorite" @click.stop="updateFavorites(id,false)"
      />
      <Icon name="ph:heart-straight" class="icon" v-else @click.stop="updateFavorites(id,true)"
      />
    </template>
    <Icon v-else name="ph:heart-straight" class="icon" @click.stop="AuthModalChanger(true)"
    />
  </div>
</template>

<script setup lang="ts">
const {isAuth} = storeToRefs(useUser())
const {AuthModalChanger} = useMain()
const {updateFavorites} = useUser()

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