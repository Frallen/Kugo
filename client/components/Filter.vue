<template>
  <div class="filter">
    <Form @submit="onSubmit" v-slot="{ setFieldValue, setValues }" :initial-values="formValues">
      <div class="filter-item">
        <h6>Цена</h6>
        <Field name="price" type="text" hidden>
        </Field>
        <RangeSlider :min="minMax[0]" :max="minMax[1]"
                     @submitEvent="e=> {setFieldValue('price',e),submitButton.click()}"></RangeSlider>
      </div>
      <ClientOnly>
        <div class="filter-item">
          <h6>Тип</h6>
          <ul class="filter-item-list">
            <li v-for="item in Filter.attributes.type_products.data" :key="item.id">
              <label class="checkbox">
                <Field name="type_product" @change.prevent="submitButton.click()"
                       type="checkbox" :value="item.attributes.Title"
                       :checked="query.type_product=== item.attributes.Title&&true"
                >

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
            <li v-for="item in Filter.attributes.user_types.data" :key="item.id">
              <label class="checkbox">
                <Field name="user_type"
                       type="checkbox" :value="item.attributes.Title"
                       :checked="query.user_type=== item.attributes.Title&&true"
                       @change="submitButton.click()">
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
        <ul class="filter-item-list" v-if="Filter.attributes.Weight">
          <li v-for="item in Filter.attributes.Weight" :key="item.id">
            <label class="radio">
              <Field name="weight"
                     type="radio" :value="item.Value"
                     :checked="query.weight === item.Value"
                     @change="submitButton.click()">
              </Field>
              <span class="icon"></span>
              <span class="text">{{ item.Title }}</span>
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

const {Filter} = storeToRefs(useCatalog())
const {query} = useRoute()
let minMax = useState<[min: number, max: number]>()

minMax.value = query.price ? checkQueryPrice(query.price as string) : [Filter.value.attributes.minPrice, Filter.value.attributes.maxPrice]

const emit = defineEmits<{ (e: "filters", Filters: responseFilterType): void }>()

const formValues = useState<responseFilterType>();
formValues.value = {
  type_product: query.type_product as [string],
  user_type: query.user_type as [string],
  weight: query.weight as string,
}


const submitButton = useState<HTMLButtonElement>()


const onSubmit = (values: responseFilterType) => {
  emit("filters", values);
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