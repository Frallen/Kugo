<template>
    <div class="container">
        <div class="cart">
            <h5 class="cart-title">Моя корзина <span>2 товара</span></h5>
            <div class="cart-wrapper">
                <template v-if="Cart.data">
                    <div class="cart-table">
                        <div class="cart-header">
                            <div class="cart-header-item">Товар</div>
                            <div class="cart-header-item">Количество</div>
                            <div class="cart-header-item">Сумма</div>
                            <div class="cart-header-item delete-all">Удалить все</div>
                        </div>
                        <div class="cart-orders">
                            <div class="cart-orders-item" v-for="item in Cart.data" :key="item.id">
                                <div class="order-info">
                                    <div class="order-info-img">
                                        <NuxtImg
                                                provider="cloudinary"
                                                :src="item.attributes.images.data[0].attributes.url"
                                        ></NuxtImg>
                                    </div>
                                    <div class="order-info-text">
                                        <h5>{{ item.attributes.Title }}</h5>
                                        <Available></Available>
                                    </div>
                                </div>
                                <Counter></Counter>
                                <div class="order-price">{{ item.attributes.Price }} ₽</div>
                                <div class="order-delete">
                                    <Icon name="ph:trash-simple-bold" class="icon"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-result">
                        <div class="cart-result-title">Итого</div>

                    </div>
                </template>
                <div v-else class="cart-wrapper-empty">
                    <NuxtImg src="empty.png"></NuxtImg>
                    <h5>Ваша корзина пуста</h5>
                    <p>Добавьте в нее товары из каталога</p>
                    <NuxtLink to="/catalog" class="button button-primary">Перейти в каталог</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const {Cart} = storeToRefs(useCatalog())
const {cartOrders, clearDeals} = useCatalog()
await cartOrders()


onBeforeMount(() => {
    clearDeals()
})
</script>

<style scoped lang="less">
.cart {
  margin: 80px 0 100px;


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
      position: fixed;
      width: 100%;
      bottom: 0;
      left: 0;
      top: initial;
    }

    &-title {
      font-size: 1.5em;
      font-weight: 600;
      line-height: 17px;
      color: @black;
    }
  }

  &-header, .cart-orders-item {
    display: grid;
    grid-template-columns: 40%  120px 15% 10%;
    justify-content: space-between;
    text-align: center;
    @media @xl {

    }
  }

  &-header, &-orders {
    @media @lg {
      white-space: nowrap;
      min-width: 600px;
    }
  }

  &-header {
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

    &-item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid @gray;
      padding: 0 0 40px 0;
      margin: 40px 0 0 0;

      .order-price {
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: @black;
      }

      .order-delete {
        text-align: center;
        cursor: pointer;
        font-size: 1.2em;
      }

      .order-info {
        display: flex;
        align-items: center;


        &-text {
          margin: 0 0 0 20px;

          h5 {
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            color: @black;
            margin: 0 0 10px 0;
          }
        }

        &-img {
          width: 75px;
          height: 75px;
          min-width: 75px;
          min-height: 75px;
          .br(10px);
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: scale-down;
          }
        }
      }
    }


  }
}
</style>