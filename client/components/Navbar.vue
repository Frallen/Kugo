<template>
  <div class="nav" :class="{'sticky':!useRoute().path.includes('catalog')}">
    <div class="container">
      <transition name="fade">
        <div class="nav-mobile" :class="{'visible':mobileModal}">
          <div class="nav-wrapper">
            <NuxtLink class="nav-logo" to="/">Kugoo</NuxtLink>
            <div class="nav-wrapper-actions">
              <NuxtLink to="tel:+78005055461" class="item"
              >
                <Icon name="material-symbols:call" class="phone icon"
                />
              </NuxtLink>
              <NuxtLink to="/favorites" class="item" v-if="isAuth"
              >
                <Icon name="ph:heart-straight" class="icon"
                />
              </NuxtLink>
              <template v-if="isAuth">
                <NuxtLink to="/profile" class="item"
                >
                  <Icon class="user"
                        name="mdi:account-outline"

                  />
                </NuxtLink>
                <div class="item" @click="logOut"
                >
                  <Icon class="user"
                        name="system-uicons:exit-right"

                  />
                </div>

              </template>
              <div v-else class="item" @click="AuthModalChanger(true)"
              >
                <Icon class="user"
                      name="mdi:account-outline"

                />
              </div>
              <transition name="fade" v-if="mobileModal">
                <Icon
                    name="ic:twotone-close"
                    class="item icon hamburger nav-wrapper-modal"
                    @click="mobileModal = false"
                />
              </transition>
              <transition name="fade" v-else>
                <Icon
                    name="cil:hamburger-menu"
                    class="item icon hamburger nav-wrapper-modal"
                    @click="mobileModal = true"
                />
              </transition>
            </div>
          </div>
          <Search></Search>
          <transition name="fade">
            <div class="nav-modal" v-show="mobileModal">
              <div class="container">
                <div class="nav-modal-body">
                  <NuxtLink class="nav-link" to="/about">О магазине</NuxtLink>
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
                <div class="nav-modal-footer">
                  <div class="footer-item">
                    <NuxtLink to="/service">Сервис</NuxtLink>
                    <NuxtLink to="/service">Сотрудничество</NuxtLink>
                    <NuxtLink to="/service" @click.prevent.stop="ServiceModalChanger(true)"> Заказать звонок</NuxtLink>
                  </div>
                  <div class="footer-item">
                    <NuxtLink to="/service">
                      <Icon name="basil:viber-solid"
                      />
                    </NuxtLink>
                    <NuxtLink to="/service">
                      <Icon name="ri:whatsapp-fill"
                      />
                    </NuxtLink>
                    <NuxtLink to="/service">
                      <Icon name="mdi:telegram"
                      />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
    <div class="nav-default">
      <transition name="fade">
        <div class="container" v-if="!isScrolled">
          <div class="nav-header">
            <div class="nav-header-list">
              <NuxtLink to="/service">Сервис</NuxtLink>
              <NuxtLink to="/service">Сотрудничество</NuxtLink>
              <NuxtLink to="/service" @click.stop.prevent="ServiceModalChanger(true)"> Заказать звонок</NuxtLink>
              <NuxtLink to="/service">
                <Icon name="basil:viber-solid"
                />
              </NuxtLink>
              <NuxtLink to="/service">
                <Icon name="ri:whatsapp-fill"/>
              </NuxtLink>
              <NuxtLink to="/service">
                <Icon name="mdi:telegram"/>
              </NuxtLink>
            </div>
            <div class="nav-header-phone">
              <NuxtLink to="tel:+78005055461">+7 (800) 505-54-61
              </NuxtLink
              >
              <Icon name="material-symbols:add-circle-outline" class="icon"/>
            </div>
          </div>
        </div>
      </transition>
      <div class="hr"></div>
      <div class="container">
        <div class="nav-body">
          <NuxtLink class="nav-logo" to="/">Kugoo</NuxtLink>
          <div class="nav-body-action">
            <div class="nav-body-menu" ref="menuButton">
              <Icon name="quill:hamburger" class="icon"/>
              Каталог
              <transition name="fade">
                <div
                    v-show="menuButtonHovered || menuHovered"
                    ref="menu"
                    class="menu"
                    @click.stop

                >
                  <div class="menu-item">
                    <NuxtLink to="/catalog" class="menu-item-link"
                    >
                      <Icon
                          name="material-symbols:shopping-cart-outline-rounded"
                          class="icon"
                      />
                      Каталог
                    </NuxtLink
                    >
                    <NuxtLink to="/catalog/elektrosamokaty" class="menu-item-link"
                    >
                      <Icon
                          name="material-symbols:electric-scooter-sharp"
                          class="icon"
                      />
                      Электросамокаты
                    </NuxtLink
                    >
                    <NuxtLink to="/catalog/elektrovelosipedy" class="menu-item-link"
                    >
                      <nuxt-img src="mountain-bike.svg" class="icon"></nuxt-img>
                      Электровелосипеды
                    </NuxtLink
                    >
                    <NuxtLink to="/catalog/robot-pylesosy" class="menu-item-link"
                    >
                      <nuxt-img src="vacuum-cleaner.svg" class="icon"></nuxt-img>
                      Робот-пылесосы
                    </NuxtLink
                    >
                    <NuxtLink to="/catalog/vesy" class="menu-item-link"
                    >
                      <nuxt-img src="weighing-scale.svg" class="icon"></nuxt-img>
                      Весы
                    </NuxtLink
                    >
                  </div>
                  <div class="menu-item">
                    <h4>Особенности</h4>
                    <NuxtLink to="" class="menu-item-link">Внедорожный</NuxtLink>
                    <NuxtLink to="" class="menu-item-link">Городской</NuxtLink>
                    <NuxtLink to="" class="menu-item-link">Зимний</NuxtLink>
                    <NuxtLink to="" class="menu-item-link">С сиденьем
                    </NuxtLink
                    >
                    <NuxtLink to="" class="menu-item-link">Без сиденья</NuxtLink>
                  </div>
                  <div class="menu-item">
                    <h4>Для кого</h4>
                    <NuxtLink to="" class="menu-item-link"
                    >Для детей и подростков
                    </NuxtLink
                    >
                    <NuxtLink to="" class="menu-item-link">Для взрослых</NuxtLink>
                    <NuxtLink to="" class="menu-item-link"
                    >Для пенсионеров
                    </NuxtLink
                    >
                  </div>
                </div>
              </transition>
            </div>
            <Search @searchValue="e=>searchedValue=e"></Search>
          </div>
          <div class="nav-body-links">
            <NuxtLink to="" class="item"
            >
              <Icon name="carbon:scales" class="icon"
              />
            </NuxtLink>
            <NuxtLink to="/favorites" class="item" v-if="isAuth"
            >
              <Icon name="ph:heart-straight" class="icon"
              />
            </NuxtLink>
            <NuxtLink to="/cart" class="item"
            >
              <Icon
                  name="ri:shopping-basket-2-fill"
                  class="icon"
              />
            </NuxtLink>
            <template v-if="isAuth">
              <NuxtLink to="/profile" class="item"
              >
                <Icon class="user"
                      name="mdi:account-outline"

                />
              </NuxtLink>
              <div class="item" @click="logOut"
              >
                <Icon class="user"
                      name="system-uicons:exit-right"

                />
              </div>

            </template>
            <div v-else class="item" @click="AuthModalChanger(true)"
            >
              <Icon class="user"
                    name="mdi:account-outline"

              />
            </div>
          </div>
        </div>
      </div>
      <div class="nav-footer">
        <div class="container">
          <div class="nav-footer-list">
            <NuxtLink class="link" to="/about">О магазине</NuxtLink>
            <NuxtLink class="link" to=""
            >Доставка и оплата
              <span class="badge">Доступна рассрочка</span></NuxtLink
            >
            <NuxtLink class="link" to="">Тест-драйв</NuxtLink>
            <NuxtLink class="link" to="">Блог</NuxtLink>
            <NuxtLink class="link" to="">Контакты</NuxtLink>
            <NuxtLink class="link" to=""
            >Акции <span class="badge">%</span></NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {isAuth} = storeToRefs(useUser())
