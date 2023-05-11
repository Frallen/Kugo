<template>
    <div class="container">
        <div class="cart">
            <h5 class="cart-title">Моя корзина <span>2 товара</span></h5>
            <div class="cart-wrapper">
                <div class="cart-table">
                    <div class="cart-header">
                        <div class="cart-header-item">Товар</div>
                        <div class="cart-header-item">Количество</div>
                        <div class="cart-header-item">Сумма</div>
                        <div class="cart-header-item">Удалить все</div>
                    </div>
                    <div class="cart-orders">
                        <div class="cart-orders-item"></div>
                        <div class="cart-orders-item"></div>
                        <div class="cart-orders-item"></div>
                    </div>
                </div>
                <div class="cart-result">
                    <div class="cart-result-title">Итого</div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.cart {
  margin: 80px 0 100px;
  @media @lg {
    flex-direction: row-reverse;
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
  }


  &-table {
    width: 75%;
  }

  &-result {
    width: 20%;
    background: #F4F7FB;
    .br(5px);
    padding: 20px;

    &-title {
      font-size: 1.5em;
      font-weight: 600;
      line-height: 17px;
      color: @black;
    }
  }

  &-header {
    display: grid;
    grid-template-columns: 1fr 106px 106px 66px;
    background: #F4F7FB;
    padding: 11px 21px;
    .br(5px);

    &-item {
      font-weight: 500;
      font-size: 12px;
      line-height: 17px;
      color: @black;
    }
  }

  &-orders {
    display: grid;
    grid-template-columns: 1fr 106px 106px 66px;

    &-item {

    }
  }
}
</style>