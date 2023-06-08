<template>
  <SliderIndex></SliderIndex>
  <div class="container">
    <div class="features">
      <h3>Проведем диагностику
        и отремонтируем любую неисправность</h3>
      <div class="features-box">
        <div class="features-list">
          <div class="features-list-item text-right">
            <h6>Ремонт от 1 дня</h6>
            <p>Устраним любую неисправность. Обычно делаем это за 1-3 дня, если ремонт сложный — предупредим
              заранее.</p>
          </div>
          <div class="features-list-item text-right">
            <h6>Ремонтируем только то, что сломалось</h6>
            <p>Не навязываем услуги, диагностируем
              и заранее обговариваем стоимость ремонта.</p>
          </div>
          <div class="features-list-item text-right">
            <h6>Оригинальные запчасти</h6>
            <p>Благодаря прямой связи с производителем имеем в наличии все необходимые новые комплектующие для
              ремонта.</p>
          </div>
        </div>
        <div class="features-video">
          <video playsinline preload="metadata" ref="player" class="" @click.stop="playerState(false)">
            <source src="services.mp4" type="video/mp4">
          </video>
          <NuxtImg class="icon" src="play.svg" ref="playButton" @click.stop="playerState(true)"
                   v-show="isVisiblePlayButton"></NuxtImg>
        </div>
        <div class="features-list">
          <div class="features-list-item text-left">
            <h6>гарантия</h6>
            <p>14 дней на ремонт</p>
          </div>
          <div class="features-list-item text-left">
            <h6>беслаптный ремонт</h6>
            <p>в течение 1 года после покупки</p>
          </div>
          <div class="features-list-item text-left">
            <h6>расширенная гарантия</h6>
            <p>до 36 месяцев</p>
          </div>
        </div>
      </div>
    </div>
    <div class="price">
      <div class="price-head">
        <h3>Стоимость ремонта</h3>
        <p>Точную стоимость работ вам озвучит специалист сервисного центра после диагностики. Примерные цены на ремонт
          без учета запчастей смотрите ниже.</p>
      </div>
      <div class="price-list">
        <div class="price-list-item button button-outlined">Электросамокаты
          <span>от 1500 руб.</span>
        </div>
        <div class="price-list-item button button-outlined">Электровелосипеды
          <span>от 1800 руб.</span>
        </div>
        <div class="price-list-item button button-outlined">Робот-пылесосы
          <span>от 1800 руб.</span>
        </div>
        <div class="price-list-item button button-outlined">Весы
          <span>от 800 руб.</span>
        </div>
      </div>
      <button @click.stop="ServiceModalChanger(true)" class="button button-primary">Заказать ремонт</button>
    </div>
  </div>
  <div class="online-wrapper">
    <div class="container">
      <div class="online">
        <div class="online-image">
          <NuxtImg src="zoom.png"></NuxtImg>
        </div>
        <div class="online-text">
          <div class="badge">Услуга</div>
          <div class="online-title">Определим причину неисправности удаленно или на диагностике!</div>
          <button class="button" @click.stop="ServiceModalChanger(true)">Записаться на диагностику</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="price">
      <div class="price-head">
        <h3>Стоимость гидроизоляции и настройки</h3>
        <p>Для версии MAX и VIP гидроизоляция и настройка — бесплатно</p>
      </div>
      <div class="price-list">
        <div class="price-list-item button button-outlined">Гидроизоляция
          <span>3850 руб.</span>
        </div>
        <div class="price-list-item button button-outlined">Настройка
          <span> 1520 руб.</span>
        </div>
        <div class="price-list-item button button-outlined">Гидроизоляция и настройка
          <span> 4500 руб.</span>
        </div>
      </div>
      <button @click.stop="ServiceModalChanger(true)" class="button button-primary">Заказать услугу</button>
    </div>
  </div>
  <Modal :isShow="serviceModalState" @closeModal="ServiceModalChanger(false)">
    <Form @click.stop
          :validation-schema="ServiceSchema()"
          @submit="onSubmit"
          v-slot="{ setFieldValue, setValues }"
          class="form">
      <div class="form-body">
        <label for="Option" class="form-body-item">
          <span class="title">Почта</span>
          <Field name="Option" id="Option" hidden="hidden">
          </Field>
          <Select :options="options" placeholder="" @selectValue="e=> {setFieldValue('Option',e)}"></Select>
          <ErrorMessage name="Option" class="error"/>
        </label>
        <label for="Phone" class="form-body-item">
          <span class="title">Почта</span>
          <Field
              name="Phone"
              id="Phone"
              v-slot="{ valid, meta, field }"
              ref="input"
          >

            <input
                placeholder="7900000000"
                v-bind="field"
                class="input" type="text"
                :class="{ 'input-error': meta.touched && !meta.valid }"
            />
          </Field>
          <ErrorMessage name="Phone" class="error"/>
        </label>
        <button type="submit" class="button button-primary">Записаться на диагностику</button>
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import {SelectFilterType} from "~/types/catalog.types";
import {Form, Field, ErrorMessage} from "vee-validate"

