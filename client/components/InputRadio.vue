<template>
    <label class="product-deals-item" @click="setPrice()"
    >
        <span class="color" :style="{background:item.Color}" v-if="item.Color"></span>
        <input type="radio" :name="name" :checked="item.Default"
               :value="{
                   Name:item.Title,
                   Price:item.Price
                }"
        />
        {{
        item.Title
        }}
        <span v-if="item.Price" class="price">{{ item.Price }} руб.</span>
    </label>
</template>

<script setup lang="ts">
import {AdditionalType,} from "~/types/catalog.types";

const {setServiceData} = useCatalog()

interface propsType {
    item: AdditionalType
    name: string
}


let {item, name} = defineProps<propsType>()

const setPrice = () => {
    setServiceData(item)

}

</script>

<style scoped lang="less">
.product-deals-item {
  margin: 30px 0 0 20px;
  width: calc(90% / 2 - 20px);
  border: 1.5px solid #EAEBED;
  cursor: pointer;
  .br(10px);
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  align-items: center;
  text-align: center;

  input[type=radio] {
    //   display: none;
  }

  .color {
    display: block;
    width: 45px;
    height: 45px;
    .br(100%);
    margin: 0 0 1em 0;
  }

  .price {
    margin: 10px 0 0 0;
    display: block;
    color: @gray;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>