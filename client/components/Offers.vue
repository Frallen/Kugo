<template>
    <div class="catalog">
        <div class="catalog-item">
            <CatalogItem :item="item" v-for="item in offerType" :key="item.id"></CatalogItem>
        </div>

    </div>
</template>

<script setup lang="ts">
import {type CatalogItemType} from "~/types/catalog.types";

interface propsType {
    offerType: CatalogItemType[]
}

let {
    offerType
} = defineProps<propsType>()

</script>

<style scoped lang="less">
.catalog {
  display: flex;
  flex-wrap: wrap;
  margin: -30px 0 0 -30px;
  @media @lg {
    margin: -15px 0 0 -30px;
  }
  @media @xs {
    margin: -15px 0 0 0;
  }

  &-item {
    margin: 30px 0 0 30px;
    width: calc(100% / 4 - 30px);
    @media @lg {
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