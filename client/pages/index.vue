<template>
    <Slider></Slider>
    <div class="container">
        <div class="features">
            <div class="features-item text">Гарантия 1 год <span>на весь ассортимент</span></div>
            <div class="features-item text">рассрочка <span>от 6 месяцев</span></div>
            <div class="features-item text">Подарки <span>и бонусам к покупкам </span></div>
            <div class="features-item yandex">
                <div class="yandex-icon">Я</div>
                <div class="yandex-title">Яндекс отзывы
                    <span><Icon name="ic:sharp-star-purple500" class="icon"
                    />4,9</span></div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="offers-short">
            <h3>Электросамокаты</h3>
            <Offers :offerType="filteredOffer('samokats')"></Offers>
            <NuxtLink class="button button-primary" to="/catalog">Смотреть все</NuxtLink>
        </div>
    </div>
    <div class="container">
        <div class="service">
            <NuxtLink to="" class="service-item">
                <div class="service-item-wrapper">
                    <span class="service-item-title">Подбор модели электросамоката</span>
                    <span class="service-item-text">Пройдите тест и выберите электросамокат по своим критериям</span>
                    <span class="service-item-link">Подобрать модель<Icon
                            name="material-symbols:arrow-forward-ios" class="icon"
                    /> </span></div>
                <NuxtImg src="serviceSamkokat.png" class="service-item-img"></NuxtImg>
            </NuxtLink>
            <NuxtLink to="" class="service-item">
                <div class="service-item-wrapper">
            <span class="service-item-title">Сервисное
обслуживание</span>
                    <span class="service-item-text">Крупнейший сервисный центр в России для продуктов Kugoo</span>
                    <span class="service-item-link">Обратиться к специалисту<Icon
                            name="material-symbols:arrow-forward-ios" class="icon"
                    /> </span></div>
                <NuxtImg src="serviceWoman.png" class="service-item-img"></NuxtImg>
            </NuxtLink>
        </div>
    </div>
   <StockBlock></StockBlock>
    <div class="container">
        <div class="categories">
            <div class="categories-header">
                <h3>Популярные категории</h3>
                <SupportWidget></SupportWidget>
            </div>
            <div class="categories-wrapper">
                <NuxtLink to="/category/" class="categories-item">
                    <NuxtImg src="electricScooter.png"></NuxtImg>
                    <span>Электросамокаты</span></NuxtLink>
                <NuxtLink to="/category/" class="categories-item">
                    <NuxtImg src="bicycle.png"></NuxtImg>
                    <span>Электровелосипеды</span></NuxtLink>
                <NuxtLink to="/category/" class="categories-item">
                    <NuxtImg src="vacuum-cleaner.png"></NuxtImg>
                    <span>Робот-пылесоссы</span></NuxtLink>
                <NuxtLink to="/category/" class="categories-item">
                    <NuxtImg src="scales.png"></NuxtImg>
                    <span>Весы</span></NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const {filteredOffer} = useCatalog()


</script>

<style scoped lang="less">
.features {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
  margin: -20px 0 0 -50px;
  @media @lg {
    margin: -20px 0 0 -30px;
  }
  @media @md {
    margin: -15px 0 0 -20px;
  }

  .text {
    font-weight: 600;
    font-size: 25px;
    line-height: 36px;
    text-transform: uppercase;
    color: @black;
    @media @lg {
      font-size: 18px;
    }

    span {
      display: block;
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      text-transform: initial;
      @media @lg {
        font-size: 13px;
      }
    }
  }

  &-item {
    margin: 20px 0 0 50px;
    @media @lg {
      margin: 20px 0 0 30px;
    }
    @media @md {
      margin: 15px 0 0 20px;
    }
  }

  .yandex {
    padding: 10px;
    border: 1px solid rgba(93, 108, 123, 0.1);
    .br(5px);
    display: flex;
    align-items: center;
    justify-content: space-between;


    &-icon {
      background: #FC3F1D;
      box-shadow: 0 1px 6px 0 #FC3F1D;
      color: #fff;
      font-size: 2em;
      padding: 14px 18px;
      .br(5px);
      margin: 0 10px 0 0;
    }

    &-title {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      color: @gray;

      span {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 25px;
        line-height: 36px;
        text-transform: uppercase;
        color: @black;

        .icon {
          color: #FFD12E;
          font-size: 1em;
        }
      }
    }
  }
}

.service {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  @media @lg {
    flex-direction: column;
  }

  &-item {
    text-decoration: none;
    overflow: hidden;
    .br(10px);
    background: #F4F7FB;
    position: relative;
    padding: 32px 40px;
    width: 46%;
    display: block;
    @media @lg {
      width: 80%;
    }
    @media @md {
      width: 100%;
    }

    &-img {
      position: absolute;
      z-index: 2;
    }

    span {
      display: block;
    }

    &-title {
      font-weight: 600;
      font-size: 1.563em;
      line-height: 36px;
      text-transform: uppercase;
      color: @black;
      @media @lg {
        font-size: 1.125em ;
      }
      @media @md {
        font-size: 1em;
      }
    }

    &-text {
      margin: 10px 0 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      color: #282739;
      @media @md {
        font-size: 14px;
      }
    }

    &-link {
      margin: 20px 0 0 0;
      color: @purple;
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;

      .icon {
        margin: 0 0 0 10px;
      }
    }

    &-wrapper {
      max-width: 258px;
      z-index: 3;
      position: relative;
    }
  }

  &-item::after {
    .br(100%);
    background: @purple;
    content: " ";
    display: block;
    position: absolute;
    right: -17%;
    bottom: -6%;
    height: 113%;
    width: 51%;
    z-index: 1;
  }

  &-item:first-child {
    img {
      right: 0;
      bottom: 0;
    }
  }

  &-item:last-child {
    img {
      right: 7%;
      bottom: 0;

    }

    @media @lg {
      margin: 20px 0 0 0;
    }
  }
}

.categories {
  margin: 50px 0;

  &-header {
    display: flex;
    justify-content: space-between;
    margin: 0 0 68px 0;
    @media @sm {
      margin: 0 0 38px 0;
      flex-direction: column;
      align-items: center;
    }

    .support {
      @media @sm {
        margin: 20px 0 0;
      }
    }

    h3 {
      @media @sm {
        text-align: center
      }
    }
  }

  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: -30px 0 0 -20px;
    @media @lg {
      margin: -20px 0 0 -15px;
    }
    @media @sm {
      justify-content: center;
      margin: -10px 0 0 0;

    }

  }

  &-item {
    width: calc(100% / 4 - 20px);
    height: 264px;
    margin: 30px 0 0 20px;
    position: relative;
    .br(10px);
    overflow: hidden;
    display: block;
    @media @lg {
      width: calc(100% / 2 - 15px);
      margin: 20px 0 0 15px;
    }
    @media @sm {
      width: 80%;
      margin: 10px 0 0 0;
    }
    @media @xs {
      width: 100%;
    }

    span {
      padding: 10px 16px;
      display: block;
      position: absolute;
      bottom: 10%;
      left: 10%;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
      .br(10px);
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      color: #fff;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.offers-short {
  margin: 50px 0;

  .button {
    margin: 50px auto 0
  }
}
</style>
