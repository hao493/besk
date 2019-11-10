<template>
  <div class="body">
    <ul class="shopcart">
      <li class="cartlist" v-for="(item,index) in this.cartList" :key="index">
        <div class="lists_top">
          <!-- 按钮 -->
          <div class="checkbox_btn">
            <img
              :src="`https://res.bestcake.com/m-images/order/mw_firm_duihao_${item.bool?1:2}.jpg`"
              @click="changeFn(item)"
            />
          </div>
          <!-- 图 -->
          <div class="cart_img">
            <img :src="item.ImgUrl" alt />
          </div>
          <!-- 名称、价格、磅数 -->
          <div class="cart_mess">
            <p class="cart_mess_name">{{item.Name}}</p>
            <p class="cart_mess_size">{{item.Size}}</p>
            <p class="cart_mess_curr">{{item.CurrentPrice}}</p>
          </div>
          <!-- 加加减减 -->
          <div class="add_minus">
            <button @click="minus(item,index)">-</button>
            <span class="add_minus_num">{{item.num}}</span>
            <button @click="add(item)">+</button>
          </div>
        </div>
        <div class="list_footer">
          <div class="list_footer1"></div>
          <div class="list_footer2">
            优惠方式
            <span>双十一享88购</span>
          </div>
        </div>
        <div class="border-last"></div>
      </li>
    </ul>
    <!-- 结算 -->
    <div class="cart_account">
      <div class="account">
        <input type="checkbox" v-model="isBool" @click="allClick" />
        <!-- <img :src="`https://res.bestcake.com/m-images/order/mw_firm_duihao_${item.bool?1:2}.jpg`" @click="changeFn(item)" /> -->
        <p class="account_spa1">
          全选
          <button class="button1" @click="allEmpty">清空</button>
        </p>
        <p class="account_spa2">
          <i>
            合计：
            <span>{{allPrice}}</span>
          </i>
        </p>
        <p class="account_spa3">
          <button class="button2">立即购买</button>
        </p>
      </div>
    </div>
    <div class="ding"></div>
    <div class="kongkong" v-show="ibool">您的购物车空空如也！~</div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import Store from "storejs";
export default {
  data() {
    return {
      cartList: [],
      allPrice: 0,
      isArr: [],
      isBool: false,
      ibool: true
    };
  },
  mounted() {
    this.cartList = this.$store.state.cartList;
    this.cartList.map(item => {
      item.bool = false;
    });
  },
  methods: {
    add(item) {
      //show和cart同累加
      item.num++;
      Store.set("cartList", this.$store.state.cartList);
      this.count();
    },
    changeFn(item) {
      item.bool = !item.bool;
      this.count();
    },
    count() {
      this.allPrice = 0;
      this.isArr = [];
      this.cartList.map(item => {
        if (item.bool) {
          this.allPrice += item.num * item.CurrentPrice;
          this.isArr.push(item);
        }
      });
      if (this.isArr.length === this.cartList.length) {
        // console.log("all")
        this.isBool = true;
      } else {
        this.isBool = false;
      }
    },
    minus(item, index) {
      if (item.num <= 1) {
        MessageBox.confirm("确定删除该商品?")
          .then(action => {
            this.cartList.splice(index, 1);
            Store.set("cartList", this.$store.state.cartList);
            this.count();
            MessageBox.alert("该商品已删除！").then(action => {});
          })
          .catch(action => {});
      } else {
        item.num--;
        Store.set("cartList", this.$store.state.cartList);
      }
      this.count();
    },
    allClick() {
      if (this.isBool === false) {
        this.cartList.map(item => {
          item.bool = true;
          this.allPrice += item.num * item.CurrentPrice;
        });
      } else {
        this.cartList.map(item => {
          item.bool = false;
          this.allPrice = 0;
        });
      }
    },
    allEmpty(item, index) {
      if (this.isBool === true) {
        MessageBox.confirm("确定删除所有商品?")
          .then(action => {
            this.count();
            this.cartList.splice(index);
            Store.set("cartList", this.$store.state.cartList);
            MessageBox.alert("所有商品已删除！").then(action => {});
            this.allPrice = 0;
          })
          .catch(action => {});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.shopcart {
  height: 100%;
  .cartlist {
    width: 100%;
    height: r(185);
    .lists_top {
      width: 100%;
      height: r(140);
      background: #fff;
      .checkbox_btn {
        width: 10%;
        height: r(140);
        float: left;
        line-height: r(140);
        text-align: center;
        img {
          width: r(20);
          height: r(20);
        }
      }
      .cart_img {
        width: 30%;
        height: r(140);
        float: left;
        img {
          width: r(114.09);
          height: r(106.01);
          margin-top: r(8);
        }
      }
      .cart_mess {
        width: 30%;
        height: r(140);
        float: left;
        padding-left: r(12);
        .cart_mess_name {
          font-size: r(16);
          margin-top: r(18);
        }
        .cart_mess_size {
          font-size: r(10);
          line-height: r(30);
        }
        .cart_mess_curr {
          font-size: r(12);
          font-weight: bold;
          line-height: r(35);
        }
      }
      .add_minus {
        text-align: center;
        line-height: r(140);
        button {
          border: none;
          background: #fff;
        }
        .add_minus_num {
          display: inline-block;
          width: r(32.52);
          height: r(25.33);
        }
      }
    }
    .list_footer {
      width: 100%;
      height: r(45);
      background: #fff;
      .list_footer1 {
        width: 10%;
        height: r(45);
        float: left;
      }
      .list_footer2 {
        width: 90%;
        font-size: r(16);
        height: r(43);
        float: left;
        border-top: r(2) solid #ddd;
        line-height: r(45);
        color: #f00;
        span {
          color: #333;
          font-size: r(14);
          text-align: center;
        }
      }
    }
    .border-last {
      width: 100%;
      height: r(5);
      background: #ddd;
    }
  }
}
.cart_account {
  width: 100%;
  height: r(56);
  margin-top: r(5);
  position: fixed;
  bottom: r(42);
  background: #fff;
  border-bottom: r(1) solid #ccc;
  .account {
    width: 100%;
    input {
      width: r(20);
      height: r(20);
      -webkit-appearance: radio;
      line-height: r(56);
      float: left;
      margin-top: r(18);
    }
    .account_spa1 {
      font-size: r(18);
      margin-left: r(10);
      float: left;
      margin-top: r(18);
      .button1 {
        border: none;
        background: #fff;
        margin-left: r(8);
      }
    }
    .account_spa2 {
      height: r(56);
      width: 30%;
      float: left;
      line-height: r(38);
      text-align: center;
      i {
        font-style: normal;
        margin-left: r(30);
        span {
          color: #f00;
          font-size: r(18);
        }
      }
    }
    .account_spa3 {
      width: 30%;
      height: r(56);
      float: right;
      .button2 {
        width: 100%;
        float: left;
        height: r(56);
        font-size: r(18);
        border: 0;
        background: #02d4d7;
        color: #fff;
        font-weight: bold;
      }
    }
  }
}
.ding {
  height: r(130);
}
.kongkong {
  width: 100%;
  height: r(80);
  background: #ddd;
  padding-top: r(50);
  text-align: center;
  font-size: r(18);
  font-weight: bold;
  position: fixed;
  top: 0;
  z-index: -1;
}
</style>
