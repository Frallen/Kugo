<template>
    <StockBlock></StockBlock>
    <div class="container">
        <div class="catalog">
            <div class="catalog-filter" :class="{'visible':filterStatus}">
                <div class="catalog-filter-close">
                    <Icon
                            name="ic:twotone-close"
                            class="icon nav-wrapper-modal"
                            @click="filterStatus = false , overFlow(false)"
                    />
                </div>
                <Filter @filters="e=>Filters=e"></Filter>
            </div>
            <div class="catalog-body">
                <div class="catalog-body-filters">
                    <button class="button button-outlined call-filter" @click="filterStatus=true , overFlow(true)">
                        Фильтры
                    </button>
                    <div></div>
                </div>
                <template v-if="Deals.data">
                    <Offers :offerType="Deals"></Offers>
                    <div class="pagination">
                        <div class="pagination-wrapper">
                            <div class="pagination-item pagination-item-first button button-outlined"
                                 v-show="currentPage>1"
                                 @click="currentPage--">
                                <Icon
                                        name="ic:outline-keyboard-arrow-left"
                                />
                            </div>
                            <div class="pagination-item button button-outlined"
                                 :class="{'button-primary-current':item===currentPage}" v-for="item in Deals.meta.pagination.pageCount"
                                 :key="item"
                                 @click="currentPage=item">
                                {{ item }}
                            </div>
                            <div class="pagination-item pagination-item-first button button-outlined"
                                 v-show="currentPage<Deals.meta.pagination.pageCount" @click="currentPage++">
                                <Icon
                                        name="ic:outline-keyboard-arrow-right"
                                />
                            </div>
                        </div>
                    </div>
                </template>
                <div v-else class="catalog-body-empty"><h4>Элементов не найдено</h4></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {responseFilterType} from "~/types/catalog.types";

const {getDeals, loadMore} = useCatalog()
const {params, path, query} = useRoute()
const router = useRouter();
definePageMeta({
    middleware: "catalog"
})
const Filters = ref<responseFilterType>()
watch(Filters, () => {
    console.log(Filters.value)
    prepare()
})
await getDeals(sluggedCatalog());
const filterStatus = useState<boolean>(() => false)

const {Deals}=storeToRefs(useCatalog())


const currentPage = useState<number>(() => 1)
if (query.page) currentPage.value = parseInt(query.page)
const prepare = async (): Promise<void> => {

    await router.replace({
        path: path,
        query: {
            page: currentPage.value,
            ...(Filters.value&&Filters.value)
        }
    });


    if (sluggedCatalog() && currentPage.value) {
        await loadMore(sluggedCatalog(), currentPage.value.toString())

    }
}

watch(currentPage, () => {
    prepare()

}, {immediate: true})


</script>

<style scoped lang="less">
.catalog {
  display: flex;
  justify-content: space-between;
  @media @lg {
    flex-direction: column;
  }

  &-filter {
    width: 20%;
    @media @lg {
      visibility: hidden;
      opacity: 0;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #F4F7FB;
      display: flex;
      flex-direction: column;
      .trs(0.1s);
    }

    &-close {
      display: none;
      padding: 0 1em;
      cursor: pointer;
      align-self: flex-end;
      @media @lg {
        display: block;
        font-size: 2em;
      }
    }

  }

  &-body {
    width: 75%;
    @media @lg {
      width: 100%;
    }

    &-filters {
      margin: 0 0 1em 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .call-filter {
        display: none;
        @media @lg {
          display: block;
        }
      }
    }

    &-empty {
      display: flex;
      justify-content: center;
      align-self: center;
    }
  }
}

.pagination {
  margin: 1.5em 0 1em;

  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -10px 0 0 -10px;
  }

  &-item {
    font-size: 1em;
    margin: 10px 0 0 10px;
    user-select: none;
  }
}

.visible {
  height: 100%;
  z-index: 5;
  visibility: visible;
  opacity: 1;
  .trs(0.1s);
}

.stock-wrapper {
  margin: 50px 1em;
  .br(10px);
  @media @md {
    margin: 0;
    .br(0);
  }
}

.button-primary-current {
  background: @purple;
  color: #fff;
}
</style>