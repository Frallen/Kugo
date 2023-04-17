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
const emit=defineEmits<{(e:"checkedValue",checkedValue:checkboxType):void}>()

watch(checkbox,()=> {
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
  padding: 40px;

  input[type=radio] {
    display: none;
  }
}
</style>