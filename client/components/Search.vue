<template>
  <transition name="fade">
    <div class="shadow" v-show="SearchedItems" @click="SearchedItems=null"></div>
  </transition>
  <transition name="fade">
    <div class="search" :class="{'visible':SearchedItems}">
      <input
          v-model.trim="search"
          type="text"
          class="search-input"
          placeholder="Искать самокат KUGO"
      />
      <template v-if="SearchedItems">
        <div v-if="SearchedItems?.length>0" class="search-list" :class="{'visible':SearchedItems}">
          <transition-group name="fade">
            <div @click.stop="useRouter().push(`/catalog/${item.category.Slug}/${item.id}`);SearchedItems=null"
                 class="search-list-item" v-for="item in SearchedItems" :key="item.id">
              <div class="info">
                <div class="info-image">
                  <NuxtImg :src="item.images[0].url"></NuxtImg>
                </div>
                <h5>{{ item.Title }}</h5>
              </div>
              <div class="selling">

                <h5>{{ item.Price }} ₽</h5>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="search-list" v-else :class="{'empty':SearchedItems}">
          <p>Ничего не найдено по вашему запросу</p>
        </div>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">

const search = useState<string>();
const {SearchedItems} = storeToRefs(useCatalog())
const emit = defineEmits<{ (e: "searchValue", searchValue: string): void }>();

watch(search, () => {
  emit("searchValue", search.value);
})

watch(SearchedItems, () => {
  if (SearchedItems.value) {
    overFlow(true)
  } else {
    overFlow(false)
  }
})
onUnmounted(() => {
  overFlow(false)
})
</script>

<style scoped lang="less">
.shadow {
  background: #000000d4;
  z-index: 98;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  .trs(0.3s);
}

.search {
  border: 1.5px solid @purple;
  .br(5px);
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 600px;
  position: relative;
  background: #fff;
  .trs(0.3s);
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
    background: transparent;
    margin: 10px;
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

  &-list {
    position: absolute;
    bottom: -1250%;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 500px;
    overflow: auto;
    .br(10px);
    background: #fff;
    .trs(0.3s);
    padding: 5px 10px;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      margin: 15px 0 0;
      padding: 0 0 10px 0;
      border-bottom: 1px solid @gray-light;

      .info {
        display: flex;
        align-items: center;

        &-image {
          width: 50px;
          height: 50px;
          min-width: 50px;
          .br(5px);
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        h5 {
          margin: 0 0 0 15px;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: @black;
          word-break: break-word;
        }
      }

      .selling {
        font-size: 1.1em;
      }
    }

    &-item:first-child {
      margin: 0;
    }
    &-item:last-child{
      border-bottom: none;
    }
  }

  .empty {
    z-index: 100;
    .trs(0.3s);
    bottom: -152%;

    p {
      text-align: center;
      font-size: 15px;
      color: @gray;
    }
  }

  &-list::-webkit-scrollbar {
    width: 5px;
  }

  &-list::-webkit-scrollbar-track {
  }

  &-list::-webkit-scrollbar-thumb {
    background: @purple;
    .br(10px);
  }

  /*
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
    }*/
}

.visible {
  z-index: 100;
  .trs(0.3s);

}
</style>
