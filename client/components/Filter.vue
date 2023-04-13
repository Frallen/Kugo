<template>
    <div class="filter">
        <div class="filter-item">
            <h6>Цена</h6>
            <RangeSlider :min="0" :max="30000" @submitEvent="e=>minMax=e"></RangeSlider>
        </div>
        <ClientOnly>
            <div class="filter-item">
                <h6>Тип</h6>
                <ul class="filter-item-list">
                    <li v-for="item in type_product" :key="item.id">
                        <label class="checkbox">
                            <input type="checkbox">
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
                            <input type="checkbox">
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
                        <input type="radio" name="weight">
                        <span class="icon"></span>
                        <span class="text">Легкие (до 15 кг)</span>
                    </label>
                </li>
                <li>
                    <label class="radio">
                        <input type="radio" name="weight">
                        <span class="icon"></span>
                        <span class="text">Средние (15-30 кг)</span>
                    </label>
                </li>
                <li>
                    <label class="radio">
                        <input type="radio" name="weight">
                        <span class="icon"></span>
                        <span class="text">Тяжелые (свыше 30 кг)</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="filter-item"></div>
    </div>
</template>

<script setup lang="ts">

let minMax = useState<[min: number, max: number]>(() => [0, 3000])


const {type_product, user_types, getFilters} = useCatalog()

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