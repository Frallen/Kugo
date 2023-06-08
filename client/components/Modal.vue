<template>
  <div class="modal" v-if="isShow" >
    <div class="modal-body">
      <div class="modal-body-head">
        <Icon
            name="mdi:close"
            class="icon"
            @click.stop="emit('closeModal',false)"
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

interface propsType {
  isShow: boolean
}

const {isShow} = defineProps<propsType>()

const emit = defineEmits<{ (e: "closeModal", closeModal: boolean): void }>()

</script>

<style scoped lang="less">
.modal {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: #000000d4;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;


  &-body {
    background: #fff;
    .br(10px);
    position: relative;
    padding: 4em 1em 2em;
    min-width: 420px;
    @media @sm {
      min-width: 320px;
      padding: 2em 10px 1.5em;
    }

    &-head {
      position: absolute;
      right: 2%;
      top: 2%;

      .icon {
        font-size: 3em;
        cursor: pointer;
        @media @sm {
          font-size: 2em;
        }
      }
    }
  }
}
</style>