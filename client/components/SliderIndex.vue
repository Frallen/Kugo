<template>
    <div>
        <Swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="20"
                :autoplay="{
          delay: 3000,
        }"
                class="slider" @swiper="onSwiper"
        >
            <Swiper-slide class="slider-item purple">
                <div class="container">
                    <nuxt-img src="kirin.png" class="img slider-item-logo"></nuxt-img
                    >
                    <nuxt-img
                            src="sliderSamokat.png"
                            class="img slider-item-image"
                    ></nuxt-img>

                    <div class="slider-content">
                        <div class="slider-content-wrapper">
                            <h2>Электросамокаты Kugoo Kirin от официального дилера</h2>
                            <p>с бесплатной доставкой по РФ от 1 дня</p>
                            <NuxtLink to="/catalog" class="button button-white"
                            >Перейти в католог
                            </NuxtLink
                            >
                        </div>
                    </div>
                </div>
            </Swiper-slide>
            <Swiper-slide class="slider-item orange">
                <div class="container">
                    <nuxt-img src="woman.png" class="img slider-item-image"></nuxt-img>

                    <div class="slider-content">
                        <div class="slider-content-wrapper">
                            <h2>Ремонт и обслуживание товаров Kugoo Kirin</h2>
                            <p>в фирменных сервисых центрах</p>
                            <div class="features">
                                <div class="features-item">
                                    <span><Icon name="bi:geo-alt-fill" class="icon"/></span>
                                    <h4>
                                        Сервисные центры в Москве, Санкт-Петербурге и Краснодаре
                                    </h4>
                                </div>
                                <div class="features-item">
                    <span
                    ><Icon
                            name="mingcute:safety-certificate-fill"
                            class="icon"
                    /></span>
                                    <h4>Гарантия 14 дней на ремонт</h4>
                                </div>
                                <div class="features-item">
                                    <span><Icon name="ic:round-settings" class="icon"/></span>
                                    <h4>
                                        Всегда в наличии оригинальные запчасти от производителя
                                    </h4>
                                </div>
                            </div>
                            <NuxtLink to="/catalog" class="button button-secondary"
                            >Записаться
                            </NuxtLink
                            >
                        </div>
                    </div>
                </div>
            </Swiper-slide>
            <div class="slider-nav container">
                <div class="btn" @click.stop="slider.slidePrev()">
                    <Icon name="ph:caret-left" class="icon"
                    />
                </div>
                <div class="btn" @click.stop="slider.slideNext()">
                    <Icon name="ph:caret-right" class="icon"
                    />
                </div>
            </div>
        </Swiper>
    </div>
</template>

<script lang="ts" setup>
import {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/vue";

const modules = [Navigation];
const slider = useState<null>();
const onSwiper = (swiper: any) => {
    slider.value = swiper;
};
</script>

<style scoped lang="less">
.slider {
  margin: 30px 20px 39px;

  &-nav {
    display: flex;
    align-items: center;
    width: 100px;
    position: absolute;
    bottom: 7%;
    left: 0;
    z-index: 1;
    @media @lg {
      right: 3%;
      left: initial;
    }

    .btn {
      .br(300px);
      border: 1px solid #fff;
      cursor: pointer;
      padding: 5px;

      .icon {
        font-size: 1em;
        color: #fff;
      }
    }

    .btn:last-child {
      margin: 0 0 0 1em;
    }
  }

  .slider-item {
    .br(10px);
    overflow: hidden;
    position: relative;
    z-index: 3;
    height: 421px;

    .img {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    &-logo {
      z-index: -1;
      @media @xs {
        display: none;
      }
    }

    &-image {
      z-index: -1;
      @media @xs {
        display: none;
      }
    }

    .slider-content {
      padding: 30px 0;
      @media @md {
        padding: 15px 0;
      }

      h2 {
      }

      p {
        margin: 6px 0 25px;
        color: #fff;
        font-weight: 400;
        font-size: 1.25em;
        line-height: 29px;
      }

      &-wrapper {
        width: 70%;
        @media @md {
          width: 100%;
        }

        .button {
          margin: 0;
        }

        .button-secondary {
          color: @orange;
          background: #fff;
        }

        .features {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 40px;
          @media @md {
            flex-wrap: wrap;
            margin: 0 0 15px;
          }

          &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 15px 0 0;
            @media @md {
              margin: 10px 0 0 0;
            }

            span {
              padding: 12px;
              background: rgba(255, 255, 255, 0.2);
              .br(5px);
              color: #fff;
              display: block;
              margin: 0 15px 0 0;
            }

            color: #fff;
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
          }
        }

        &-item:last-child {
          margin: 0;
        }
      }
    }
  }
}

.purple {
  background: radial-gradient(58.73% 541.94% at 75.14% 62.23%,
  #a6a9ff 0%,
  #6f73ee 100%)
  /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
}

.orange {
  background: radial-gradient(74.38% 244.23% at 75.04% 76.25%,
  #ffc960 0%,
  #f3a712 100%)
  /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
}
</style>
