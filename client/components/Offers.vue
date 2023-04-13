<template>
    <div class="offers" ref="el">
        <transition-group name="fade">
            <CatalogItem class="offers-item" v-for="item in offerType.data" :item="item" :key="item.id"></CatalogItem>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import {type CatalogItemType} from "~/types/catalog.types";

interface propsType {
    offerType: CatalogItemType
}

let {
    offerType
} = defineProps<propsType>()
/*
const Slug=offerType[0].attributes.category.data.attributes.Slug
const typeItem = () => {
    switch (true) {
        case Slug==="elektrosamokaty": {
            return "scooter"

        }
        case Slug==="elektrovelosipedy": {
            return "bicycle"

        }
        case Slug==="robot-pylesosy": {
            return "robot"

        }
        case Slug==="vesy": {
            return "scales"

        }
        default:
            return ""
    }
}
const page = useState<number>(() => 1)
const el = ref<HTMLElement>()
const {categories, filteredOffer, loadMore} = useCatalog()
const { x, y, isScrolling, arrivedState, directions } = useScroll(el)
watch(isScrolling,()=>{
    console.log("gg")
    if(arrivedState.bottom){
        loadMore(typeItem(), page.value++)
    }
})
*/
</script>

<style scoped lang="less">
.offers {
  display: flex;
  flex-wrap: wrap;
  margin: -30px 0 0 -30px;
  @media @lg {
    margin: -15px 0 0 -30px;
  }
  @media @xs {
    margin: -15px 0 0 0;
  }

  h3 {

  }

  &-item {
    margin: 30px 0 0 30px;
    width: calc(100% / 4 - 30px);
    @media @xl {
      margin: 15px 0 0 15px;
      width: calc(100% / 3 - 15px);
    }
    @media @md {
      margin: 15px 0 0 15px;
      width: calc(100% / 2 - 15px);
    }
    @media @xs {
      width: 100%;
      margin: 15px 0 0 0;

    }

  }
}
</style>