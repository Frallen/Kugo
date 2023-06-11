<template>
  <div class="container">
      <div class="favorites" >
        <div class="favorites-body" v-if="Favorites&&Favorites.data.length>0">
          <Offers :offerType="Favorites"></Offers>
          <!--  <Pagination @currentPage="e=> currentPage=e"></Pagination>-->
        </div>
        <Empty v-else :title="'В избранном пусто'"
                       :text="'Добавьте товары в избранное, чтобы просмотреть или купить их позже'"></Empty>
      </div>
  </div>
</template>


<script setup lang="ts">
const {Favorites} = storeToRefs(useUser())
definePageMeta({
  middleware: "auth",
  breadcrumb: "Избранное",
  Title: "Избранное"
})

// начальная страница пагинации
//const currentPage = useState<number>(() => 1)

useHead({
  title: 'Избранное',
  meta: [
    {name: 'description', content: 'Избранное'}
  ],
})
</script>


<style scoped lang="less">
.favorites{
  margin: 50px 0 100px;
}
</style>