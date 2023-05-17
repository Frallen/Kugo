<template>
  <div class="container">
    <Form @submit="" v-slot="{ setFieldValue, setValues }" :initial-values="formValues" class="cart">
      <h5 class="cart-title">Моя корзина <span>2 товара</span></h5>
      <div class="cart-wrapper">
        <template v-if="Cart.data">
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
                           @localSum="fillCartStorage"
                           @localDiscount="fillDiscountStorage"
                ></OrderItem>
              </transition-group>
            </div>
          </div>
          <div class="cart-result">
            <div class="cart-result-title">Итого:</div>
            <div class="cart-result-price">{{ Sum }} ₽</div>
            <div class="cart-result-total">
              <!-- <div class="total-item">{{ Discount }}₽</div>-->
              <div class="total-item" v-if="Discount>0">Сумма скидки <span>{{ Discount }} ₽</span></div>
              <div class="total-item">Итого без учета доставки <span>{{ Sum }} ₽</span></div>
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
        </template>
        <div v-else class="cart-wrapper-empty">
          <NuxtImg src="empty.png"></NuxtImg>
          <h5>Ваша корзина пуста</h5>
          <p>Добавьте в нее товары из каталога</p>
          <NuxtLink to="/catalog" class="button button-primary">Перейти в каталог</NuxtLink>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import {useSessionStorage} from "@vueuse/core";
import {Field, Form} from "vee-validate";
import {sessionType} from "~/types/catalog.types";

const {Cart} = storeToRefs(useCart())
const {cartOrders, clearCart} = useCart()
const {clearDeals} = useCatalog()
await cartOrders()

const formValues = useState();
formValues.value = {
  policy: true
}


const sessionCart = useSessionStorage("cart", [] as sessionType[])
const sessionDiscount = useSessionStorage("discount", [] as sessionType[])
const Sum = ref<number>(sessionCart.value.reduce(
    (total, item) => item.Price + total,
    0
))

watch(sessionCart, () => {
  Sum.value = sessionCart.value.reduce(
      (total, item) => item.Price + total,
      0
  )
})

const Discount = ref<number>(sessionDiscount.value.reduce(
    (total, item) => item.Price + total,
    0
))
watch(sessionDiscount, () => {
  Discount.value = sessionDiscount.value.reduce(
      (total, item) => item.Price + total,
      0
  )
})

const fillCartStorage = (data: sessionType) => {
  if (sessionCart.value.some(p => p.id === data.id)) {
    sessionCart.value.map(p => {
      if (p.id === data.id) {
        p.Price = data.Price
      }
    })

  } else {
    sessionCart.value.push({
      id: data.id,
      Price: data.Price
    })
  }
}


const fillDiscountStorage = (data: sessionType) => {
  if (sessionDiscount.value.some(p => p.id === data.id)) {

    sessionDiscount.value.map(p => {
      if (p.id === data.id) {
        p.Price = data.Price
      }
    })
  } else {
    sessionDiscount.value.push({
      id: data.id,
      Price: data.Price
    })

  }

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

onBeforeMount(() => {
  clearDeals()
})
</script>

<style scoped lang="less">
.cart {
  margin: 80px 0 100px;
  @media @md {
    margin: 30px 0 10px;
  }

  &-title {
    font-weight: 600;
    font-size: 35px;
    line-height: 51px;
    text-transform: uppercase;
    color: @black;

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: @gray;
      display: block;
      margin: 10px 0 0 0;
    }
  }

  &-wrapper {
    margin: 41px 0 0 0;
    display: flex;
    justify-content: space-between;
    @media @lg {
      flex-direction: column;
    }

    &-empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: #F4F7FB;
      .br(10px);
      width: 100%;
      padding: 45px 0;

      .button {
        margin: 25px 0 0 0;
      }

      h5 {
        font-weight: 600;
        font-size: 25px;
        line-height: 36px;
        text-transform: uppercase;
        color: @black;
        margin: 25px 0 10px 0;
      }

      p {
        font-weight: 400;
        font-size: 14px;
        color: @black;
        line-height: 20px;
        padding: 0;
        margin: 0;
      }
    }
  }


  &-table {
    width: 75%;
    @media @lg {
      width: 100%;
      overflow: auto;
    }
  }


  &-result {
    width: 20%;
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

        span {
          font-weight: 500;
          font-size: 16px;
          line-height: 23px;
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