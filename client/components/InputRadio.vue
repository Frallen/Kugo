<template>
    <label class="product-deals-item" :class="{'product-deals-active':isChecked}">
        <input type="radio" :name="item.attributes.Title"
               v-model="checkbox"
               :value="{Type:item.attributes.Type,
                   Length:item.attributes.Length,
                   Price:item.attributes.Price}"
        >
        {{
        item.attributes.Type
        }}
        <span v-if="item.attributes.Price">{{ item.attributes.Price }} руб.</span>
    </label>
</template>

<script setup lang="ts">
import {Settings} from "~/types/catalog.types";


interface propsType {
    item: Settings
}

interface checkboxType {
    Type: string
    Length?: string,
    Price: number
}

let {item} = defineProps<propsType>()
const isChecked = useState<boolean>(() => item.attributes.Default);


const checkbox = useState<checkboxType>()
const emit = defineEmits<{ (e: "checkedValue", checkedValue: checkboxType): void }>()

watch(checkbox, () => {
    emit("checkedValue", checkbox.value)
})

</script>

<style scoped lang="less">
.product-deals-item {
  margin: 30px 0 0 20px;
  text-align: center;
  border: 1.5px solid #EAEBED;
  cursor: pointer;
  .br(10px);
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  input[type=radio] {
    display: none;
  }

  span {
    margin: 10px 0 0 0;
    display: block;
    color: @gray;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>