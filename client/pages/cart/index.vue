<template>
    <div class="container">
        <div class="cart">
            <div class="cart-table">
                <div class="cart-header"></div>
                <div class="cart-table-wrapper">

                </div>
            </div>
            <div class="cart-result">
                <div class="cart-result-title">Итого</div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.cart {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 100px;
  @media @lg {
    flex-direction: row-reverse;
  }

  &-table {

  }

  &-result {
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
}
</style>