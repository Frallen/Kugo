<template>
  <div class="container">
    <div class="page-wrapper">
      <h5 class="page-wrapper-title">
        Избранное
      </h5>
      <div class="favorites" v-if="Favorites&&Favorites.data.length>0">
        <div class="favorites-body">

          <Offers :offerType="Favorites"></Offers>
          <!--  <Pagination @currentPage="e=> currentPage=e"></Pagination>-->

        </div>

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

</style>