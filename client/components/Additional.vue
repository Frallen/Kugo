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



  &-active {
    border: 1.5px solid @purple;
  }
}
</style>