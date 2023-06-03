<template>
  <div class="footer-wrapper">
    <div class="container">
      <div class="footer">
        <div class="footer-body">
          <div class="footer-body-item">
            <NuxtLink to="/" class="footer-logo">Kugoo</NuxtLink>
            <h6>Каталог товаров</h6>
            <ul>
              <li>
                <NuxtLink to="/catalog/elektrosamokaty"> Электросамокаты</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/catalog/elektrovelosipedy">Электровелосипеды</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/catalog/robot-pylesosy">Робот-пылесосы</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/catalog/vesy">Весы</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="footer-body-item">
            <h6>Покупателям</h6>
            <ul>
              <li>
                <NuxtLink>Сервисный центр</NuxtLink>
              </li>
              <li>
                <NuxtLink>Доставка и оплата</NuxtLink>
              </li>
              <li>
                <NuxtLink>Рассрочка</NuxtLink>
              </li>
              <li>
                <NuxtLink>Тест-драйв</NuxtLink>
              </li>
              <li>
                <NuxtLink>Блог</NuxtLink>
              </li>
              <li>
                <NuxtLink>Сотрудничество</NuxtLink>
              </li>
              <li>
                <NuxtLink>Контакты</NuxtLink>
              </li>
              <li>
                <NuxtLink>Акции</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="footer-body-item">
            <h6>Контакты</h6>
            <div class="address">
              <div class="address-item">
                <NuxtLink class="address-item-title bold" to="tel:+78005055461">+7 (800) 505-54-61</NuxtLink>
                <div class="address-item-special">Пн-Вс 10:00 - 20:00</div>
              </div>
              <div class="address-item">
                <NuxtLink class="address-item-title bold" to="tel:+74993507692">+7 (499) 350-76-92</NuxtLink>
                <div class="address-item-special">Пн-Вс 10:00 - 20:00</div>
              </div>
              <div class="address-item">
                <div class="address-item-title">Магазин в Москве
                  ул. Ткацкая, 5 стр. 16
                </div>
                <NuxtLink to="tel:+74994061587" class="address-item-special">+7 (499) 406 15 87</NuxtLink>
              </div>
              <div class="address-item">
                <div class="address-item-title">Магазин в Санкт-Петербурге ул. Фрунзе, 2</div>
                <NuxtLink to="tel:+74994061587" class="address-item-special">+7 (499) 406 15 87</NuxtLink>
              </div>
              <div class="address-item">
                <div class="address-item-title">Магазин в Краснодаре
                  ул. Восточно-Кругликовская, 86
                </div>
                <NuxtLink to="tel:78005055461" class="address-item-special">+ 7 (800) 505 54 61</NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-policy">
          <div class="footer-policy-item">
            <NuxtLink>Реквизиты</NuxtLink>
            <NuxtLink>Политика конфиденциальности</NuxtLink>
          </div>
          <div class="footer-policy-item">
            <div class="pay">
              <div class="pay-item">
                <NuxtImg src="Gpay.png"></NuxtImg>
              </div>
              <div class="pay-item">
                <NuxtImg src="Apay.png"></NuxtImg>
              </div>
              <div class="pay-item">
                <NuxtImg src="visa.png"></NuxtImg>
              </div>
              <div class="pay-item">
                <NuxtImg src="master.png"></NuxtImg>
              </div>
              <div class="pay-item">
                <NuxtImg src="maestro.png"></NuxtImg>
              </div>
              <div class="pay-item">
                <NuxtImg src="webmoney.png"></NuxtImg>
              </div>
              <div class="pay-item">
                <NuxtImg src="qiwi.png"></NuxtImg>
              </div>
            </div>
            <NuxtLink>
              <Icon name="mdi:telegram"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.footer-wrapper {
  background: #F4F7FB;
}

.footer {
  padding: 46px 0 23px;

  &-policy {
    margin: 30px 0 0;
    border-top: 1px solid rgba(93, 108, 123, 0.67);
    padding: 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media @md {
      flex-direction: column;
    }

    a {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      color: @gray;
      cursor: pointer;
      text-decoration: none;

    }

    .pay {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 37px 0 0;

      &-item {

      }
    }

    &-item:first-child {

      a:last-child {
        margin: 0 0 0 40px;
      }
    }

    &-item:last-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media @md {
        margin: 20px 0 0;
      }
      a {
        margin: 0;
        font-size: 1.2em;
      }
    }
  }

  &-logo {
    color: @black;
    font-weight: 700;
    font-size: 1.875em;
    line-height: 43px;
    text-transform: uppercase;
    text-decoration: none;
  }

  &-body {
    display: flex;
    justify-content: space-between;
    @media @lg {
      flex-direction: column;
    }

    &-item {
      @media @lg {
        margin: 40px 0 0;
      }

      h6 {
        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
        color: @black;
      }

      ul {
        padding: 0;
        columns: 2;
        -webkit-columns: 2;
        -moz-columns: 2;
        margin-bottom: 0;

        li {
          margin: 10px 0 0;
          list-style-type: none;

          a {
            text-decoration: none;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: @gray;
          }
        }

        li:first-child {
          margin: 0;
        }

      }

      .address {
        display: flex;
        flex-wrap: wrap;
        margin: -28px 0 0 -40px;

        a {
          text-decoration: none;
          display: block;
        }

        &-item {
          margin: 28px 0 0 40px;
          max-width: 144px;

          .bold {
            font-weight: 500;
            font-size: 16px;
            line-height: 23px;
          }

          &-title {
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: @black;
          }

          &-special {
            display: block;
            margin: 8px 0 0;
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;
            color: @gray;
          }
        }
      }
    }

    &-item:last-child {
      width: 40%;
      @media @lg {
        width: 100%;
      }

      h6 {
        margin: 0 0 17px 0;
      }
    }

    &-item:first-child {
      @media @lg {
        margin: 0;
      }
    }
  }
}
</style>