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
                <NuxtLink :to="`/catalog/${item.attributes.category.data.attributes.Slug}/${item.id}`">
                    {{ item.attributes.Title }}
                </NuxtLink>
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
            <input name="count" type="number" v-model="count"/>
            <div class="counter-plus counter-button" @click.prevent="count++">
                <Icon
                        name="ic:sharp-plus"
                        class="icon"
                />
            </div>
        </div>
        <div class="order-price">{{ item.attributes.OrderPrice }} ₽</div>
        <div class="order-delete" @click.stop.prevent="Delete">
            <Icon name="ph:trash-simple-bold" class="icon"
            />
        </div>
        <div class="order-service" v-if="item.attributes.OrderService">
            <div class="order-service-item" v-for="p in item.attributes.OrderService"
                 @click="removeService(p.Name)">
                <span>{{ p.Name }}:</span>
                {{ p.Title }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {Field} from "vee-validate"
import {DetailItemType, sessionType} from "~/types/catalog.types";
import AvailableIcon from "~/components/AvailableIcon.vue";
import {clearSessionCart, clearSessionDiscount} from "~/composables/mixins";

const {deleteFromCookie, cartOrders, DeleteService} = useCart()


interface propsType {
    item: DetailItemType
}

const {item} = defineProps<propsType>()
const count = ref<number>(1)

const Sum = ref<number>(item.attributes.OrderPrice ?? item.attributes.Price)

const emit = defineEmits<{
    (e: "localSum", localSum: sessionType): void,
    (e: "localDiscount", localDiscount: sessionType): void
}>()

watch(count, () => {
    pullUp()
})
const calculatedService = computed<number>(() => {
    if (item.attributes.OrderService) {
        return item.attributes.OrderService.reduce(
            (total, item) => item.Price + total,
            0
        )
    } else return 0;
})

const pullUp = () => {
    emit("localSum", {id: item.id, Price: Sum.value * count.value + calculatedService.value})
    item.attributes.oldPrice && emit("localDiscount", {
        id: item.id,
        Price: item.attributes.oldPrice - item.attributes.Price
    })

}
pullUp()

const Delete = () => {
    Confirm(
        "Удалить товар из корзины?",
    ).then(async (result: any) => {
        if (result.isConfirmed) {

            await deleteFromCookie(item.id).then(async () => {
                await cartOrders()
            })
            clearSessionCart(item.id)
            pullUp()
        }
    });
}
const removeService = (Name: string) => {
    Confirm(
        "Удалить данную услугу?",
    ).then(async (result: any) => {
        if (result.isConfirmed) {
            await DeleteService(item.id, item.attributes.Price, Name).then(async () => await cartOrders())
            clearSessionDiscount(item.id)
            pullUp()
        }
    });
}
</script>

<style scoped lang="less">
.cart-orders-item {
  border-bottom: 1px solid @gray-light;
  padding: 0 0 40px 0;
  margin: 40px 0 0 0;

  .order-service {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    grid-area: service;
    .br(5px);
    padding: 34px 0 0;
    margin: -10px 0 0 -10px;

    &-item {
      cursor: pointer;
      margin: 10px 0 0 10px;
      border: 1px solid @gray-light;
      .br(10px);
      padding: 5px 18px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: @black;
      .trs(0.2s);

      span {
        color: @gray;
      }
    }

    &-item:hover {
      opacity: 0.6;
      .trs(0.2s);
    }
  }

  .order-price {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: @black;
    grid-area: price;
  }

  .order-delete {
    grid-area: delete;
    text-align: center;
    cursor: pointer;
    font-size: 1.2em;
  }

  .order-info {
    display: flex;
    align-items: center;
    grid-area: info;

    &-text {
      margin: 0 0 0 20px;

      a {
        text-decoration: none;
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
  grid-area: counter;
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