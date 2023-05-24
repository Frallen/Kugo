<template>
  <div class="container">
    <div class="product">
      <div class="product-body">
        <div class="product-body-wrapper">
            <Swiper
                class="slider"
                @swiper="e=>slider=e"
                :modules="modules"
                :slides-per-view="1"
                :space-between="20"
                :thumbs="{ swiper: thumbsSwiper }"
            >
              <Swiper-slide class="slider-item" v-for="item in Detail.attributes.images.data"
              >
                <NuxtImg
                    provider="cloudinary"
                    :src="item.attributes.url"
                ></NuxtImg>
              </Swiper-slide>
            </Swiper>

            <Swiper
                class="slider-thumbs"
                @swiper="e=>thumbsSwiper=e"
                :modules="modules"
                :slides-per-view="5"
                :watchSlidesProgress="true"
                :space-between="10"
            >
              <Swiper-slide class="slider-thumbs-item" v-for="item in Detail.attributes.images.data"
              >
                <NuxtImg
                    provider="cloudinary"
                    :src="item.attributes.url"
                ></NuxtImg>
              </Swiper-slide>
            </Swiper>
        </div>
        <Form @submit="onSubmit" class="product-body-info">
          <h1 class="product-title">{{ Detail.attributes.Title }}</h1>
          <div class="product-short">
            <AvailableIcon/>
            <CompareIcon/>
            <ShareIcon/>
          </div>
          <div class="product-price">
            <h5 class="product-price-title" v-if="Detail.attributes.oldPrice">
              <span>{{ Detail.attributes.oldPrice }} ₽</span>
              {{ Detail.attributes.Price }} ₽
            </h5>
            <h5 class="product-price-title" v-else> {{ Detail.attributes.Price }} ₽</h5>
            <div class="product-price-credit"></div>
          </div>
          <template v-if="Detail.attributes.Services">
            <div class="product-deals" v-for="item in Detail.attributes.Services.data" :key="item.id">
              <h6>{{ item.attributes.Name }}</h6>
              <Additional :settings="item"></Additional>
            </div>
          </template>
          <div class="product-result">
            <div class="product-result-price">
              <h6>{{ Price }} руб.</h6>
              <div class="product-actions-item">
                <Favorite :isFavorite="isFavorite" :id="Detail.id"></Favorite>
              </div>
            </div>
            <div class="product-result-delivery">
              <Icon name="mdi:truck-delivery-outline" class="icon"
              />
              <span>Бесплатная доставка по РФ</span>
            </div>
            <div class="product-result-buttons">
              <button class="button button-outlined">Добавить в корзину</button>
              <button class="button button-primary">Купить в 1 клик</button>
            </div>
          </div>
        </Form>
      </div>
      <div class="product-footer">
        <Swiper
            class="slider-thumbs"
            @swiper="e=>thumbsProperty=e"
            :modules="modules"
            :slides-per-view="4"
            :watchSlidesProgress="true"
            :space-between="10"
            :breakpoints="{
                             320: {
                              slidesPerView: 1,
                            },
                             480: {
                              slidesPerView: 3,
                            },
                             767: {
                              slidesPerView: 4,
                            }
                        }"
        >
          <Swiper-slide class="slider-thumbs-item"
          >
            О товаре
          </Swiper-slide>
          <Swiper-slide class="slider-thumbs-item"
          >
            Характеристики
          </Swiper-slide>
          <Swiper-slide class="slider-thumbs-item"
          >
            Доставка и оплата
          </Swiper-slide>
          <Swiper-slide class="slider-thumbs-item"
          >
            Гарантии
          </Swiper-slide>
        </Swiper>
        <Swiper
            class="slider"
            @swiper="e=>Property=e"
            :modules="modules"
            :slides-per-view="1"
            :space-between="20"
            :thumbs="{ swiper: thumbsProperty }"
            effect="fade"
            :fadeEffect="{ crossFade: true }"
            :auto-height="true"
            :allow-touch-move="false"
        >
          <Swiper-slide class="slider-item">
            <div class="about">
              <div class="about-item">
                <h5>{{ Detail.attributes.Title }}</h5>
                <p v-if="Detail.attributes.About">{{ Detail.attributes.About }}</p>
              </div>
              <div class="about-item">
                <div class="about-item-equipment">
                  <h6>{{ Detail.attributes.Title }}</h6>
                  <p v-if="Detail.attributes.Scooter">
                    {{ Detail.attributes.Scooter.equipment }}
                  </p>
                </div>
                <div class="about-item-features">
                  <h6>Ключевые особенности {{ Detail.attributes.Title }}</h6>
                  <div class="feature">
                    <div v-if="Detail.attributes.Scooter.type_product" class="feature-item">
                      {{ Detail.attributes.Scooter.type_product.data.attributes.Title }}
                    </div>
                    <div class="feature-item">{{
                        Detail.attributes.Scooter.user_type.data.attributes.Title
                      }}
                    </div>
                    <div class="feature-item">До {{ Detail.attributes.Scooter.max_speed }}
                      км/ч
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Swiper-slide>
          <Swiper-slide class="slider-item">
            <div class="property">
              <template v-if="Detail.attributes.Scooter">
                <div class="column">
                  <div class="property-item">Масса нетто
                    <span>{{ Detail.attributes.Weight }} кг</span></div>
                  <div class="property-item">Мощность
                    <span>{{ Detail.attributes.Scooter.power }} W</span></div>
                  <div class="property-item">
                    Аккумулятор
                    <span>{{ Detail.attributes.Scooter.battery_capacity }} mAh</span></div>
                  <div class="property-item">Максимальная
                    скорость
                    <span>До {{
                        Detail.attributes.Scooter.max_speed
                      }} км/ч*</span></div>
                  <div class="property-item">Максимальный
                    пробег
                    <span>До {{ Detail.attributes.Scooter.max_range }}км/ч*</span></div>
                  <div class="property-item">Время полной
                    зарядки
                    <span>{{ Detail.attributes.Scooter.charge_time }}</span></div>
                  <div class="property-item">
                    Максимальная
                    нагрузка
                    <span>{{ Detail.attributes.Scooter.maximum_load }} кг</span></div>
                  <div class="property-item">Размер колес
                    <span>{{ Detail.attributes.Scooter.wheel_size }}</span></div>
                </div>
                <div class="column">
                  <div class="property-item">Тип колес
                    <span>{{ Detail.attributes.Scooter.type_wheels }}</span></div>
                  <div class="property-item">Габариты (ДВШ), см
                    <span>{{ Detail.attributes.Scooter.gabarits }}</span></div>
                  <div class="property-item">Подсветка
                    <span>{{ Detail.attributes.Scooter.lighting }}</span></div>
                  <div class="property-item">Привод
                    <span>{{ Detail.attributes.Scooter.privod }}</span></div>
                  <div class="property-item">Тормозная система
                    <span>{{ Detail.attributes.Scooter.stop_system }}</span></div>
                  <div class="property-item">Комплектация
                    <span>{{ Detail.attributes.Scooter.equipment }}</span></div>
                  <div class="property-item">Гарантия
                    <span>{{ Detail.attributes.Scooter.guarantee }}</span></div>
                  <div class="property-item special"
                       v-if="Detail.attributes.Scooter.max_range||Detail.attributes.Scooter.max_speed">
                    *указаны максимально возможные характеристики, зависящие от веса райдера,
                    рельефа
                    местности, погодных условий и температуры окружающей среды
                  </div>
                </div>
              </template>
            </div>

          </Swiper-slide>
          <Swiper-slide class="slider-item">
            <div class="pay">
              <div class="pay-item">
                <h5>5 способов оплаты</h5>
                <ul>
                  <li>наличными</li>
                  <li>картой</li>
                  <li>онлайн на сайте через корзину</li>
                  <li>через интернет-банкинг по счету</li>
                  <li>в кредит от «Сбербанка»</li>
                </ul>
              </div>
              <div class="pay-item">
                <h5>Доставка по всей России</h5>
                <ul>
                  <li>Отправляем заказы по всей России день в день службой доставки товаров CDEK
                  </li>
                  <li>Самовывоз из магазинов в Москве, Санкт-Петербурге и Краснодаре</li>
                </ul>
              </div>
            </div>
          </Swiper-slide>
          <Swiper-slide class="slider-item">
            <Gurantee></Gurantee>
          </Swiper-slide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Navigation, Thumbs, EffectFade} from "swiper";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Form} from "vee-validate"
