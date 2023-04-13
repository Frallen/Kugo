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
                <Offers ref="el" :offerType="filteredOffer(params.slug as string)"></Offers>

                <div class="pagination">
                    <div class="pagination-wrapper">
                        <div class="pagination-item pagination-item-first button button-outlined" v-show="meta.page>=2"
                             @click="changePage(meta.page--)">
                            <Icon
                                    name="ic:outline-keyboard-arrow-left"
                            />
                        </div>
                        <div class="pagination-item button button-outlined"
                             :class="{'button-primary-current':item===meta.page}" v-for="item in meta.pageCount"
                             :key="item"
                             @click="changePage(item)">
                            {{ item }}
                        </div>
                        <div class="pagination-item pagination-item-first button button-outlined"
                             v-show="meta.page<meta.pageCount" @click="changePage(meta.page++)">
                            <Icon
                                    name="ic:outline-keyboard-arrow-right"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {overFlow} from "~/composables/mixins";

const {categories, filteredOffer, loadMore} = useCatalog()
const {params} = useRoute()

definePageMeta({
    middleware: "catalog"
})
const filterStatus = useState<boolean>(() => false)
/* page, pageSize, pageCount, total*/
const meta = computed(() => {
    return filteredOffer(params.slug as string).meta.pagination
})
const typeItem = () => {
    switch (true) {
        case useRoute().params.slug === "elektrosamokaty": {
            return "scooter"

        }
        case useRoute().params.slug === "elektrovelosipedy": {
            return "bicycle"

        }
        case useRoute().params.slug === "robot-pylesosy": {
            return "robot"

        }
        case useRoute().params.slug === "vesy": {
            return "scales"

        }
    }
}
const changePage = (clickedPage: number) => {
    console.log(typeItem(), clickedPage)
    if (typeItem() && clickedPage !== meta.value.page) {
        loadMore(typeItem(), clickedPage)
    }

}
/*

const page = useState<number>(() => 1)
const el = ref<HTMLElement>()

const { x, y, isScrolling, arrivedState, directions } = useScroll(el)
watch(isScrolling,()=>{
    console.log("gg")
    if(arrivedState.bottom){

    }
})*/
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