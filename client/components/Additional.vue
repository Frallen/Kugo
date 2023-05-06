<template>
    <div class="product-deals-wrapper">
        <template v-if="settings.attributes.PackageColor">
            <label v-for="item in settings.attributes.PackageColor" :key="item.id" class="product-deals-item"
                   :class="{'product-deals-active':item.Default}">
                <span class="color" :style="{background:item.Color}" v-if="item.Color"></span>
                <Field type="radio" name="Color" :checked="item.Default" @change="onChange"

                       :value="{
                   Name:item.Title,
                   Price:item.Price}"
                />
                {{
                item.Title
                }}
                <span v-if="item.Price" class="price">{{ item.Price }} руб.</span>
            </label>
        </template>
        <template v-if="settings.attributes.Warranty">
            <label v-for="item in settings.attributes.Warranty" :key="item.id" class="product-deals-item"
                   :class="{'product-deals-active':item.Default}">
                <Field type="radio" name="Warranty" :checked="item.Default" @change="onChange"
                       :value="{
                   Name:item.Title,
                   Price:item.Price}"
                />
                {{
                item.Title
                }}
                <span v-if="item.Price" class="price">{{ item.Price }} руб.</span>
            </label>
        </template>
        <template v-if="settings.attributes.AdditionalService">
            <label v-for="item in settings.attributes.AdditionalService" :key="item.id" class="product-deals-item"
                   :class="{'product-deals-active':item.Default}">
                <Field type="radio" name="Service" :checked="item.Default" @change="onChange"
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

const onChange = (value) => {

}
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