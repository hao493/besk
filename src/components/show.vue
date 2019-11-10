<template>
  <div class="show">
    <div class="banner">
      <swiper
        class="banner_swiper"
        :config="{id:'banner_show' , info:{pagination:'.swiper-pagination'}}"
      >
        <div class="swiper-slide" v-for="(item,index) in swipers" :key="index">
          <img class="banner_img" :src="banners + `${item}.jpg`" />
        </div>
      </swiper>
      <!-- name -->
      <div class="adv">
        <p>{{info.Name}}</p>
      </div>
      <!-- 边框 -->
      <div class="border-px"></div>
      <!-- 信息列表 -->
      <div class="isLoad" v-if="isLoad">
        <div class="tiandu">
          <div class="one1">甜度</div>
          <div class="one2">
            <img
              :src="`https://res.bestcake.com/m-images/ww/jz/tiandu_${info.Sweet||info.CakeType[0].Sweet}.png`"
              alt
            />
          </div>
        </div>
        <div class="kouwei">
          <div class="one1">口味</div>
          <div class="one2">{{info.CategoryName}}</div>
        </div>
        <div class="yuancailiao">
          <div class="one1">原材料</div>
          <div class="one2">{{info.Resource || info.Resourse}}</div>
        </div>
        <div class="renqun">
          <div class="one1">适合人群</div>
          <div class="one2">所有人群</div>
        </div>
        <div class="baoxian">
          <div class="one1">保鲜条件</div>
          <div class="one2">{{info.KeepFresh}}</div>
        </div>
      </div>
      <!-- 边框 -->
      <div class="border-px"></div>
      <!-- 规格 -->
      <div class="option">
        <div class="option1">
          <span class="option1_1" v-for="(item,index) in types" :key="index">
            <button @click="userSelct(index)">{{item.Size}}</button>
          </span>
        </div>
        <div class="option2">
          <li v-for="(item,index) in types" :key="index"></li>
        </div>
      </div>
      <!-- 边框 -->
      <div class="border-px"></div>
      <div class="total">
        <div class="total_text">
          <p>购买数量</p>
        </div>
        <div class="total_btn">
          <button @click="minus" class="btn1">-</button>
          <span>{{num}}</span>
          <button @click="add" class="btn2">+</button>
        </div>
      </div>
      <!-- 边框 -->
      <div class="border-px"></div>
      <div class="jg-gonggao">
        <div class="jg-gonggao1">
          <div class="jg-text-z">划线价格</div>
          <div class="jg-text-y">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
        </div>
        <div class="jg-gonggao2">
          <div class="jg-text-z">未划线价格</div>
          <div class="jg-text-y">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
        </div>
      </div>
      <div class="account">
        <div class="account1">价格：{{currentType.CurrentPrice * num || 0}}</div>
        <div class="account2" @click="buyAdd">加入购物车</div>
        <div class="account3" @click="topath">买买买</div>
      </div>
      <div class="footer_bt"></div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      params: {},
      //图片
      banners: "",
      //轮播
      swipers: [1, 2, 3, 4],
      //types
      types: [],
      //信息
      info: {},
      isLoad: false,
      currentType: {},
      num: 1
    };
  },
  mounted() {
    this.params = this.$route.query;
    this.params.city = this.$store.state.city;
    this.pageInit();
  },
  methods: {
    pageInit() {
      var currentPro;
      if (this.params.SupplyNo.indexOf("NS") !== -1) {
        this.banners = this.setImgUel("ns-detail");
        currentPro = this.$apis.getShowDataOne({
          Name: this.params.Name,
          m: "GetNSCakeByName"
        });
      } else if (this.params.SupplyNo.indexOf("KSK") !== -1) {
        this.banners = this.setImgUel("jd-detail");
        currentPro = this.$apis.getShowDataTwo({
          City: this.params.city,
          ProName: this.params.Name,
          c: "Product",
          m: "GetCakeByName"
        });
      } else if (this.params.SupplyNo.indexOf("JZ") !== -1) {
        this.banners = this.setImgUel("jz-detail");
        currentPro = this.$apis.getShowDataTwo({
          City: this.params.city,
          ProName: this.params.Name,
          c: "IndexCenter",
          m: "GetjzCakeInfo"
        });
      } else if (this.params.SupplyNo.indexOf("RP") !== -1) {
        this.banners = this.setImgUel("rp-detail");
        currentPro = this.$apis.getShowDataOne({
          Name: this.params.Name,
          m: "GetRuPCakeByName"
        });
      }

      currentPro.then(res => {
        var res = res.data.Tag;
        if (res.length && res.length !== 1) {
          res.map(item => {
            if (item.City == this.params.city) {
              this.types.push(item);
            }
          });
          this.info = this.types[0];
        } else if (res.length === 1) {
          this.types = res;
          this.info = this.types[0];
        } else {
          console.log(res);
          this.types = res.infos.CakeType;
          // console.log(this.types);
          this.info = res.infos;
        }
        this.isLoad = true;
        //console.log(this.isLoad)
        this.userSelct(0);
        // console.log(this.info, this.types);
      });
    },
    userSelct(index) {
      this.currentType = this.types[index];
      // console.log(this.currentType);
    },
    //购买
    add() {
      this.num++;
    },
    minus() {
      if (this.num > 1) {
        this.num--;
      } else {
        this.num == 1;
        MessageBox.alert("操作失败").then(action => {});
      }
    },
    //拼接数据
    buyAdd() {
      var temp = {
        //动态数据
        ID: this.currentType.Id || this.currentType.ID,
        Name: this.params.Name,
        CurrentPrice: this.currentType.CurrentPrice,
        ImgUrl: this.params.ImgUrl,
        Size: this.currentType.Size,
        num: this.num
      };
      MessageBox.alert("加入购物车成功").then(action => {
        // console.log("run");
        this.$store.commit("add", temp);
      });
      // console.log(temp)
    },
    topath(){
      this.$router.push({path:'/cart'});
    },
    setImgUel(no) {
      return `https://res.bestcake.com/m-images/${no}/${this.params.Name}/${this.params.Name}-`;
    }
  }
};
</script>
<style lang="scss" scoped>
.show {
  width: 100%;
  .banner_swiper {
    height: r(445.38);
    .banner_img {
      height: r(445.38);
    }
  }
  .adv {
    width: 100%;
    height: r(98.84);
    p {
      text-align: center;
      padding-top: r(20);
      font-size: r(18);
      font-weight: bold;
    }
  }
  .border-px {
    width: 100%;
    height: r(10);
    background: #f7f7f7;
  }
  //信息列表
  .isLoad {
    width: 100%;
    padding-top: r(15);
    .one1 {
      width: 22%;
      float: left;
      margin-left: 3%;
      font-size: r(14);
      color: #ccc;
    }
    .one2 {
      width: 72%;
      float: left;
      margin-right: 3%;
      font-size: r(14);
    }
    .tiandu {
      width: 100%;
      height: r(40);
      .one1 {
        height: r(40);
        line-height: r(40);
      }
      .one2 {
        height: r(40);
        line-height: r(40);
        img {
          width: r(84);
          height: r(16);
          margin-top: r(12);
        }
      }
    }
    .kouwei {
      width: 100%;
      height: r(35);
      .one1 {
        height: r(35);
        line-height: r(35);
      }
      .one2 {
        height: r(35);
        line-height: r(40);
      }
    }
    .yuancailiao {
      width: 100%;
      height: r(50);
      .one1 {
        height: r(50);
        line-height: r(50);
      }
      .one2 {
        height: r(50);
        line-height: r(15);
        display: flex;
        justify-content: space-around;
        flex-direction: column;
      }
    }
    .renqun {
      width: 100%;
      height: r(30);
      .one1 {
        line-height: r(30);
      }
      .one2 {
        line-height: r(30);
      }
    }
    .baoxian {
      width: 100%;
      height: r(60.05);

      .one1 {
        height: r(60.05);
        line-height: r(60.05);
      }
      .one2 {
        height: r(60.05);
        line-height: r(15);
        display: flex;
        justify-content: space-around;
        flex-direction: column;
      }
    }
  }
  .footer_bt {
    width: 100%;
    height: r(40.67);
  }
  .option {
    width: 100%;
    .option1 {
      width: 100%;
      .option1_1 {
        button {
          height: r(30.02);
          background: #02d3d6;
          color: #fff;
          border: none;
          margin: r(18) 0 r(18) r(12);
        }
      }
    }
  }
  .total {
    width: 100%;
    height: r(52.02);
    .total_text {
      width: r(172.66);
      height: 100%;
      float: left;
      line-height: r(52.02);
      margin-left: r(12);
      font-size: r(14);
    }
    .total_btn {
      width: r(100);
      height: r(52.02);
      float: right;
      margin-right: r(12);
      line-height: r(52.02);
      button {
        width: r(30);
        height: r(30);
        background: #fff;
        border: 0;
        font-size: r(14);
        .btn2 {
          margin-bottom: r(10);
        }
      }
      span {
        margin: 0 r(10);
        font-size: r(14);
      }
    }
  }
  .account {
    width: 100%;
    height: r(57.96);
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 10000;
    border-top: r(1) solid #ccc;
    .account1 {
      width: 35%;
      height: 100%;
      color: #f00;
      float: left;
      font-size: r(16);
      line-height: r(57.96);
      font-weight: bold;
      margin-left: 5%;
    }
    .account2 {
      width: 28%;
      height: 100%;
      float: left;
      font-size: r(16);
      line-height: r(57.96);
      color: rgb(170, 170, 170);
      text-align: center;
    }
    .account3 {
      width: 32%;
      height: 100%;
      background: #02d4d7;
      float: left;
      color: #fff;
      font-size: r(16);
      line-height: r(57.96);
      font-weight: bold;
      text-align: center;
    }
  }
  .jg-gonggao {
    background: #f7f7f7;
  }
}
</style>
