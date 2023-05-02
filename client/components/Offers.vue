<template>
    <div class="offers" :class="{'offers-catalog':specialView}">
        <transition-group name="fade">
            <CatalogItem class="offers-item" :class="{'offers-catalog-item':isCatalog}" v-for="item in offerType.data"
                         :item="item" :key="item.id"></CatalogItem>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import {type CatalogItemType} from "~/types/catalog.types";

interface propsType {
    offerType: CatalogItemType,
    isCatalog?: boolean,
}

let {
    offerType, isCatalog
} = defineProps<propsType>()

const specialView = useState<boolean>(() => isCatalog ?? false)

</script>

<style scoped lang="less">
.offers {
  display: flex;
  flex-wrap: wrap;
  margin: -30px 0 0 -30px;
  @media @xl {
    margin: -15px 0 0 -30px;
  }
  @media @md {
    margin: -15px 0 0 -20px;
  }
  @media @xs {
    margin: -15px 0 0 0;
  }

  &-item {
    margin: 30px 0 0 30px;
    width: calc(100% / 4 - 30px);
    height: 492px;
    @media @xl {
      margin: 15px 0 0 30px;
      width: calc(100% / 3 - 30px);
    }
    @media @md {
      margin: 15px 0 0 20px;
      width: calc(100% / 2 - 20px);
    }
    @media @xs {
      width: 100%;
      margin: 15px 0 0 0;

    }

  }
}

.offers-catalog {
  margin: -30px 0 0 -15px;
  @media @lg {
    margin: -15px 0 0 -30px;
  }
    @media @md {
        margin: -15px 0 0 -15px;
    }
  @media @xs {
    margin: -15px 0 0 0;
  }

  &-item {
    margin: 30px 0 0 15px;
    width: calc(100% / 4 - 15px);
    @media @xxl {
      margin: 15px 0 0 15px;
      width: calc(100% / 3 - 15px);
    }
    @media @lg {
      margin: 15px 0 0 30px;
      width: calc(100% / 3 - 30px);
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