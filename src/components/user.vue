<template>
  <div class="user">
    <header class="header-top">
      <div class="header_top">
        <div>
          <img
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=626377853,1707449191&fm=26&gp=0.jpg"
            alt
          />
        </div>
      </div>
      <div class="header_center">╮Hx/D、郝同学</div>
      <div class="header_bottom">
        <ul class="ul_1">
          <li>余额</li>
          <li>吉致币</li>
          <li>优惠券</li>
          <li>兑换券</li>
        </ul><br>
        <ul class="ul_2">
          <li>6324.13</li>
          <li>10</li>
          <li>8张</li>
          <li>3张</li>
        </ul>
      </div>
    </header>
    <section class="section-center">
      <div class="section_top">
        <img class="img_1" src="https://res.bestcake.com\m-images\order\mw-person-dd.png" alt="">
        <span>我的订单</span>
        <img class="img_2" src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg" alt="">
      </div>
      <div class="section_bottom">
        <img class="img_1" src="https://res.bestcake.com\m-images\order\mw_firm_ad.jpg" alt="">
        <span>收货地址</span>
        <img class="img_2" src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg" alt="">
      </div>
    </section>
    <footer class="fooer-center">
      <div class="footer_center">
        <p class="foot_bottom1">客服热线:15934341347</p>
        <p class="foot_bottom2">服务协议与证照信息</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;
  .header-top {
    width: 100%;
    height: r(221);
    border-bottom: r(10) solid #ccc;
    .header_top {
      width: 100%;
      height: r(106);
      div {
        position: relative;
        width: r(80);
        height: r(80);
        margin: 0 auto;
        top: r(26);
        img {
          position: absolute;
          display: inline-block;
          width: r(80);
          height: r(80);
          border-radius: 50%;
        }
      }
    }
    .header_center {
      width: 100%;
      height: r(25);
      font-size: r(14);
      text-align: center;
    }
    .header_bottom {
      width: 100%;
      height: r(90);
      margin-top: r(40);
      ul {
        width: 100%;
        text-align: center;
        li {
          width: 25%;
          float: left;
          line-height: r(20)
        };
      }
    }
  }
  .section-center {
    width: 100%;
    height: r(110);
    .section_top {
      width: 100%;
      height: r(55);
      border-bottom:  r(2) solid #ccc;
      .img_1{
        width:r(15);
        height: r(20);
        margin: r(17.5) 0 0 r(10);
      }
      span{
        margin-left: r(25);
        font-size: r(20);
      }
      .img_2{
        width:r(15);
        height: r(20);
        margin-left: r(215);
      }
    }
    .section_bottom {
      width: 100%;
      height: r(55);
      border-bottom:  r(2) solid #ccc;
      .img_1{
        width:r(15);
        height: r(20);
        margin: r(17.5) 0 0 r(10);
      }
      span{
        margin-left: r(25);
        font-size: r(20);

      }
      .img_2{
        width:r(15);
        height: r(20);
        margin-left: r(215);
      }
    }
  }
  .fooer-center {
    width: 100%;
    background: rgb(240, 238, 238);
    .footer_center {
      width: 100%;
      height: r(284);
      color: #999;
      .foot_bottom1{
        padding-top: r(120);
        text-align: center;
        font-size: r(15)
      }
      .foot_bottom2{
        padding-top: r(30);
        text-align: center;
        font-size: r(12)
      }
    }
  }
}
</style>
