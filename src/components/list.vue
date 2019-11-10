<template>
  <div class="list_top">
    <div class="table">
      <i :class="{list_tabs_a:num == 1}" @click="selecData(1)">自营</i>
      <i :class="{list_tabs_a:num == 2}" @click="selecData(2)">贝式严选</i>
    </div>
    <div class="title">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <h1 @click="click_title(index)">{{item.title}}</h1>
        </li>
      </ul>
    </div>
    <div class="goods">
      <ul>
        <li class="goodslist" v-for="(item,index1) in list" :key="index1">
          <img :src="item.ImgUrl" @click="toPath(item)" />
          <p class="gdlisttxt1">{{item.Name| ellipsis1}}</p>
          <p class="gdlisttxt2">{{item.Means | ellipsis}}</p>
          <br />
          <p class="gdlisttxt3">
            {{"￥" + item.CurrentPrice}}
            <span class="gdlisttxt4">{{"/" + item.Size}}</span>
            <span>
              <button @click="add(item)">
                <img
                  class="gdlisttxt5"
                  src="https://res.bestcake.com\m-images-2\list-cart.png?v=1"
                  alt
                />
              </button>
            </span>
          </p>
        </li>
      </ul>
    </div>
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
    <div class="footer"></div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      goodsList: [
        { title: "女神", mark: "NS", list: [] },
        { title: "经典", mark: "KSK", list: [] },
        { title: "伴手礼", mark: "JZ", list: [] },
        { title: "乳品", mark: "RP", list: [] }
      ],
      listData: [],
      list: [],
      num:1,
    };
  },
  // 生命周期
  mounted() {
    // 初始化调用
    this.pageInit();
  },
  methods: {
    pageInit() {
      this._getListData(res => {
        var res = res.data.Tag.cakelist;
        // console.log(res);

        this.goodsList.map(item => {
          res.map(it => {
            if (it.SupplyNo.indexOf(item.mark) !== -1) {
              item.list.push(it);
              // console.log(it)  //字段
              it.ImgUrl = this.$global.setImgUel(it);
              // console.log(it.ImgUrl)
            }
          });
        });
        // console.log(goodsList_img)
        this.selecData(1);
      });
    },
    selecData(status) {
      this.num = status;
      if (status === 1) {
        this.listData = this.goodsList.slice(0, 3);
        this.click_title(0);
      } else {
        this.listData = this.goodsList.slice(3);
        this.click_title(0);
      }
      // console.log(this.listData);
    },
    click_title(index) {
      this.list = this.listData[index].list;
      // console.log(this.list);
    },
    //购买
    add(item) {
      // console.log(item);
      var temp = {
        ID: item.ID,
        Name: item.Name,
        CurrentPrice: item.CurrentPrice,
        ImgUrl: item.ImgUrl,
        Size: item.Size
      };
      // console.log(temp)
      //调用
      MessageBox.alert("加入购物车成功").then(action => {
        // console.log("run");
        this.$store.commit("add", temp);
      });
    },
    toPath(item) {
      // console.log(item);
      this.$router.push({
        path: "/show",
        query: {
          SupplyNo: item.SupplyNo,
          Name: item.Name,
          ID: item.ID,
          ImgUrl: item.ImgUrl
        }
      });
    },

    // 定义接口   加_不属于当前组件的函数
    _getListData(callBack) {
      this.$apis.getListData().then(res => {
        callBack(res);
      });
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 12) {
        return value.slice(0, 12) + "...";
      }
      return value;
    },
    ellipsis1(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "...";
      }
      return value;
    }
  }
};
</script>
<style lang="scss">
// 顶部导航按钮
.list_top {
  width: 100%;
  height: r(48.79);
  border-bottom: r(2) solid #ccc;
  .list_tabs_a {
    color: #1fb1b8;
    border-bottom: r(2) solid #1fb1b8;
  }
  i{
    font-style: normal;
    display: inline-block;
    width: 50%;
    height: r(48.79);
    text-align: center;
    line-height: r(48.79);
    font-size: r(17);
    font-weight: bold;
  }
  .title {
    width: 100%;
    height: r(50);
    ul {
      display: flex;
      justify-content: space-around;
      li {
        float: left;
        line-height: r(50);
        h1 {
          font-size: r(14);
        }
      }
    }
  }
  .goods {
    width: 100%;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0 r(10);
      .goodslist {
        display: inline-block;
        width: r(172.65);
        height: r(232.81);
        margin-bottom: r(20);
        img {
          width: r(165.15);
          height: r(165.15);
          margin: 0 auto;
          display: table-cell;
          vertical-align: middle;
          text-align: center;
        }
        .gdlisttxt1 {
          font-size: r(15);
          margin: 0 auto;
        }
        .gdlisttxt2 {
          font-size: r(12);
          margin: r(10) auto 0;
        }
        .gdlisttxt3 {
          font-size: r(16);
          color: #f00;
          margin: 0 auto;
        }
        .gdlisttxt4 {
          font-size: r(12);
          color: #ccc;
        }
        button {
          float: right;
          border: 0;
          background: #fff;
          .gdlisttxt5 {
            width: r(20.01);
            height: r(20.01);
          }
        }
      }
    }
  }
}
.footer {
  width: 100%;
  height: r(41.01);
}
</style>
