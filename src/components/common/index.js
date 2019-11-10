import swiper from "./swiper.vue"

import { Tabbar, TabItem } from 'mint-ui';

export default (Vue) => {
    Vue.component(Tabbar.name, Tabbar);
    Vue.component(TabItem.name, TabItem);
    Vue.component("swiper", swiper);
}

