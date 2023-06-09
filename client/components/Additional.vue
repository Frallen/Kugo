<template>
  <div class="product-deals-wrapper">
    <template v-if="settings.attributes.PackageColor">
      <AdditionalItem :settings="settings.attributes.PackageColor"></AdditionalItem>
    </template>
    <template v-if="settings.attributes.Warranty">
      <AdditionalItem :settings="settings.attributes.Warranty"></AdditionalItem>
    </template>
    <template v-if="settings.attributes.AdditionalService">
      <AdditionalItem :settings="settings.attributes.AdditionalService"></AdditionalItem>
    </template>

  </div>
</template>

<script setup lang="ts">
import {ServicesItemType} from "~/types/catalog.types";

interface propsType {
  settings: ServicesItemType
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


  &-active {
    border: 1.5px solid @purple;
  }
}
</style>