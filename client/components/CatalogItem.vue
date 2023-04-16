<template>
    <div>
        <NuxtLink :to="`/catalog/${item.attributes.category.data.attributes.Slug}/${item.id}`"
                  class="product"
                  @mouseover="mouseHovered=true"
                  @mouseleave="mouseHovered=false"
        >
            <div class="product-badges">
                <div class="product-badges-item " v-for="p in item.attributes.badges.data" :key="item.id"
                     :class="{'product-badges-hit':p.attributes.title==='Хит', 'product-badges-new':p.attributes.title==='Новинка'}">
                    {{ p.attributes.title }}
                </div>
            </div>
            <div class="product-compare">
                <Icon name="carbon:scales" class="icon"
                />
            </div>
            <div class="product-img">
                <Swiper
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="20"
                        :autoplay="{
          delay: 3000,
        }"
                        class="slider"
                        @swiper="onSwiper"
                >
                    <Swiper-slide class="slider-item" v-for="item in item.attributes.images.data"
                    >
                        <NuxtImg
                                provider="cloudinary"
                                :src="item.attributes.url"
                        ></NuxtImg>
                    </Swiper-slide>
                    <transition name="fade">
                        <div class="slider-nav" v-show="mouseHovered">
                            <div class="slider-nav-item slider-nav-prev" @click.stop.prevent="slider.slidePrev()">
                                <Icon name="ph:caret-left" class="icon"
                                />
                            </div>
                            <div class="slider-nav-item slider-nav-next" @click.stop.prevent="slider.slideNext()">
                                <Icon name="ph:caret-right" class="icon"
                                />
                            </div>
                        </div>
                    </transition>
                </Swiper>
            </div>
            <div class="product-content">
                <h4 class="product-title">
                    {{ item.attributes.Title }}
                </h4>
                <div class="product-features">
                    <div class="product-features-item">
                        <Icon name="material-symbols:battery-charging-20-rounded" class="icon"
                        />
                        {{ item.attributes.power }} W
                    </div>
                    <div class="product-features-item">
                        <Icon name="material-symbols:weight-outline" class="icon"
                        />
                        {{ item.attributes.weight }} кг
                    </div>
                    <div class="product-features-item">
                        <Icon name="icon-park-outline:speed-one" class="icon"
                        />
                        {{ item.attributes.max_speed }} км/ч
                    </div>
                    <div class="product-features-item">

                        <Icon name="ion:ios-flash" class="icon"
                        />
                        {{ item.attributes.battery_capacity }} mAh
                    </div>
                </div>
                <div class="product-body">
                    <div class="product-body-price">
                        <h5 v-if="item.attributes.discount_percent">
                            <span>{{ item.attributes.Price }} ₽</span>
                            {{ item.attributes.Price - item.attributes.Price / 100 * item.attributes.discount_percent }}
                            ₽
                        </h5>
                        <h5 v-else>
                            {{ item.attributes.Price }} ₽
                        </h5>
                        <div class="product-actions">
                            <div class="product-actions-item">
                                <Favorite :isFavorite="false"></Favorite>
                            </div>
                            <div class="product-actions-item">
                                <BasketButton></BasketButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import {type DetailItemType} from "~/types/catalog.types";
import {Navigation} from "swiper";

import {Swiper, SwiperSlide} from "swiper/vue";

const modules = [Navigation];
const slider = useState<null>();

const onSwiper = (swiper: any) => {
    slider.value = swiper;
};

interface propsType {
    item: DetailItemType
}


let {item} = defineProps<propsType>();
const catalogItem = useState<HTMLLIElement>()

//const isHovered = useElementHover(catalogItem)

const mouseHovered = useState<boolean>()

</script>

<style scoped lang="less">
.product {
  border: 1.5px solid #eaebed;
  .br(10px);
  position: relative;
  user-select: none;
  text-decoration: none;
  display: block;
  height: 100%;

  &-badges, &-compare {
    position: absolute;
    z-index: 2;
  }

  &-title {
    font-weight: 600;
    font-size: 1.125em;
    line-height: 26px;
    color: @black;
  }

  &-img {
    height: 231px;
    width: 100%;
    overflow: hidden;

    .slider {
      height: 100%;

      &-item {
        img {
          width: 100%;
          height: 100%;
          object-fit: scale-down;
        }
      }

      &-nav {
        padding: 0 15px;
        position: absolute;
        bottom: 5%;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 3;

        &-item {
          padding: 10px;
          background: #fff;
          .br(300px);
          color: @purple;
          font-size: 1.3em;
          cursor: pointer;
          box-shadow: 0 0 3px 1px @black;
        }
      }
    }
  }

  &-badges {
    left: 15px;
    top: 15px;
    display: flex;
    flex-direction: column;

    &-item {
      font-weight: 500;
      font-size: 12px;
      line-height: 17px;
      color: #fff;
      .br(5px);
      padding: 5px 9px;
      margin: 5px 0 0 0;
      text-align: center;
    }

    &-item:first-child {
      margin: 0;
    }

    &-hit {
      background: #EE685F;
    }

    &-new {
      background: #75D14A;
    }
  }

  &-compare {
    right: 15px;
    top: 15px;
    cursor: pointer;
    z-index: 2;
    color: @gray;
  }

  &-content {
    padding: 24px 20px 20px;

    .product-body {
      &-price {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h5 {
          span {
            font-weight: 500;
            font-size: 12px;
            line-height: 17px;
            text-decoration-line: line-through;
            color: @gray;
            display: block;
          }

          font-weight: 600;
          font-size: 20px;
          line-height: 29px;
          color: @black;
        }
      }
    }

    .product-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-item {

      }

      &-item:last-child {
        margin: 0 0 0 10px;
      }
    }
  }

  &-features {
    margin: -17px 0 0 -10px;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0 26px;

    &-item {
      width: calc(100% / 2 - 10px);
      margin: 17px 0 0 10px;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: @gray;

    }
  }
}
</style>
