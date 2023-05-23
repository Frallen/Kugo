<template>
  <div class="container">
    <div class="favorites">
      <div class="favorites-body">
        <template v-if="Favorites">
          <Offers :offerType="Favorites"></Offers>
          <Pagination @currentPage="e=> currentPage=e"></Pagination>
        </template>
        <Empty v-else :title="'В избранном пусто'"
               :text="'Добавьте товары в избранное, чтобы просмотреть или купить их позже'"></Empty>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: "auth"
})
const {Favorites} = storeToRefs(useUser())
// начальная страница пагинации
const currentPage = useState<number>(() => 1)
</script>


<style scoped lang="less">
.favorites {
  margin: 2em 0;
}
</style>