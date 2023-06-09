<template>
  <label class="product-deals-item" @click="setServiceData(item)"
         v-for="item in settings" :key="item.id"
         :class="{ 'checked':
         JSON.stringify(selectedRadioButton.value) === JSON.stringify({
                 Name:item.Title,
                   Price:item.Price
             }) }"
  >
    <span class="color" :style="{background:item.Color}" v-if="item.Color"></span>
    <input type="radio" :name="item.Name" :checked="item.Default"
           :value="{
                   Name:item.Title,
                   Price:item.Price
                }"
           v-model="selectedRadioButton.value"
    />
    {{
      item.Title
    }}
    <span v-if="item.Price" class="price">{{ item.Price }} руб.</span>
  </label>
</template>

<script setup lang="ts">
import {AdditionalType, ServicesItemType} from "~/types/catalog.types";

const {setServiceData} = useCatalog()

const selectedRadioButton = reactive({
  value: null
});


interface propsType {
  settings: AdditionalType[],
}


let {settings} = defineProps<propsType>()
console.log(settings)
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
  .trs(0.3s);
  input[type=radio] {
       display: none;
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

.checked {
  .trs(0.3s);
  border: 1px solid @purple;
}
</style>