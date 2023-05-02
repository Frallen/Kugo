<template>
    <StockBlock></StockBlock>
    <div class="container-catalog">
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
                    <div class="catalog-body-selects">
                        <Select :options="SortOptions" :placeholder="'Фильтр'" @selectValue="e=>Sort=e"></Select>
                    </div>
                </div>
                <template v-if="Deals.data">
                    <Offers :offerType="Deals" :isCatalog="true"></Offers>
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
                                 :class="{'button-primary-current':item===currentPage}"
                                 v-for="item in Deals.meta.pagination.pageCount"
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

const {getDeals} = useCatalog()
const {params, path, query} = useRoute()
const router = useRouter();
const {Deals, SortOptions} = storeToRefs(useCatalog())
definePageMeta({
    middleware: "catalog"
})
const Filters = ref<responseFilterType>()
const Sort = ref<string>()
Sort.value = query.sort as string
Filters.value = {
    type_product: query.type_product as [string],
    user_type: query.user_type as [string],
    weight: query.weight as string,
}

// блок с фильтрами
watch(Filters, async () => {
    await router.replace({
        path: path,
        query: {
            page: currentPage.value,
            ...(Filters.value && Filters.value),
            sort: Sort.value,
        }
    });
    await getDeals(sluggedCatalog(), currentPage.value.toString(), Filters.value, Sort.value && Sort.value)
})

// блок с фильтрами
watch(Sort, async () => {
    await router.replace({
        path: path,
        query: {
            page: currentPage.value,
            ...(Filters.value && Filters.value),
            sort: Sort.value,
        }
    });
    //add filters
    await getDeals(sluggedCatalog(), "1", Filters.value && Filters.value, Sort.value && Sort.value)
})
//await getDeals(sluggedCatalog(), "1",Filters.value && Filters.value,Sort.value && Sort.value);
// показ мобильной версии фильтра
const filterStatus = useState<boolean>(() => false)
// начальная страница пагинации
const currentPage = useState<number>(() => 1)
// проверка url на наличие страницы
if (query.page) currentPage.value = parseInt(query.page)
const prepare = async (): Promise<void> => {

    await router.replace({
        path: path,
        query: {
            page: currentPage.value,
            ...(Filters.value && Filters.value),
            sort: Sort.value,
        }
    });


    if (sluggedCatalog() && currentPage.value) {
        await getDeals(sluggedCatalog(), currentPage.value.toString(), Filters.value && Filters.value, Sort.value && Sort.value);

    }
}
// немедленный запуск вотчера для получения данных
watch(currentPage, () => {
    prepare()

}, {immediate: true})


</script>

<style scoped lang="less">
.container-catalog {
  padding: 0 6vw;
  @media @xxl {
    padding: 0 4vw;
  }

  @media @lg {
    padding: 0 1.3em;
  }
  @media @md {
    padding: 0 1em;
  }
  @media @sm {
    padding: 0 0.5em;
  }
}

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
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 2em 0;
      @media @lg {

      }

      .call-filter {
        display: none;
        @media @lg {
          display: block;
        }
      }
    }

    &-selects {
      margin: 0 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
    margin: 50px 0;
    .br(0);
  }
}

.button-primary-current {
  background: @purple;
  color: #fff;
}
</style>