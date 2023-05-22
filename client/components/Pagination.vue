<template>
  <div class="pagination">
    <div class="pagination-wrapper">
      <div class="pagination-item pagination-item-first button button-outlined"
           v-show="currentPage>1"
           @click="currentPage--">
        <Icon
            name="ic:outline-keyboard-arrow-left"
        />
      </div>
      <div class="pagination-item button button-outlined"
           :class="{'button-primary-current':item===currentPage}"
           v-for="item in pageCount"
           :key="item"
           @click="currentPage=item">
        {{ item }}
      </div>
      <div class="pagination-item pagination-item-first button button-outlined"
           v-show="currentPage<pageCount" @click="currentPage++">
        <Icon
            name="ic:outline-keyboard-arrow-right"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// начальная страница пагинации
const currentPage = useState<number>(() => 1)

interface propsType {
  pageCount: number
}

const {pageCount} = defineProps<propsType>()

const emit = defineEmits<{ (e: "currentPage", currentPage: number): void }>()

watch(currentPage, () => {
  emit("currentPage", currentPage.value)
})
emit("currentPage", currentPage.value)
</script>

<style scoped lang="less">
.pagination {
  margin: 1.5em 0 1em;

  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -10px 0 0 -10px;
  }

  &-item {
    font-size: 1em;
    margin: 10px 0 0 10px;
    user-select: none;
  }
}

.button-primary-current {
  background: @purple;
  color: #fff;
}
</style>