// Нужно типизировать
//import {Swiper as SwiperType} from "swiper/vue/swiper-vue"
//import {ThumbsOptions} from "swiper/types/modules/thumbs"
const {Favorites} = storeToRefs(useUser())

const isFavorite = computed(() => {
  return Favorites.value.data ? Favorites.value.data.some(p => p.id === Detail.value.id) : false
})

const modules = [Navigation, Thumbs, EffectFade];
const {
  filteredDeal, orderToCookie
} = useCatalog()
const {
  Detail, ServiceToOrder
} = storeToRefs(useCatalog())

const {params} = useRoute()
await filteredDeal(params.id as string)

const Price = computed<number>(() => {
      return ServiceToOrder.value ? ServiceToOrder.value.reduce(
          (total, item) => item.Price + total,
          0
      ) + Detail.value.attributes.Price : Detail.value.attributes.Price
    }
)


const onSubmit = () => {
  const OrderPrice: number = Price.value
  orderToCookie(OrderPrice)
}

const slider = ref<null>();
let thumbsSwiper = ref<null>();
const Property = ref<null>();
let thumbsProperty = ref<null>();


</script>

<style scoped lang="less">
.product {
  margin: 40px 0;

  &-body {
    display: flex;
    justify-content: space-between;
    margin: 0 0 50px 0;
    @media @xl {
      flex-direction: column;
    }

    &-wrapper {
      width: 48%;
      @media @xl {
        width: 100%;
      }

      .slider {
        height: 506px;
        @media @xl {
          height: 306px;
        }

        &-item {
          .br(10px);
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: scale-down;
          }
        }
      }

      .slider-thumbs {
        height: 90px;
        margin: 1em 0;


        &-item {
          cursor: pointer;
          border: 1px solid transparent;
          .br(10px);
          overflow: hidden;
          .trs(0.5s);


          img {
            height: 100%;
            width: 100%;
            object-fit: scale-down;
          }
        }

        .swiper-slide-thumb-active {
          border: 1px solid @purple;
        }

        &-item:hover {
          .trs(0.5s);


        }
      }
    }

    &-info {
      width: 48%;
      overflow: hidden;
      @media @xl {
        width: 100%;
      }

    }

  }

  &-footer {
    margin: 50px 0;

    .slider-thumbs {
      padding: 0 0 20px 0;
      border-bottom: 1.5px solid #EAEBED;

      &-item {
        text-align: center;
        position: relative;
        cursor: pointer;
      }

      .swiper-slide-thumb-active::after {
        display: block;
        content: " ";
        position: absolute;
        bottom: -108%;
        left: 0;
        width: 100%;
        height: 2px;
        background: @purple;
      }
    }

    .slider {
      margin: 30px 0 50px 0;

      h5 {
        font-weight: 600;
        font-size: 1.563em;
        line-height: 36px;
        text-transform: uppercase;
        @media @md {
          font-size: 1.125em;
        }
      }

      &-item {
        .about {
          display: flex;
          justify-content: space-between;
          @media @md {
            flex-direction: column
          }


          h6 {
            font-weight: 500;
            font-size: 1.250em;
            line-height: 24px;
            @media @md {
              font-size: 1em;
            }
          }

          p {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
          }

          &-item {
            width: 46%;
            @media @md {
              width: 100%;
            }

            &-equipment {

            }

            &-features {
              .feature {
                display: flex;
                flex-wrap: wrap;
                margin: 0 0 0 -10px;

                &-item {
                  padding: 14px 20px;
                  margin: 20px 0 0 10px;
                  background: #F4F7FB;
                  .br(5px);
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                  color: @gray;
                }
              }
            }
          }

          &-item:last-child {
            margin: 20px 0 0 0;
          }
        }

        .property {
          display: flex;
          justify-content: space-between;
          @media @lg {
            flex-direction: column;
          }

          .column {
            width: 47%;
            @media @lg {
              width: 100%;
            }
          }

          .special {
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;
            color: @gray;
          }

          &-item {
            padding: 0 0 20px 0;
            font-weight: 400;
            font-size: 16px;
            line-height: 23px;
            border-bottom: 1px solid #EAEBED;
            margin: 20px 0 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
              font-weight: 600;
            }
          }
        }

        .pay {
          display: flex;
          justify-content: space-between;
          @media @md {
            flex-direction: column;
          }

          &-item {
            width: 48%;
            @media @md {
              width: 100%;
            }

            ul {
              padding: 0 0 0 20px;
            }
          }
        }
      }
    }
  }

  &-title {
    font-weight: 600;
    font-size: 2.188em;
    line-height: 51px;
    color: @black;
    text-transform: uppercase;
    @media @lg {
      font-size: 1.750em;
    }
    @media @md {
      font-size: 1.250em;
    }
  }

  &-short {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-self: center;
  }

  &-price {
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-weight: 600;
      font-size: 1.563em;
      line-height: 36px;
      text-transform: uppercase;
      color: @black;
      @media @lg {
        font-size: 1em;
      }

      span {
        display: block;
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        text-decoration-line: line-through;
        color: @gray;
      }
    }
  }

  &-deals {
    margin: 30px 0;

    h6 {
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      color: @black;
      margin: 0 0 15px 0;
    }


  }

  &-deals:last-child {
    border-bottom: none;
  }

  &-result {
    background: #F4F7FB;
    .br(10px);
    padding: 27px 30px;

    &-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 20px 0;

      h6 {
        font-weight: 600;
        font-size: 2.188em;
        line-height: 51px;
        color: @black;
        text-transform: uppercase;
      }

    }

    &-delivery {
      border-top: 1px solid #EAEBED;
      padding: 30px 0;

      .icon {
        font-size: 1.3em;
      }

      span {
        margin: 0 0 0 15px;
      }
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media @md {
        flex-direction: column;
      }

      .button {
        width: 45%;
        @media @md {
          width: 100%;
        }
      }

      .button:last-child {
        @media @md {
          margin: 20px 0 0 0;
        }
      }
    }
  }
}

ul {
  li {
    position: relative;
    list-style-type: none;

  }

  li::before {
    position: absolute;
    left: -20px;
    top: 32%;
    display: block;
    width: 10px;
    height: 10px;
    content: " ";
    background: url("/dot.svg") no-repeat;
  }
}

</style>