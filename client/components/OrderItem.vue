<template>
    <div class="cart-orders-item">
        <div class="order-info">
            <div class="order-info-img">
                <NuxtImg
                        provider="cloudinary"
                        :src="item.attributes.images.data[0].attributes.url"
                ></NuxtImg>
            </div>
            <div class="order-info-text">
                <h5>{{ item.attributes.Title }}</h5>
                <AvailableIcon></AvailableIcon>
            </div>
        </div>
        <div class="counter">
            <div class="counter-minus counter-button" @click.prevent="count>1&&count--">
                <Icon
                        name="ic:sharp-minus"
                        class="icon"
                />
            </div>
            <Field name="count" type="number" v-model="count"/>
            <div class="counter-plus counter-button" @click.prevent="count++">
                <Icon
                        name="ic:sharp-plus"
                        class="icon"
                />
            </div>
        </div>
        <div class="order-price">{{ item.attributes.Price }} ₽</div>
        <div class="order-delete" @click.stop.prevent="Delete">
            <Icon name="ph:trash-simple-bold" class="icon"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {Field} from "vee-validate"
import {DetailItemType} from "~/types/catalog.types";
import AvailableIcon from "~/components/AvailableIcon.vue";

const {deleteFromCookie,cartOrders} = useCatalog()

const count = ref<number>(1)
const emit = defineEmits<{ (e: "count", Count: number): void }>()
watch(count, () => {
    emit("count", count.value)
})

interface propsType {
    item: DetailItemType
}

const {item} = defineProps<propsType>()

const Delete = () => {
    Confirm(
        "Удалить товар из корзины?",
    ).then((result: any) => {
        if (result.isConfirmed) {
            deleteFromCookie(item.id).then(()=>cartOrders())
        }
    });
}

</script>

<style scoped lang="less">
.cart-orders-item {
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

.counter {
  background: #F4F7FB;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 15px 17px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    background: none;
    border: none;
    outline: none;
    width: 46px;
    text-align: center;
    padding: 0 2px;
  }

  &-button {
    cursor: pointer;
    font-size: 1.4em;
    color: @gray;
    user-select: none;
  }
}
</style>