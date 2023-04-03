<template>
  <div class="nav">
    <div class="nav-mobile" v-if="isMobile">
      <div class="container">
        <div class="nav-wrapper">
          <NuxtLink class="nav-logo" to="/">Kugoo</NuxtLink>
          <div class="nav-actions">
            <NuxtLink to="tel:+78005055461"
              ><Icon name="material-symbols:call" class="icon"
            /></NuxtLink>
            <Icon name="cil:hamburger-menu" class="icon nav-modal" />
          </div>
        </div>
      </div>
    </div>
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
          <div class="nav-body-action">
            <div class="nav-body-menu" ref="menuButton">
              <Icon name="quill:hamburger" class="icon" />Каталог
              <div
                v-show="menuButtonHovered || menuHovered"
                ref="menu"
                class="menu"
                @click.stop
                v-motion="{
                  initial: {
                    opacity: 0,
                    transition: {
                      type: 'spring',
                      stiffness: '100',
                      delay: 100,
                    },
                  },
                  visible: {
                    opacity: 1,
                    transition: {
                      type: 'spring',
                      stiffness: '100',
                      delay: 100,
                    },
                  },
                  leave: {
                    opacity: 0,
                    transition: {
                      type: 'spring',
                      stiffness: '100',
                      delay: 200,
                    },
                  },
                }"
              >
                <div class="menu-item">
                  <NuxtLink to="" class="menu-item-link"
                    ><Icon
                      name="material-symbols:electric-scooter-sharp"
                      class="icon"
                    />Электросамокаты</NuxtLink
                  ><NuxtLink to="" class="menu-item-link"
                    ><nuxt-img src="scooter.svg" class="icon"></nuxt-img>
                    Электроскутеры</NuxtLink
                  ><NuxtLink to="" class="menu-item-link"
                    ><nuxt-img src="mountain-bike.svg" class="icon"></nuxt-img>
                    Электровелосипеды</NuxtLink
                  ><NuxtLink to="" class="menu-item-link"
                    ><nuxt-img src="vacuum-cleaner.svg" class="icon"></nuxt-img>
                    Робот-пылесосы</NuxtLink
                  ><NuxtLink to="" class="menu-item-link"
                    ><nuxt-img src="weighing-scale.svg" class="icon"></nuxt-img>
                    Весы</NuxtLink
                  >
                </div>
                <div class="menu-item">
                  <h4>Особенности</h4>
                  <NuxtLink to="" class="menu-item-link">Внедорожный</NuxtLink>
                  <NuxtLink to="" class="menu-item-link">Городской</NuxtLink>
                  <NuxtLink to="" class="menu-item-link">Зимний</NuxtLink>
                  <NuxtLink to="" class="menu-item-link">С сиденьем</NuxtLink
                  ><NuxtLink to="" class="menu-item-link">Без сиденья</NuxtLink>
                </div>
                <div class="menu-item">
                  <h4>Для кого</h4>
                  <NuxtLink to="" class="menu-item-link"
                    >Для детей и подростков</NuxtLink
                  >
                  <NuxtLink to="" class="menu-item-link">Для взрослых</NuxtLink>
                  <NuxtLink to="" class="menu-item-link"
                    >Для пенсионеров</NuxtLink
                  >
                </div>
              </div>
            </div>
            <Search></Search>
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
      <div class="nav-footer">
        <div class="container">
          <div class="nav">
            <NuxtLink class="nav-link" to="">О магазине</NuxtLink>
            <NuxtLink class="nav-link" to=""
              >Доставка и оплата
              <span class="badge">Доступна рассрочка</span></NuxtLink
            >
            <NuxtLink class="nav-link" to="">Тест-драйв</NuxtLink>
            <NuxtLink class="nav-link" to="">Блог</NuxtLink>
            <NuxtLink class="nav-link" to="">Контакты</NuxtLink>
            <NuxtLink class="nav-link" to=""
              >Акции <span class="badge">%</span></NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isMobile = useMediaQuery("(max-width:767px)");
const menuButton = useState<null>();
const menu = useState<null>();
const menuHovered = useElementHover(menu);
const menuButtonHovered = useElementHover(menuButton);
</script>

<style scoped lang="less">
.nav-default,
.nav-mobile {
  position: sticky;
  top: 0;
}
.nav-default {
  .nav-mobile {
    .nav-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-actions {
        a,
        icon {
          text-decoration: none;
          color: @purple;
          font-size: 1em;
          outline: none;
          cursor: pointer;
        }
      }
      &-modal {
      }
    }
  }
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
    &-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-menu {
      margin: 0 20px 0 0;
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
      position: relative;
      .menu {
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 2;
        display: flex;
        .br(5px);
        background: #ffffff;
        padding: 10px 40px 10px 10px;
        box-shadow: 0px 10px 30px rgba(111, 115, 238, 0.1);
        &-item {
          margin: 0 0 0 40px;
          &-link {
            color: @gray;
            display: flex;
            align-items: center;
            margin: 15px 0 0 0;
            .trs(0.3s);
            .icon {
              margin-right: 10px;
              color: @gray;
            }
          }
          &-link:hover {
            color: @purple!important;
            .trs(0.3s);
          }
          h4 {
            font-weight: 500;
            font-size: 16px;
            line-height: 23px;
            color: @black;
            margin: 0;
            padding: 0;
          }
        }
        &-item:first-child {
          padding: 20px 24px;
          background: #f4f7fb;
          margin: 0;
          .br(5px);
          a {
            margin: 15px 0 0 0;
            font-weight: 500;
            font-size: 16px;
            line-height: 23px;
            color: @black;
          }
          a:first-child {
            margin: 0;
          }
        }
      }
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
      a:last-child {
        .icon {
          margin-right: 10px;
        }
      }
      a:first-child {
        margin-left: 0;
      }
    }
  }
  .nav-footer {
    background: #f4f7fb;
    padding: 10px 0;
    .nav {
      display: flex;
      align-items: center;
      &-link {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: @black;
        margin: 0 0 0 40px;
        cursor: pointer;
        @media @lg {
          margin: 0 0 0 20px;
        }
        .badge {
          padding: 5px 8px;
          .br(300px);
          background: @purple;
          color: #fff;
          margin: 0 0 0 8px;
        }
      }
      &-link:first-child {
        margin: 0;
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
