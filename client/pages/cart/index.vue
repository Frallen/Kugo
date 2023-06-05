<template>
  <div class="container">
      <Form @submit="" v-slot="{ setFieldValue, setValues }" :initial-values="formValues" class="cart">
        <div class="cart-wrapper">
          <template v-if="Cart">
            <div class="cart-table">
              <div class="cart-header">
                <div class="cart-header-item">Товар</div>
                <div class="cart-header-item">Количество</div>
                <div class="cart-header-item">Сумма</div>
                <div class="cart-header-item delete-all" @click.stop="clearAll()">Удалить все</div>
              </div>
              <div class="cart-orders">
                <transition-group name="fade">
                  <OrderItem :item="item" v-for="item in Cart.data"
                             :key="item.id"
                  ></OrderItem>
                </transition-group>
              </div>
            </div>
            <ClientOnly>
              <div class="cart-result">
                <div class="cart-result-title">Итого:</div>
                <div class="cart-result-price">{{ calcSession(sessionCart) }} ₽</div>
                <div class="cart-result-total">
                  <!-- <div class="total-item">{{ calculatedDiscount }}₽</div>-->
                  <div class="total-item" v-if="calcSession(sessionDiscount)>0">Сумма скидки
                    <span>{{ calcSession(sessionDiscount) }} ₽</span>
                  </div>
                  <div class="total-item">Итого без учета доставки <span>{{ calcSession(sessionCart) }} ₽</span></div>
                </div>
                <button type="submit" class="button button-primary">Оформить заказ</button>
                <label class="checkbox">
                  <Field name="policy"
                         type="checkbox" checked :value="true">
                  </Field>
                  <span class="icon"></span>
                  <span class="text">Нажимая на кнопку, вы соглашаетесь на обработку персональных данных и
                                <NuxtLink to="/" target="_blank">политикой конфиденциальности</NuxtLink> </span>
                </label>
              </div>
            </ClientOnly>
          </template>
          <Empty v-else :title="'Ваша корзина пуста'" :text="'Добавьте в нее товары из каталог'"></Empty>
        </div>
      </Form>
  </div>
</template>

<script setup lang="ts">
import {Field, Form} from "vee-validate";

const {Cart, sessionDiscount, sessionCart} = storeToRefs(useCart())
const {cartOrders, clearCart} = useCart()

await cartOrders()

const formValues = useState();
formValues.value = {
  policy: true
}

const clearAll = () => {
  Confirm(
      "Очистить корзину?",
  ).then((result: any) => {
    if (result.isConfirmed) {
      clearCart()
    }
  });
}
definePageMeta({
  breadcrumb: "Корзина",
  Title: "Корзина"
})
</script>

<style scoped lang="less">
.cart {


  &-wrapper {
    margin: 41px 0 0 0;
    display: flex;
    justify-content: space-between;
    @media @lg {
      flex-direction: column;
    }


  }


  &-table {
    width: 70%;
    @media @lg {
      width: 100%;
      overflow: auto;
    }
  }


  &-result {
    width: 25%;
    background: #F4F7FB;
    .br(5px);
    padding: 20px;
    height: fit-content;
    position: sticky;
    top: 0;
    @media @lg {
      position: relative;
      width: 100%;
      margin: 30px 0 0;
    }

    .button {
      margin: 20px 0 15px;
      width: 100%;
    }

    &-title {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      color: @black;
    }

    .checkbox {
      align-items: flex-start;
      justify-content: space-between;

      .text {
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;

        a {
          color: @purple;
          text-decoration: none;
        }
      }

    }

    &-price {
      font-weight: 600;
      font-size: 25px;
      line-height: 36px;
      margin: 11px 0;
      text-transform: uppercase;
    }

    &-total {
      padding: 18px 0;
      border-top: 1px solid @gray-light;
      border-bottom: 1px solid @gray-light;

      .total-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        color: @black;
        white-space: break-spaces;

        span {
          font-weight: 500;
          font-size: 16px;
          line-height: 23px;
          white-space: nowrap;
        }
      }

    }
  }

  &-header, .cart-orders-item {
    display: grid;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    @media @xl {

    }
  }

  .cart-orders-item {
    grid-template-columns: 40%  120px 15% 10%;
    grid-template-areas:
        "info counter price delete"
        "service service service service ";
    grid-template-rows:auto;
  }

  &-header, &-orders {
    @media @lg {
      white-space: nowrap;
      min-width: 600px;
    }
  }

  &-header {
    grid-template-columns: 40%  120px 15% 10%;
    background: #F4F7FB;
    padding: 11px 21px;
    .br(5px);
    user-select: none;

    .delete-all {
      cursor: pointer;
    }

    &-item {
      font-weight: 500;
      font-size: 13px;
      line-height: 17px;
      color: @black;
    }

    &-item:first-child {
      text-align: left;
    }
  }

  &-orders {
    display: flex;
    flex-direction: column;


  }
}
</style>