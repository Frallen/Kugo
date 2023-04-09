<template>
    <div class="catalog">
        <CatalogItem class="catalog-item" v-for="item in offerType" :item="item" :key="item.id"></CatalogItem>
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

  h3 {

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