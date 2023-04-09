<template>
    <div class="filter">
        <div class="filter-item">
            <h6>Цена</h6>

            <RangeSlider :min="0" :max="30000" @submitEvent="e=>minMax=e" ></RangeSlider>


        </div>
        <div class="filter-item">
            <h6>Тип</h6>
            <ul class="filter-item">
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div class="filter-item"></div>
        <div class="filter-item"></div>
    </div>
</template>

<script setup lang="ts">

let minMax = useState<[min:number, max:number]>(()=>[0,3000])



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

  }

  &-item:first-child {
    margin: 0;
  }
}
</style>