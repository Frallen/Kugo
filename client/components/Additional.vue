<template>
    <div class="product-deals-wrapper">
        <label class="product-deals-item" :class="{'product-deals-active':item.attributes.Default}"
               v-for="item in settings">
            <input type="radio" name="packetColor" :checked="item.attributes.Default">{{ item.attributes.Type }}</label>
    </div>
</template>

<script setup lang="ts">
import {Settings} from "~/types/catalog.types";

//const isChecked = useState<boolean>(() => false)

interface propsType {
    settings: Settings[]
}

let {settings} = defineProps<propsType>()
</script>

<style scoped lang="less">
.product-deals {

  &-wrapper {
    margin: -30px 0 0 -20px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 40px 0;
    border-bottom: 1px solid @gray;
  }

  &-item {
    margin: 30px 0 0 20px;
    text-align: center;
    border: 1.5px solid #EAEBED;
    cursor: pointer;
    .br(10px);
    padding: 40px;

    input[type=radio] {
      display: none;
    }
  }

  &-active {
    border: 1.5px solid @purple;
  }
}
</style>