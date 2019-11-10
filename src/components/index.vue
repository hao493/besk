<template>
  <div class="bestcake_box">
    <!-- logo -->
    <div>
      <h3>山西</h3>
    </div>
    <!-- 轮播图组件 -->
    <div class="big_banner" v-if="SwiperBannerList.length!==0">
      <swiper
        :config="{id:'banner',info:{pagination:'.swiper-pagination',autoplay:{
        disableOnlnteraction:false,
      },speed:2000}}"
      >
        <div class="swiper-slide" v-for="(item,index) in SwiperBannerList" :key="index">
          <img class="banner_img" :src="item.ImgUrl" />
        </div>
      </swiper>
    </div>
    <div class="nav_img">
      <img src="https://res.bestcake.com/images/newIndex/title.png?v=1" alt />
    </div>
    <!-- 1.1元起 -->
    <div>
      <img :src="AbsoluteList" alt class="adv_img" />
    </div>

    <!-- 六个小图 -->
    <div class="six_img">
      <div class="six_box" v-for="(item,index) in TopIconList" :key="index">
        <img class="bar_img" :src="item.ImgUrl" />
        <span>{{item.ActName}}</span>
      </div>
    </div>

    <div class="scroll">
      <div class="inform">
        <span class="inform_box">通知</span>
      </div>
      <marquee
        class="inform_scroll"
      >贝思客官方申明：我司近期发现有客户通过非正常渠道售卖的代金卡无法正常使用，目前我司正通过法律途径解决…重申明，从未授权过任何渠道售卖我司代金卡，请客户通过正常渠道（如：官网、公司销售）进行购买消费。</marquee>
    </div>

    <!-- 四个小图 -->
    <div class="four_img">
      <div class="four_box" v-for="(item,index) in CenterContentList" :key="index">
        <img class="bar_img" :src="item.ImgUrl" />
      </div>
    </div>

    <div>
      <div v-for="(item,index) in SaleList" :key="index">
        <!-- 小banner -->
        <img :src="item.TabImgUrl" alt class="title_img" />
        <!-- 横向列表 -->
        <swiper :config="{id:'banner' + index,info:{slidesPerView:2.3,spaceBetween:15}}">
          <div class="swiper-slide" v-for="(value,index1) in item.CakeList" :key="index1">
            <img class="slide_img" :src="value.ImgUrl" />
            <span class="nav_name">{{value.Name}}</span>
            <br />
            <span class="nav_price">￥{{value.Price}}{{"/ "+ value.Size}}</span>
          </div>
        </swiper>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SwiperBannerList: [], //ImgUrl
      SaleList: [], //TabImgUrl  小banner    CakeList   横向轮动列表
      AbsoluteList: [],
      TopIconList: [],
      CenterContentList: []
    };
  },
  mounted() {
    this.$apis.getIndexData().then(res => {
      var res = res.data.Tag.mainresult;
      console.log(res);
      var SaleList = res.SaleList;
      console.log(SaleList);
      SaleList.map(item => {
        item.CakeList = JSON.parse(item.CakeList);
        item.CakeList.map(item => {
          item.ImgUrl = this.$global.setImgUel(item);
        });
      });

      //广告1.1元起
      var AbsoluteList = res.AbsoluteBannerList[0].ImgUrl;
      this.AbsoluteList = res.AbsoluteBannerList[0].ImgUrl;
      console.log(AbsoluteList);

      // 六个小图
      this.TopIconList = res.TopIconList;

      this.SaleList = SaleList;
      this.SwiperBannerList = res.SwiperBannerList;

      //四个小图
      this.CenterContentList = res.CenterContentList;
      
    });
  }
};
</script>

<style lang="scss" scoped>
.bestcake_box {
  margin: 4%;
}
img {
  display: block;
}
.big_banner {
  .swiper-slide {
    border-radius: r(10);
  }
}
.banner_img {
  width: 100%;
  height: 100%;
  border-radius: r(10); 
}
.nav_img {
  width: 100%;
  height: r(36.03);
  img {
    width: 100%;
  }
}
.title_img {
  width: 100%;
  height: r(142);
  padding-top: r(15);
}
.adv_img {
  width: 100%;
  height: r(86);
}
.six_img {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: r(215.45);
}
.six_box {
  width: r(70.55);
  height: r(97.72);
  text-align: center;
  margin-left: r(13);
  margin-top: r(13);
}
.bar_img {
  width: r(60.04);
  height: r(60.04);
}
.scroll {
  width: 100%;
  height: r(36.03);
  margin: 8px 0;
  .inform {
    width: 15%;
    height: r(36.03);
    float: left;
    text-align: center;
    line-height: r(36.03);
    .inform_box {
      display: inline-block;
      line-height: r(18);
      width: r(36);
      height: r(18);
      background: #1fb1b8;
      border-radius: r(5);
    }
  }
  .inform_scroll {
    width: 85%;
    height: 100%;
    float: left;
    text-align: center;
    line-height: r(36.03);
    color: #1fb1b8;
  }
}
//四个小图
.four_img {
  width: 100%;
  height: r(221.19);
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .four_box {
    .bar_img {
      width: r(167.15);
      height: r(100.08);
      float: left;
      border-radius: r(10);
    }
  }
}
.swiper-slide {
  width: r(156.14);
  height: r(180.49);
  background: yellow;
  border-radius: r(10);
  margin: r(10) auto;
  .slide_img {
    width: r(120.1);
    height: r(120.1);
    margin: 0 auto;
  }
  .nav_name {
    font-size: r(16);
  }
  .nav_price {
    font-size: r(14);
  }
}
.footer {
  width: 100%;
  height: r(41.01);
}
</style>