<template>
  <div class="page">
    <div class="page-bd">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="100"
        @load="onLoad"
      >
        <van-swipe-cell
          ref="swipeCell"
          :right-width="60"
          v-for="(item, index) in list"
          :key="index"
        >
          <van-cell-group>
            <figure class="figure figure-skin-one">
              <div class="cardContent flex">
                <div class="cardType flex j-c-c a-i-c">
                  <p v-if="item.type=== 1">优惠券</p>
                  <p v-if="item.type=== 2">体验券</p>
                </div>

                <div class="cardInfo">
                  <div class="r-t">
                    <div>
                      <span v-if="item.type=== 1">优惠</span>
                      <span v-if="item.type=== 2">价值</span>
                      <span>{{item.price}}</span>
                    </div>
                    <div>
                      <p>{{item.title}}</p>
                      <p v-if="item.forever===1">时间:永久</p>
                      <p v-if="item.forever===0">时间：{{item.startTime}}至{{item.endTime}}</p>
                    </div>
                  </div>
                  <p class="r-b">{{item.content}}</p>
                </div>
                <div
                  class="cardget flex j-c-c a-i-c"
                  @click="getCard(item.id)"
                  v-if="item.received"
                >
                  <p>已领取</p>
                </div>
                <div
                  class="cardget flex j-c-c a-i-c"
                  @click="getCard(item.id)"
                  v-if="!item.received"
                >
                  <p>领取</p>
                </div>
              </div>
            </figure>
          </van-cell-group>
        </van-swipe-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      query: {
        openId: this.$store.state.user.info.openId,
        type: 0,
        pageNum: 1,
        pageSize: 10,
        totalPage: 1
      }
    };
  },
  methods: {
    onLoad() {
      if (this.query.pageNum < this.query.totalPage) {
        //     //加载数据
        this.query.pageNum += 1;
        service
          .cardList(this.query, {
            headers: { "Content-Type": "application/json" }
          })
          .then(res => {
            if (res.errorCode === 0) {
              let list = res.data.list;
              this.query.totalPage = res.data.pages;
              this.query.pageNum = res.data.pageNum;
              this.loading = false;
              for (let i = 0; i < list.length; i++) {
                this.list.push(list[i]);
              }
            }
          });
      } else {
        // 数据全部加载完成
        console.log("数据全部加载完成");
        this.loading = false;
        this.finished = true;
      }
    },

    getCard(id) {
      this.getCoupon(id);
    },

    async getCoupon(id) {
      let res = await service.getCoupon(
        {
          couponId: id,
          openId: this.$store.state.user.info.openId
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (res.errorCode === 0) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "卡券领取成功",
            confirmButtonText: "确认",
            confirmButtonColor: "#84CE09",
            cancelButtonText: "我的卡券",
            cancelButtonColor: "#C2C2C2"
          })
          .then(() => {
            this.list.forEach(element => {
              if (element.id === id) {
                element.received = true;
              }
            });
          })
          .catch(() => {});
      }
    },
    async noticeQuery(params = {}) {
      let res = await service.cardList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        // let list = res.data.list;
        this.query.totalPage = res.data.pages;
        this.query.pageNum = res.data.pageNum;
        this.list = res.data.list || [];
        // if (this.list.length) {
        //   this.empty = false;
        // } else {
        //   this.empty = true;
        // }
      }
    }
  },
  mounted() {
    this.noticeQuery(this.query);
    //this.setDocumentTitle();
  }
};
</script>

<style lang="less" scoped>
.figure,
.van-cell-group {
  background: #ededed;
}
.cardContent {
  background: url("./../../../assets/geting_bg.png");
  width: 95%;
  margin: 0 auto;
  height: 260px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  .cardType,
  .cardget {
    width: 85px;
    height: 100%;
    color: #fff;
    p {
      width: 60%;
      text-align: center;
    }
  }
  .cardget {
    width: 80px;
    border-right: none;
    color: #ffd08a;
  }
}

.cardInfo {
  flex: 1;
  margin: 20px;
  color: #fff;
  .r-t {
    display: flex;
    align-items: center;
    > div {
      &:nth-of-type(1) {
        width: 200px;
        span {
          color: #fff;
          &:nth-of-type(1) {
            font-size: 24px;
            display: block;
          }
          &:nth-of-type(2) {
            font-size: 70px;
            margin-top: 5px;
          }
        }
      }
      &:nth-of-type(2) {
        flex: 1;
        margin-left: 10px;
        p {
          font-size: 26px;
          margin-bottom: 0 !important;
          &:nth-of-type(2) {
            font-size: 18px !important;
            margin-top: 10px;
          }
        }
      }
    }
  }

  .r-b {
    margin-top: 15px;
    font-size: 20px;
    line-height: 30px;
  }
}
</style>