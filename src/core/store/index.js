import Vue from "vue";
import Vuex from "vuex";
import apis from "@/core/api/apis";

import Store from "storejs"
Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    city: "上海",
    //购物车数据
    //有数据读数据，没数据空数组
    cartList: Store.get("cartList") || [],
  },
  mutations: {
    add(state, data) {
      // console.log(data);
      var bool = true;
      state.cartList.map((item) => {
        //购物车有重复数据
        if (item.ID === data.ID) {
          if (data.num > 1) {
            item.num = item.num + data.num;
            bool = false;
          } else {
            item.num++;
            bool = false;
          }
        }
        //不重复不处理
      });


      //购物车没有重复数据       重复++   不重复push
      if (bool) {
        // 购物车没有数据
        data.num = data.num || 1;
        state.cartList.push(data);
        //购物车有数据
      }
      //处理后的数据
      console.log(state.cartList);


      // 存数据
      Store.set("cartList", state.cartList);

    },
  },
  getters: {},
  actions: {}
});
