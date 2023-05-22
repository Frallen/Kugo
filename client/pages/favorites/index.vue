<template>
  <div class="favorites">
    <div class="favorites-body">
      <template v-if="user.Favorites">
        <Offers :offerType="user.Favorites"></Offers>
        <Pagination @currentPage="e=> currentPage=e"></Pagination>
      </template>
      <Empty v-else :title="'В избранном пусто'"
             :text="'Добавьте товары в избранное, чтобы просмотреть или купить их позже'"></Empty>
    </div>
  </div>
</template>


<script setup lang="ts">

const {user} = storeToRefs(useUser())
// начальная страница пагинации
const currentPage = useState<number>(() => 1)
</script>


<style scoped lang="less">

</style>