const {ServiceModalChanger, ServiceRequest} = useMain()
const {serviceModalState} = storeToRefs(useMain())
const input = ref<HTMLInputElement>()


definePageMeta({
  breadcrumb: "Сервис",
})
const options: SelectFilterType[] = [
  {
    label: "Ремонт",
    sort: "Ремонт"
  },
  {
    label: "Диагностика",
    sort: "Диагностика"
  },
  {
    label: "Услуги",
    sort: "Услуги"
  }
]
const onSubmit = (values) => {
  ServiceRequest(values)
}

const player = ref<HTMLVideoElement>()
const playButton = ref<HTMLImageElement>()
const isVisiblePlayButton = ref<boolean>(true)


const playerState = (state: boolean) => {
  if (state) {
    isVisiblePlayButton.value = false
    player.value?.play()
  } else {
    isVisiblePlayButton.value = true
    player.value?.pause()
  }
}
onMounted(() => {
  player.value.volume = 0.2
  player.value.addEventListener("ended", () => {
    playerState(false)
  })
})
</script>

<style scoped lang="less">
h3 {
  text-align: center;
  font-weight: 600;
  font-size: 2.188em;
  line-height: 51px;
  @media @md {
    font-size: 1.5em;
  }
}

.features {
  margin: 100px 0 50px 0;


  &-box {
    margin: 70px 0 0;
    display: flex;
    justify-content: space-between;
    @media @lg {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  &-video {
    height: 400px;
    width: 400px;
    min-width: 400px;
    min-height: 400px;
    .br(100%);
    overflow: hidden;
    position: relative;
    @media @lg {
      margin: 2em 0;
    }
    @media @md {
      height: 300px;
      width: 300px;
      min-width: 300px;
      min-height: 300px;
    }

    .icon {
      cursor: pointer;
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      top: 40%;
      @media @md {
        top: 35%;
      }

      img {
      }
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30%;
    padding: 0 10px;
    @media @lg {
      width: 100%;
    }

    &-item {
      @media @lg {
        text-align: center !important;
        margin: 1em 0 0;
      }

      h6 {
        font-weight: 700;
        font-size: 20px;
        line-height: 29px;
        text-transform: uppercase;

      }

      p {
        padding: 0;
        margin: 0;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: @black;
      }
    }

    &-item:first-child {
      @media @lg {
        margin: 0;
      }
    }
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }
}

.price {
  &-head {
    margin: 0 0 45px;

    h3 {
      margin: 0 0 20px;
    }

    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      text-align: center;
      margin: 0 auto;
      max-width: 635px;
    }
  }

  &-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    margin: -20px 0 0 -20px;

    &-item {
      margin: 20px 0 0 20px;
    }
  }

  .button-primary {
    margin: 30px auto 0;
  }
}

.online-wrapper {
  padding: 70px 1em;
  background: @blue;
  margin: 50px 0;

  .online {
    display: flex;
    justify-content: space-between;
    @media @xl {
      flex-direction: column;
    }

    &-image {
      width: 46%;
      .br(10px);
      overflow: hidden;
      @media @xl {
        width: 100%;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-text {
      width: 46%;
      @media @xl {
        margin: 30px 0 0;
        width: 100%;
      }

      .badge {
        background: @green;
        width: fit-content;
      }

      .button {
        background: #fff;
        color: @blue;
      }
    }

    &-title {
      margin: 27px 0;
      font-weight: 600;
      font-size: 2.188em;
      line-height: 51px;
      text-transform: uppercase;
      color: #fff;
      @media @lg {
        font-size: 1.5em;
      }
      @media @md {
        font-size: 1.2em;
      }
    }
  }
}
</style>