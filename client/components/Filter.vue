<template>
    <div class="filter">
        <div class="filter-item">
            <h6>Цена</h6>
            <RangeSlider :min="0" :max="30000" @submitEvent="e=>minMax=e"></RangeSlider>
        </div>
        <div class="filter-item">
            <h6>Тип продукта</h6>
            <ul class="filter-item-list">
                <li v-for="item in categories" :key="item.id" >
                    <label class="radio" @click.stop="typeProduct=item.attributes.Title">
                        <input type="radio" name="typeProduct" :checked="item.attributes.DefaultCategory">
                        <span class="icon"></span>
                        <span class="text">{{ item.attributes.Title }}</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="filter-item">
            <h6>Тип</h6>
            <ul class="filter-item-list">
                <li>
                    <label class="checkbox">
                        <input type="checkbox">
                        <span class="icon"></span>
                        <span class="text">Внедорожный</span>
                    </label>
                </li>
                <li>
                    <label class="checkbox">
                        <input type="checkbox">
                        <span class="icon"></span>
                        <span class="text">Городской</span>
                    </label>
                </li>
                <li>
                    <label class="checkbox">
                        <input type="checkbox">
                        <span class="icon"></span>
                        <span class="text">Зимний</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="filter-item">
            <h6>Для кого</h6>
            <ul class="filter-item-list">
                <li>
                    <label class="checkbox">
                        <input type="checkbox">
                        <span class="icon"></span>
                        <span class="text">Для взрослого</span>
                    </label>
                </li>
                <li>
                    <label class="checkbox">
                        <input type="checkbox">
                        <span class="icon"></span>
                        <span class="text">Для ребенка</span>
                    </label>
                </li>
                <li>
                    <label class="checkbox">
                        <input type="checkbox">
                        <span class="icon"></span>
                        <span class="text">Для пенсионера</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="filter-item">
            <h6>Вес</h6>
            <ul class="filter-item-list">
                <li>
                    <label class="radio">
                        <input type="radio" name="weight" :value="`weight=${30}`">
                        <span class="icon"></span>
                        <span class="text">Легкие (до 15 кг)</span>
                    </label>
                </li>
                <li>
                    <label class="radio">
                        <input type="radio" name="weight" :value="`weight=${30}`">
                        <span class="icon"></span>
                        <span class="text">Средние (15-30 кг)</span>
                    </label>
                </li>
                <li>
                    <label class="radio">
                        <input type="radio" name="weight" :value="`weight=${30}`">
                        <span class="icon"></span>
                        <span class="text">Тяжелые (свыше 30 кг)</span>
                    </label>
                </li>
            </ul>
        </div>
        <!--  <div class="filter-item" v-show="typeProduct==='Электросамокаты'">
              <ul class="filter-item">
                  <li v-for="item in categories" :key="item.id" @click.stop="typeProduct=item.attributes.Title">
                      <label class="checkbox">
                          <input type="checkbox" name="typeProduct">
                          <span class="icon"></span>
                          <span class="text">{{ item.attributes.Title }}</span>
                      </label>
                  </li>
              </ul>
          </div>-->
        <div class="filter-item"></div>
    </div>
</template>

<script setup lang="ts">

let minMax = useState<[min: number, max: number]>(() => [0, 3000])

const typeProduct = useState<string>()

const {categories, getCategories} = useCatalog()

await getCategories()


</script>

<style lang="less" scoped>
.filter {
  position: sticky;
  top: 0;
  background: #F4F7FB;
  .br(10px);
  padding: 20px;
  @media @sm {
    padding: 10px;
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
            background: url("./public/checkbox-checked.png");
            .trs(0.3s);
          }

          .icon {
            background: url("./public/checkbox.png");
            background-repeat: no-repeat;
            .trs(0.3s);
          }
        }

        .radio {
          input:checked + .icon {
            background: url("./public/radio-checkbox-checked.png");
            .trs(0.3s);
          }

          .icon {
            .br(10px);
            .trs(0.3s);
            background: url("./public/radio-checkbox.png");
            background-repeat: no-repeat;
          }
        }

        .icon {
          height: 16px;
          width: 16px;
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