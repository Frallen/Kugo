<template>
  <vSelect class="select" v-model="Option" :placeholder="placeholder" :searchable="false"
           :options="options"></vSelect>
</template>

<script setup lang="ts">
import vSelect from 'vue-select'
import {SelectFilterType} from "~/types/catalog.types";

interface propsType {
  options: SelectFilterType[],
  placeholder: string
}

const {options, placeholder} = defineProps<propsType>()

const Option = useState<SelectFilterType>()

const emit = defineEmits<{ (e: "selectValue", Value: SelectFilterType | null): void }>()

watch(Option, () => {
  let value = Option.value ? Option.value.sort : null
  emit("selectValue", value)
})
</script>

<style scoped lang="less">


</style>