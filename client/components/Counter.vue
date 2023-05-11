<template>
    <div class="counter">
        <div class="counter-minus counter-button" @click.prevent="count>1&&count--">
            <Icon
                    name="ic:sharp-minus"
                    class="icon"
            />
        </div>
        <Field name="count" type="number" v-model="count"/>
        <div class="counter-plus counter-button" @click.prevent="count++">
            <Icon
                    name="ic:sharp-plus"
                    class="icon"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {Field} from "vee-validate"

const count = useState<number>(() => 1)
const emit = defineEmits<{ (e: "count", Count: number): void }>()
watch(count, () => {
    emit("count", count.value)
})
</script>

<style scoped lang="less">
.counter {
  background: #F4F7FB;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 15px 17px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    background: none;
    border: none;
    outline: none;
    width: 46px;
    text-align: center;
    padding: 0 2px;
  }

  &-button {
    cursor: pointer;
    font-size: 1.4em;
    color: @gray;
    user-select: none;
  }
}
</style>