const {logOut} = useUser()
const {AuthModalChanger, ServiceModalChanger} = useMain()
//кнопка каталога
const menuButton = useState<null>();
//вложенное меню навигацию по каталогу
const menu = useState<null>();
//наведен ли курсор на меню
const menuHovered = useElementHover(menu);
//наведен ли курсор на кнопку меню
const menuButtonHovered = useElementHover(menuButton);

const isScrolled = useState<boolean>()
const {x, y} = useWindowScroll()
watch(y, () => {
  if (y.value === 0) {
    isScrolled.value = false
  } else if (y.value > 300) {
    isScrolled.value = true
  }
})
const mobileModal = useState<boolean>(() => false);
watch(mobileModal, () => {
  if (mobileModal.value) {
    overFlow(true)
  } else {
    overFlow(false)
  }
})
const searchedValue = ref<string>()

const {LiveSearch} = useCatalog()

watch(searchedValue, async () => {
  await LiveSearch(searchedValue.value)


})
</script>

<style scoped lang="less">
.nav {
  z-index: 99;
  background: #fff;
  box-shadow: 0 -2px 8px 0 #000;
  user-select: none;

  &-mobile {
    padding: 0 0 1em 0;
    .trs(0.2s);
  }

  &-mobile {
    display: none;
    .trs(0.2s);
    @media @md {
      display: block;
    }

    .nav-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 0 10px;

      &-actions {
        display: flex;
        align-items: center;

        .item {
          text-decoration: none;
          color: @purple;
          margin: 0 0 0 10px;
          outline: none;
          cursor: pointer;
          @media @sm {
            margin: 0 0 0 1em
          }
        }

        .item:first-child {
          margin: 0;
        }

        .user {
          font-size: 1.5em;
        }

        .hamburger {
          font-size: 1.5em;
        }

        .phone {
          font-size: 1.2em;
        }
      }

      &-modal {
        margin: 0 0 0 15px;
      }
    }

    .nav-modal {
      background: #fff;
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 100%;
      height: 100%;

      .nav-modal-body {
        display: flex;
        flex-direction: column;
        margin: 0 0 30px;

        .nav-link {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: @black;
          padding: 15px 0;
          border-bottom: 1px solid @gray;

          .badge {
            display: block;
            width: fit-content;
            margin: 10px auto auto;
            padding: 5px 8px;
            .br(300px);
            background: @purple;
            color: #fff;
          }
        }
      }

      .nav-modal-footer {
        .footer-item:first-child {
          margin: 0 0 20px;
        }

        a {
          margin: 0 10px 0 0;
          text-decoration: none;
          color: @gray;
          font-weight: 400;
          font-size: 12px;
          line-height: 17px;

          .icon {
            font-size: 2em;
          }
        }
      }
    }
  }

  &-default {
    @media @md {
      display: none;
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
      padding: 15px 0 20px;

      &-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 10px;
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
          z-index: 4;
          display: flex;
          .br(5px);
          background: #ffffff;
          min-width: 650px;
          padding: 20px 40px 20px 10px;
          box-shadow: 0px 10px 30px rgba(111, 115, 238, 0.1);
          @media @lg {
            min-width: 550px;
            padding: 20px 40px 20px 10px;
          }

          &-item {
            margin: 0 0 0 40px;
            @media @lg {
              margin: 0 0 0 30px;
            }

            &-link {
              color: @gray;
              display: flex;
              align-items: center;
              margin: 15px 0 0 0;
              .trs(0.3s);
              text-decoration: none;

              .icon {
                margin-right: 10px;
                color: @gray;
              }
            }

            &-link:hover {
              color: @purple !important;
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

        .item {
          cursor: pointer;
          text-decoration: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 0 25px;
          color: @black;
          @media @lg {
            margin: 0 0 0 14px;
          }
        }


        .item:first-child {
          margin-left: 0;
        }
      }
    }

    .nav-footer {
      background: #f4f7fb;
      padding: 10px 0;

      .nav-footer-list {
        display: flex;
        align-items: center;

        .link {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: @black;
          margin: 0 0 0 40px;
          cursor: pointer;
          text-decoration: none;
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

        .link:first-child {
          margin: 0;
        }
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

.sticky {
  position: sticky;
  top: 0;
}

.visible {
  position: fixed;
  left: 0;
  top: 0;
  padding: 0 1em;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 99;
  .trs(0.2s);
}
</style>
