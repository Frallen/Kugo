<template>
    <div class="filter">
        <Form @submit="onSubmit">
            <div class="filter-item">
                <h6>Цена</h6>
                <RangeSlider :min="minMax[0]" :max="minMax[1]" @submitEvent="e=>minMax=e"></RangeSlider>
            </div>
            <ClientOnly>
                <div class="filter-item">
                    <h6>Тип</h6>
                    <ul class="filter-item-list">
                        <li v-for="item in type_product" :key="item.id">
                            <label class="checkbox">
                                <Field name="type_product" @change="submitButton.click()"
                                       type="checkbox" :value="item.attributes.Title">

                                </Field>
                                <span class="icon"></span>
                                <span class="text">{{ item.attributes.Title }}</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="filter-item">
                    <h6>Для кого</h6>
                    <ul class="filter-item-list">
                        <li v-for="item in user_types" :key="item.id">
                            <label class="checkbox">
                                <Field name="user_type"
                                       type="checkbox" :value="item.attributes.Title" @change="submitButton.click()">
                                </Field>
                                <span class="icon"></span>
                                <span class="text">{{ item.attributes.Title }}</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </ClientOnly>
            <div class="filter-item">
                <h6>Вес</h6>
                <ul class="filter-item-list">
                    <li>
                        <label class="radio">
                            <Field name="weight"
                                   type="radio" :value="15" @change="submitButton.click()">
                            </Field>
                            <span class="icon"></span>
                            <span class="text">Легкие (до 15 кг)</span>
                        </label>
                    </li>
                    <li>
                        <label class="radio">
                            <Field name="weight"
                                   id="weight"
                                   type="radio" :value="[15,30]" @change="submitButton.click()">
                            </Field>
                            <span class="icon"></span>
                            <span class="text">Средние (15-30 кг)</span>
                        </label>
                    </li>
                    <li>
                        <label class="radio">
                            <Field name="weight"
                                   id="weight"
                                   type="radio" :value="30" @change="submitButton.click()">
                            </Field>
                            <span class="icon"></span>
                            <span class="text">Тяжелые (свыше 30 кг)</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div class="filter-item"></div>
            <button type="submit" hidden="hidden" ref="submitButton"></button>
        </Form>
    </div>
</template>

<script setup lang="ts">
import {Form, Field} from "vee-validate"
import {responseFilterType} from "~/types/catalog.types";

let minMax = useState<[min: number, max: number]>(() => [0, 30000])
const emit = defineEmits<{ (e: "Filters", Filers: responseFilterType): void }>()

watch(minMax, () => {

})

const submitButton = useState<HTMLButtonElement>()
const {type_product, user_types} = useCatalog()


const onSubmit = (values: responseFilterType) => {
    emit("Filters", values);
}

</script>

<style lang="less" scoped>
.filter {
  position: sticky;
  top: 0;
  background: #F4F7FB;
  .br(10px);
  padding: 20px;
  height: fit-content;
  @media @lg {
    position: relative;
    padding: 2em;
  }

  &-item {
    margin: 25px 0 0 0;


    h6 {
      font-weight: 500;
      font-size: 1.125em;
      line-height: 26px;
      color: @black;
      margin: 0 0 16px 0;
    }

    &-list {
      padding: 0;

      li {
        list-style-type: none;
        margin: 10px 0 0 0;

        label {
          position: relative;
          display: flex;
          align-items: center;
          cursor: pointer;

          input {
            width: 0;
            visibility: hidden;
            opacity: 0;
          }

          .text {
            margin: 0 0 0 10px;
          }
        }

        .checkbox {
          input:checked + .icon {
            background: url("/checkbox-checked.png");
            .trs(0.3s);
          }

          .icon {
            background: url("/checkbox.png");
            background-repeat: no-repeat;
            .trs(0.3s);
          }
        }

        .radio {
          input:checked + .icon {
            background: url("/radio-checkbox-checked.png");
            .trs(0.3s);
          }

          .icon {
            .br(10px);
            .trs(0.3s);
            background: url("/radio-checkbox.png");
            background-repeat: no-repeat;
          }
        }

        .icon {
          height: 16px;
          width: 16px;
          min-width: 16px;
          min-height: 16px;
        }

      }

      li:first-child {
        margin: 0;
      }
    }
  }


  &-item:first-child {
    margin: 0;
  }

}
</style>