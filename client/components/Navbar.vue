<template>
  <div class="nav">
    <div class="nav-mobile" v-if="isMobile"></div>
    <div class="nav-default" v-else>
      <div class="container">
        <div class="nav-header">
          <div class="nav-header-list">
            <NuxtLink to="/service">Сервис</NuxtLink>
            <NuxtLink to="/service">Сотрудничество</NuxtLink>
            <NuxtLink to="/service"> Заказать звонок</NuxtLink>
            <NuxtLink to="/service">
              <Icon name="basil:viber-solid"
            /></NuxtLink>
            <NuxtLink to="/service"> <Icon name="ri:whatsapp-fill" /></NuxtLink>
            <NuxtLink to="/service"> <Icon name="mdi:telegram" /></NuxtLink>
          </div>
          <div class="nav-header-phone">
            <NuxtLink to="tel:+78005055461">+7 (800) 505-54-61</NuxtLink
            ><Icon name="material-symbols:add-circle-outline" class="icon" />
          </div>
        </div>
      </div>
      <div class="hr"></div>
      <div class="container">
        <div class="nav-body">
          <NuxtLink class="nav-logo" to="/">Kugoo</NuxtLink>
          <div>
            <div class="nav-body-menu" ref="menuButton">
              <Icon name="quill:hamburger" class="icon" />Каталог
              <div v-show="menuButtonHovered" class="menu">

              </div>
            </div>
            <ClientOnly>
              <Search></Search>
            </ClientOnly>
          </div>
          <div class="nav-body-links">
            <NuxtLink to=""
              ><Icon name="carbon:scales" class="icon"
            /></NuxtLink>
            <NuxtLink to=""
              ><Icon name="ph:heart-straight" class="icon"
            /></NuxtLink>
            <NuxtLink to=""
              ><Icon
                name="ri:shopping-basket-2-fill"
                class="icon"
              />Корзина</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isMobile = useMediaQuery("(max-width:767px)");
const menuButton=useState<HTMLDivElement>()
const menuButtonHovered=useElementHover(menuButton)
</script>

<style scoped lang="less">
.nav-default {
  .nav-header {
    padding: 11px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      text-decoration: none;
      font-weight: 400;
      color: @gray;
    }
    .nav-header-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        margin-left: 30px;
      }
      a:first-child {
        margin-left: 0;
      }
    }
    .nav-header-phone {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        color: @black;
      }

      .icon {
        cursor: pointer;
        margin-left: 9px;
        font-size: 16px;
      }
    }
  }
  .hr {
    border: 1px solid #ecf3ff;
  }
  .nav-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 27px 0 34px;
    &-menu {
      cursor: pointer;
      background: @purple;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .br(5px);
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      padding: 8px 18px;
      .icon {
        margin-right: 10px;
      }
    }
    &-links {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        cursor: pointer;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 25px;

      }
      a:last-child{
        .icon {
          margin-right: 10px;
        }
      }
      a:first-child {
        margin-left: 0;
      }
    }
  }
}
.nav-logo {
  font-weight: 700;
  font-size: 1.875em;
  line-height: 43px;
  text-transform: uppercase;
  color: @black;
  text-decoration: none;
  @media @md {
    font-size: 1.125em;
  }
}
</style>
