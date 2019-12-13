<template>
  <div class="page">
    <div class="page-bd">
      <div class="content">
        <div class="title">
          <p class="num">{{params.code}}</p>
          <p class="code">卡券核销编码</p>
          <p class="use">使用方式：请到指定机构凭此卡券二维码进行扫码核销使用</p>
        </div>
        <div class="commom flex">
          <div class="flex a-i-c flex-1">
            <span></span>
            <h3 v-if="params.type === 1">优惠券</h3>
            <h3 v-if="params.type === 2">体验券</h3>
          </div>
          <div class="flex a-i-c">
            <span>价值</span>
            <span>{{params.price}}</span>
          </div>
        </div>
        <p class="organTitle">{{params.instTitle}}</p>

        <div class="locationInfo flex">
          <div class="flex flex-1 a-i-c">
            <img :src="location" alt width="8%" />
            <span>{{params.instAddress}}</span>
          </div>
          <div class="flex a-i-c">
            <van-icon name="phone-o" />
            <span>{{params.tele}}</span>
          </div>
        </div>

        <div class="p-c">
          <h3>{{params.couponTitle}}</h3>
          <p>{{params.content}}</p>
          <p v-if="params.forever === 0">活动时间：{{params.startTime}}至{{params.endTime}}</p>
          <p v-if="params.forever === 1">永久</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      location: require("@/assets/location.png"),
      params: {}
    };
  },
  mounted() {
    this.couponDetails();
  },
  methods: {
    async couponDetails() {
      let res = await service.couponDetails({
        id: this.$route.query.id,
        openId: this.$store.state.user.info.openId
      });
      this.params = res.data;
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.page-bd {
  background: #fff;
  height: 100vh;
}
.content {
  width: 95vw;
  margin: 0 auto;
  .title {
    text-align: center;
    color: #999999;
    font-size: 24px;
    .num {
      font-size: 120px;
      color: #fc7878;
      padding: 100px 0 80px;
    }
    .code {
      margin-bottom: 10px;
    }
  }
}

.commom {
  padding: 30px 0;
  > div {
    &:nth-of-type(1) {
      span {
        display: block;
        width: 3px;
        height: 30px;
        background: #84ce09;
        margin-right: 20px;
      }
      h3 {
        font-weight: 500;
        font-size: 34px;
        color: #fc7878;
      }
    }
    &:nth-of-type(2) {
      color: #fc7878;

      font-size: 50px;
      span {
        &:nth-of-type(1) {
          font-size: 20px;
          margin-top: 15px;
          margin-right: 5px;
        }
      }
    }
  }
}

.locationInfo {
  color: #999999;
  font-size: 24px;
  padding: 30px 0 15px;
  border-bottom: 1px solid #ccc;
  i {
    font-size: 38px;
  }
  span {
    margin-left: 5px;
  }
}

.p-c {
  padding: 30px 0;
  color: #333;
  p {
    &:nth-of-type(1) {
      margin: 20px 0;
      font-size: 28px;
      line-height: 40px;
    }
    &:nth-of-type(2) {
      font-size: 24px;
      color: #999;
    }
  }
}
</style>