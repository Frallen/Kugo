<template>
    <div class="product-deals-wrapper">
        <template v-if="settings.attributes.PackageColor">
            <InputRadio v-for="item in settings.attributes.PackageColor" :item="item" :name="'PackageColor'" :key="item.id"></InputRadio>
        </template>
        <template v-if="settings.attributes.Warranty">
            <InputRadio v-for="item in settings.attributes.Warranty" :item="item" :name="'Warranty'" :key="item.id"></InputRadio>
        </template>
        <template v-if="settings.attributes.AdditionalService">
            <InputRadio v-for="item in settings.attributes.AdditionalService" :item="item" :name="'Service'" :key="item.id"></InputRadio>
        </template>

    </div>
</template>

<script setup lang="ts">
import {Field} from "vee-validate"
import {ServicesItemType} from "~/types/catalog.types";

interface propsType {
    settings: ServicesItemType
}

let {settings} = defineProps<propsType>()

const emit = defineEmits<{ (e: "addPrice", value: number): void }>()


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
    padding: 20px 40px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    user-select: none;
    align-items: center;

    input[type=radio] {
      //  display: none;
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

  &-active {
    border: 1.5px solid @purple;
  }
}
</style>