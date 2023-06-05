<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs-list" v-show="useRoute().name!=='index'">
      <div class="breadcrumbs-list-item" v-for="item in useBreadcrumbs().breadcrumbs.value">
        <NuxtLink :to="item.path">
          <Icon
              name="ic:outline-home"
              class="icon"
              v-show="item.name==='Главная'"
          />
          {{
            item.name
          }}
        </NuxtLink>
        <span>/</span>
      </div>
    </div>
    <h3 class="breadcrumbs-title" v-show="useBreadcrumbs().Title.value">{{ useBreadcrumbs().Title.value }}</h3>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.breadcrumbs {
  &-list {
    display: flex;
    align-items: center;

    &-item {
      display: flex;
      align-items: center;

      a {
        font-weight: 400;
        font-size: 15px;
        line-height: 17px;
        color: @gray;
        text-decoration: none;
        display: flex;
        align-items: center;
        position: relative;
      }

      span {
        color: @gray;
        margin: 0 20px;
      }

      .icon {
        margin: 0 5px 0 0;
      }
    }

    &-item:first-child {
      margin: 0;
    }

    &-item:last-child {

      a {
        color: @black;
      }

      span {
        display: none;
      }
    }

  }

  &-title {
    font-weight: 600;
    font-size: 35px;
    line-height: 51px;
    text-transform: uppercase;
    color: @black;
    margin: 49px 0 0;
    @media @md {

    }

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: @gray;
      display: block;
      margin: 10px 0 0 0;
    }
  }
}
</style>