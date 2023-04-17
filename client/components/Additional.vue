<template>
    <div class="product-deals-wrapper">
        <InputRadio v-for="item in settings" :key="item.id" :item="item" @checkedValue="e=>checkedValue=e"></InputRadio>
    </div>
</template>

<script setup lang="ts">
import {Settings} from "~/types/catalog.types";


interface propsType {
    settings: Settings[]
}

let {settings} = defineProps<propsType>()

interface checkboxType {
    Type: string
    Length?: string,
    Price: number
}

const checkedValue = useState<checkboxType>()
watch(checkedValue, () => {
    console.log(checkedValue.value)
})
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


  &-active {
    border: 1.5px solid @purple;
  }
}
</style>