<template>
    <div class="stock-wrapper">
        <div class="container">
            <div class="stock">
                <div class="stock-img">
                    <NuxtImg src="delivery.png"></NuxtImg>
                </div>
                <div class="stock-content">
                    <div class="badge">Акция</div>
                    <h2>Бесплатная доставка электросамокатов по России до 01.09</h2>
                    <NuxtLink to="" class="button button-white">Подробнее</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">

.stock-wrapper {
  background: radial-gradient(76.7% 707.77% at 23.3% 72.57%, #595959 0%, #3B3E46 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  margin: 50px 1em;
  .br(10px);
  @media @md {
    margin: 0;
    .br(0);
  }
}

.stock {
  overflow: hidden;

  display: flex;
  justify-content: space-evenly;
  @media @lg {
    flex-direction: column-reverse;
    align-items: center;
  }

  &-content {
    width: 35%;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    @media @lg {
      width: 100%;
    }
    @media @md {
      padding: 30px 0;
    }

    .button {
      margin: 27px 0 0;
      @media @lg {
        align-self: flex-end;
      }
    }
  }

  &-img {
    width: 65%;
    @media @lg {
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .badge {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    padding: 3px 13px;
    width: fit-content;
    .br(5px);
    color: #fff;
    background: #EE685F;
  }
}
</style>