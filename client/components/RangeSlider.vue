<template>
    <div class="range-wrapper">
        <Slider v-model="minMax"
                :options="{
           start: [min, max],
            range: {
                min: [min],
                max: [max]
            },
                connect: true,
                 margin: 40
    }" @change="submitEvent"
        />
    </div>
</template>

<script setup lang="ts">
import Slider from '@vueform/slider'

interface propsType {
    min: number,
    max: number

}


let minMax = useState(() => [min, max])
let {min, max} = defineProps<propsType>()

let emit = defineEmits<{ (e: "submitEvent", data: [number, number]): void }>()

let submitEvent = (arr: [number, number]) => {

    emit("submitEvent", [arr[0], arr[1]])
}


/*
onMounted(()=>{
    noUiSlider.create(range.value, {
        start: [min, max],
        range: {
            min: [min],
            max: [max]
        },
        connect: true, margin: 10
    })
    range.value.noUiSlider.on("change", (value) => {

        emit("minMax", [parseInt(value[0]), parseInt(value[1])])
    })





    range.value.noUiSlider.set([set[0],set[1]])
})
*/

</script>
<style lang="less" src="@vueform/slider/themes/default.css">
:root {

  --slider-connect-bg: #6F73EE !important;
  --slider-tooltip-bg: #6F73EE !important;

  .slider-touch-area {
    background: #FFFFFF;
    border: 4px solid @purple;
    border-radius: 10px;
  }
}

</style>
<style scoped lang="less">
.range-wrapper {
  margin: 40px 0 0 0;
}

.range {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 0 0;

  .input {
    border: 1px solid #EAEBED;
    padding: 8px 9px;
    text-align: center;
  }

  .input:first-child {
    width: 46%;
  }

  .input:last-child {
    width: 46%;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Works for Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}


</style>