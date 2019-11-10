<template>
  <div class="swiper-container" :id="config.id">
    <div class="swiper-wrapper">
      <!-- <div class="swiper-slide">Slide 1</div>  -->
      <slot></slot>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination" v-if="config.info.pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  props: ["config"], //props 当属性变量使用 this.xxx
  mounted() {
    this.$nextTick(() => {
      new Swiper("#" + this.config.id, this.config.info);
    });
  },
};
</script>
<style lang="scss">
html{
  height: 100%;
}
ul,
li {
  list-style-type: none;
}
.swiper-container {
  height: 200px;
}
.swiper-pagination-bullet-active {
  background: #fff;
}
.jg-gonggao {
  width: r(375.33);
  height: r(199.02);
  .jg-gonggao1 {
    width: r(345.31);
    height: r(66);
    margin: 0 auto;
    padding-top: r(10);
  }
  .jg-gonggao2 {
    width: r(345.31);
    height: r(88);
    margin: 0 auto;
    padding-top: r(10);
  }
}
.jg-text-z {
  width: r(101.33);
  height: r(66);
  float: left;
  font-size: r(14);
  line-height: r(20);
}
.jg-text-y {
  width: r(243.91);
  height: r(66);
  float: left;
  font-size: r(14);
  line-height: r(20);
  color: rgb(174, 170, 170);
}
</style>
