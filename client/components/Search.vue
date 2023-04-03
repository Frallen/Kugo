<template>
  <div class="search" @click.stop>
    <input
      ref="search"
      type="text"
      class="search-input"
      placeholder="Искать самокат KUGO"
    />
    <div class="search-button" @click.stop="searchAction">
      <Icon name="ph:magnifying-glass" class="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
const search = useState<HTMLInputElement>();
const emit = defineEmits<{ (e: "searchValue", searchValue: string): void }>();
const searchAction = (): void => {
  emit("searchValue", search.value.value);
};
</script>

<style scoped lang="less">
.search {
  border: 1.5px solid @purple;
  .br(5px);
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 600px;
  @media @xl {
    min-width: 400px;
  }
  @media (max-width: 860px) {
    min-width: 300px;
  }
  @media @md {
    border: none;
    background: #f4f7fb;
    padding: 10px;
    min-width: auto;
  }
  &-input {
    margin: 10px;
    background: none;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    border: none;
    width: 98%;
    @media @md {
      margin: 0;
      border: none;
    }
  }
  &-button {
    background: @purple;
    border: 1.5px solid @purple;
    border-radius: 0px 5px 5px 0px;
    cursor: pointer;

    @media @md {
      background: none;
      border: none;
    }
    .icon {
      margin: 12px;
      color: #fff;
      font-size: 1.2em;
      @media @md {
        margin: 0;
        color: @gray;
      }
    }
  }
}
</style>
