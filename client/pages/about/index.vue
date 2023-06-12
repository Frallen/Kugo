<template>
  <div>
    <div class="banner-wrapper">
      <div class="banner-wrapper-background"></div>
      <div class="container">
        <div class="banner">
          <h1>Kugoo — официальный дилер Kugoo Kirin в России</h1>

          <div class="banner-features">
            <div class="banner-features-item"><span>Работаем с</span>2017 г</div>
            <div class="banner-features-item"><span>Специалистов в штате</span>35</div>
            <div class="banner-features-item"><span>Клиентов по России <br>
            и странам СНГ</span>2 000
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="about">
        <div class="about-text">
          <h3>С 2017 г. развиваем тему электротранспорта и освещаем
            его ценность в современном мире</h3>
          <h4>Наша цель</h4>
          <p>Предоставить полный ассортимент современной продукции Kugoo Kirin, которая улучшает и упрощает жизнь.
            Cтремимся подарить комфорт и эмоции, поэтому помогаем с выбором и внимательно относимся к сервисному
            обслуживанию.</p>
          <h4>Специализируемся исключительно на бренде Kugoo, поэтому вы получите:</h4>
          <ul>
            <li><span>Цены</span> от завода-изготовителя Jilong ;</li>
            <li><span>Бесплатный тест-драйв</span> самокатов;</li>
            <li>Фирменную <span>гарантию 1 год</span> ;</li>
            <li><span>Ремонт и обслуживание</span> от 1 дня в собственном сервисном центре</li>
            <li><span>Более 1 000 запчастей</span> и аксессуаров в наличии.</li>
          </ul>
        </div>
        <div class="about-video">
          <iframe width="100%" height="350" src="https://www.youtube.com/embed/gyfbKumscmw" title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
        </div>
      </div>
      <div class="service">
        <h3>Предлагаем самые выгодные цены
          на продукты Kugoo за счет прямых поставок</h3>
        <div class="service-list">
          <div class="service-list-item">
            <NuxtImg src="cart.svg"></NuxtImg>
            <h6>Х товаров в каталоге</h6>
            <p>Выбирайте товар, который подходит по цене и характеристикам. Если товара нет в наличии — мы сообщим вам о
              его поступлении. </p>
          </div>
          <div class="service-list-item">
            <NuxtImg src="wallet.svg"></NuxtImg>
            <h6>5 способов оплаты</h6>
            <p>Вы можете оплатить покупку наличными, картой, онлайн на сайте, через интернет-банкинг или в кредит от
              «Сбербанка».</p>
          </div>
          <div class="service-list-item">
            <NuxtImg src="discount.svg"></NuxtImg>
            <h6>Полная документация и гарантия 1 год</h6>
            <p>При покупке вам выдается кассовый чек, товарный чек и гарантийный талон – эти документы дают право на
              гарантийное обслуживание.</p>
          </div>
          <div class="service-list-item">
            <NuxtImg src="delivery.svg"></NuxtImg>
            <h6>Отправка заказа день в день</h6>
            <p>Отправляем заказы по всей России день в день или забирайте товар самостоятельно в магазинах в Москве,
              Санкт-Петербурге и Краснодаре</p>
          </div>
          <div class="service-list-item">
            <NuxtImg src="discount.svg"></NuxtImg>
            <h6>Рассрочка без переплат</h6>
            <p>В нашем магазине можно приобрести любой товар в рассрочку.</p>
          </div>
          <NuxtLink to="/catalog" class="service-list-item gray">
            <h6>Больше в каталоге</h6>
            <div class="link">Перейти</div>
            <NuxtImg class="device" src="bycicle.png"></NuxtImg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  breadcrumb: "О компании"
})
</script>

<style scoped lang="less">
.banner-wrapper {
  margin: 20px 30px 40px;
  position: relative;
  overflow: hidden;
  .br(10px);
  background: linear-gradient(73.21deg, #6F73EE 17.37%, rgba(111, 115, 238, 0) 67.02%);
  @media @sm {
    background: @purple;
  }

  &-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("/us.png") no-repeat;
    background-size: cover;
    z-index: -1;
    @media @sm {
      display: none;
    }
  }

  .banner {
    padding: 79px 0;
    @media @lg {
      padding: 59px 0;
    }
    @media @md {
      padding: 39px 0;
    }

    h1 {
      color: #fff;
      max-width: 474px;
      margin: 0 0 34px;
      @media @md {
        margin: 0 0 14px;
      }
      @media @sm {
        text-align: center;
      }
    }

    &-features {
      display: flex;
      flex-wrap: wrap;
      margin: -20px 0 0 -40px;
      @media @md {
        margin: -10px 0 0 -20px;
      }
      @media @sm {
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }

      &-item {
        margin: 20px 0 0 40px;
        color: #fff;
        font-weight: 600;
        font-size: 1.563em;
        line-height: 36px;
        text-transform: uppercase;
        @media @md {
          font-size: 1.3em;
          margin: 10px 0 0 20px;
        }

        span {
          margin: 0 0 10px;
          display: block;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
}

.about {
  padding: 50px 0;
  display: flex;
  justify-content: space-between;
  @media @lg {
    flex-direction: column;
  }

  &-text {
    width: 48%;

    h3 {
      margin: 0 0 34px;
      @media @xl {
        text-align: center;
        font-size: 28px;
      }
      @media @lg {
        font-size: 25px;
      }
      @media @md {
        font-size: 18px;
        line-height: 38px;
      }
    }

    h4 {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: @black;
      margin: 0 0 15px;
    }

    p {
      font-weight: 400;
      font-size: 18px;
      line-height: 26px;
      color: @black;
      margin: 0 0 35px;
    }

    ul {
      margin: 0;
      padding: 0;

      li {
        list-style-type: none;
        position: relative;
        margin: 15px 0 0 7%;

        span {
          font-weight: 500;
        }
      }

      li::after {
        position: absolute;
        left: -9%;
        top: -1%;
        content: " ";
        display: block;
        width: 22px;
        height: 22px;
        background: url("/CheckCircle.svg") no-repeat;
      }

      li:first-child {
        margin: 0 0 0 7%;
      }
    }
  }

  &-video {
    width: 48%;
    @media @lg {
      margin: 30px 0 0;
    }
  }

  &-video, &-text {
    @media @lg {
      width: 100%;
    }

  }
}

.service {
  padding: 50px 0;
  h3 {
    margin: 0 0 34px;
    text-align: center;
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    margin: -30px 0 0 -30px;

    .gray {
      background: #F4F7FB;
    }

    &-item {
      border: 1px solid #EAEBED;
      .br(10px);
      padding: 20px;
      text-decoration: none;
      margin: 30px 0 0 30px;
      width: calc(100% / 3 - 30px);

      position: relative;
      overflow: hidden;
      @media @lg {
        width: calc(100% / 2 - 30px);
      }
      @media @sm {
        width: 100%;
      }

      h6 {
        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
        color: @black;
        margin: 20px 0 10px;
      }

      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
      }
      .link{
        color: @purple;
      }
    }

    .device {
      position: absolute;
      right: 0;
      bottom: -15%;

    }
  }
}
</style>