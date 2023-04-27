<template>
    <vSelect v-model="Option"
             :options="options"></vSelect>
</template>

<script setup lang="ts">
import vSelect from 'vue-select'
import {SelectFilterType} from "~/types/catalog.types";

interface propsType {
    options: SelectFilterType[],
}

const {options} = defineProps<propsType>()

const Option = useState<SelectFilterType>()

const emit = defineEmits<{ (e: "selectValue", Value: SelectFilterType): void }>()

watch(Option, () => {
    emit("selectValue", Option.value)
})
</script>

<style scoped lang="less">


</style>