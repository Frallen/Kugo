<template>
    <StockBlock></StockBlock>
    <div class="container" ref="el">
        <div class="catalog">
            <div class="catalog-filter" :class="{'visible':filterStatus}">
                <div class="catalog-filter-close">
                    <Icon
                            name="ic:twotone-close"
                            class="icon nav-wrapper-modal"
                            @click="filterStatus = false , overFlow(false)"
                    />
                </div>
                <Filter></Filter>
            </div>
            <div class="catalog-body">
                <div class="catalog-body-filters">
                    <button class="button button-outlined call-filter" @click="filterStatus=true , overFlow(true)">
                        Фильтры
                    </button>
                    <div></div>
                </div>
                <template v-if="filteredOffers(typeItem())">
                    <Offers ref="el" :offerType="filteredOffers(typeItem())"></Offers>
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
                                 :class="{'button-primary-current':item===currentPage}" v-for="item in meta.pageCount"
                                 :key="item"
                                 @click="currentPage=item">
                                {{ item }}
                            </div>
                            <div class="pagination-item pagination-item-first button button-outlined"
                                 v-show="currentPage<meta.pageCount" @click="currentPage++">
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

const {categories, filteredOffers, loadMore} = useCatalog()
const {params, path, query} = useRoute()

definePageMeta({
    middleware: "catalog"
})
const filterStatus = useState<boolean>(() => false)
/* page, pageSize, pageCount, total*/
const meta = computed(() => {
    return filteredOffers(typeItem()).meta.pagination
})


const currentPage = useState<string>(() => query.page??1)

watch(currentPage, () => {
    prepare()

})
const prepare = async (): Promise<void> => {
    await navigateTo({
        path: path,
        query: {
            page: currentPage.value,

        }
    }, {
        replace: true
    })

    if (typeItem() && currentPage.value) {
        loadMore(typeItem(), currentPage.value)

    }
}

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
    width: 70%;
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
  margin: 1em 0;

  &-wrapper {
    display: flex;
    flex-wrap: wrap;
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