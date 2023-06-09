<template>
  <div class="answers-list-item">
    <div class="answer-head"><h4>{{ item.attributes.Question }}</h4>
      <div class="plus" :class="{'plus-rotate':isShow}" @click="isShow?isShow=false:isShow=true">+</div>
    </div>
    <div class="answer-body" :class="{'visible':isShow}">{{ item.attributes.Answer }}</div>
  </div>
</template>

<script setup lang="ts">
import {answerItemType} from "~/types/global.types";

const isShow = ref<boolean>(false)

interface propsType {
  item: answerItemType
}

const {item} = defineProps<propsType>()

</script>

<style scoped lang="less">
.answers-list-item {
  padding: 0 0 16px;
  border-bottom: 1px solid #EAEBED;

  margin: 28px 0 0;

  .answer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .answer-body {
    margin: 0;
    color: @gray;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: block;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height ease-in-out .3s, opacity ease-in-out .3s;
  }

  .visible {
    max-height: 500px;
    overflow: visible;
    opacity: 1;
    transition: max-height ease-in-out .3s, opacity ease-in-out .3s;
  }

  .plus {
    cursor: pointer;
    font-size: 2em;
    .trs(0.1s);
    user-select: none;
  }

  .plus-rotate {
    transform: rotate(45deg);
    .trs(0.1s);
  }


  h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: @black;
  }
}

@keyframes show {
  from {
    max-height: 0;
  }
  to {
    max-height: max-content;
  }

}
</style>