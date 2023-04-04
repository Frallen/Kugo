<template>
  <div class="item">
    <div class="item-img">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="20"
        :autoplay="{
          delay: 3000,
        }"
        class="slider"
      >
        <Swiper-slide class="slider-item" v-for="item in images"
          ><ClientOnly
            ><NuxtImg
              provider="cloudinary"
              :src="images.attributes.Image.data.attributes.url"
            ></NuxtImg></ClientOnly
        ></Swiper-slide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScooterItemType } from "~/types/catalogTypes";
import { Navigation } from "swiper";

import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
const modules = [Navigation];
const swiper = useSwiper();

let {
  Title,
  weight,
  max_speed,
  power,
  max_range,
  Price,
  discount_percent,
  battery_capacity,
  charge_time,
  wheel_size,
  gabarits,
  maximum_load,
  lighting,
  guarantee,
  type_wheels,
  equipment,
  privod,
  stop_system,
  type,
  user_type,
  images,
  badges,
} = defineProps<ScooterItemType>();
</script>

<style scoped lang="less">
.item {
  border: 1.5px solid #eaebed;
  .br(10px);
}
</style>
