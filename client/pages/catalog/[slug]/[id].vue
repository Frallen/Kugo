<template>
    <div class="container">
        <div class="product">
            <div class="product-body">
                <div class="product-body-wrapper">
                    <Swiper
                            class="slider"
                            @swiper="onSwiper"
                            :modules="modules"
                            :slides-per-view="1"
                            :space-between="20"
                            :thumbs="{ swiper: thumbsSwiper }"
                    >
                        <Swiper-slide class="slider-item" v-for="item in item.attributes.images.data"
                        >
                            <NuxtImg
                                    provider="cloudinary"
                                    :src="item.attributes.url"
                            ></NuxtImg>
                        </Swiper-slide>
                    </Swiper>
                    <Swiper
                            class="slider-thumbs"
                            @swiper="setThumbsSwiper"
                            :modules="modules"
                            :slides-per-view="5"
                            :watchSlidesProgress="true"
                            :space-between="10"
                    >
                        <Swiper-slide class="slider-thumbs-item" v-for="item in item.attributes.images.data"
                        >
                            <NuxtImg
                                    provider="cloudinary"
                                    :src="item.attributes.url"
                            ></NuxtImg>
                        </Swiper-slide>
                    </Swiper>
                </div>
                <div class="product-body-info">
                    <h1 class="product-title">{{ item.attributes.Title }}</h1>
                    <div class="product-short">
                        <div>В наличии</div>
                        <div>Сравнить</div>
                        <div>Поделиться</div>
                    </div>
                    <div class="product-price">
                        <h5 class="product-price-title" v-if="item.attributes.discount_percent">
                            <span>{{ item.attributes.Price }} ₽</span>
                            {{ item.attributes.Price - item.attributes.Price / 100 * item.attributes.discount_percent }}
                            ₽
                        </h5>
                        <h5 class="product-price-title" v-else>{{ item.attributes.Price }} ₽</h5>
                        <div class="product-price-credit"></div>
                    </div>

                    <div class="product-deals">
                        <h6>Гарантия</h6>
                        <Additional :settings="Warranties"></Additional>
                    </div>
                    <div class="product-deals">
                        <h6>Комплектация</h6>
                        <Additional :settings="AdditionalServices"></Additional>
                    </div>
                    <div class="product-deals">
                        <h6>Дополнительные услуги</h6>
                        <Additional :settings="Packages"></Additional>
                    </div>
                    <div class="product-result">
                        <div class="product-result-price">
                            <h6>45 900 руб.</h6>
                            <div class="product-actions-item">
                                <Favorite :isFavorite="false"></Favorite>
                            </div>
                        </div>
                        <div class="product-result-delivery">
                            <Icon name="mdi:truck-delivery-outline" class="icon"
                            />
                            <span>Бесплатная доставка по РФ от 1 дня при заказе до 01.09</span>
                        </div>
                        <div class="product-result-buttons">
                            <button class="button button-primary">Купить в 1 клик</button>
                            <button class="button button-outlined">Добавить в корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {Navigation, Thumbs} from "swiper";
import {Swiper, SwiperSlide} from "swiper/vue";

const {
    filteredItem, Warranties,
    AdditionalServices, Packages
} = useCatalog()
const {params} = useRoute()
const modules = [Navigation, Thumbs];
const slider = useState<null>();
const onSwiper = (swiper: any) => {
    slider.value = swiper;
};
let thumbsSwiper = useState<null>();


const setThumbsSwiper = (swiper: any) => {
    thumbsSwiper.value = swiper;
}

const item = await filteredItem(typeItem(), parseInt(params.id))
</script>

<style scoped lang="less">
.product {
  margin: 40px 0;

  &-body {
    display: flex;
    justify-content: space-between;
    @media @lg {
      flex-direction: column;
    }

    &-wrapper {
      width: 48%;
      @media @lg {
        width: 100%;
      }

      .slider {
        max-height: 506px;

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

        .swiper-slide-thumb-active {
          border: 1px solid @purple;
        }

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

        &-item:hover {
          .trs(0.5s);


        }
      }
    }

    &-info {
      width: 48%;
      overflow: hidden;
      @media @lg {
        width: 100%;
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
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media @md {
        flex-direction: column;
      }

      .button:last-child {
        @media @md {
          margin: 20px 0 0 0;
        }
      }
    }
  }
}
</style>