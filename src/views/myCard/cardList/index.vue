<template>
  <div class="page">
    <template v-if="status === 2"></template>
    <template v-if="status === 0">
      <div class="page-bd myHand">
        <div class="page-bd no_data">
          <div class="empty">
            <img src="@/assets/kong.png" alt />
            <p class="mt-30">您的卡券目前空空如也~~</p>
          </div>
        </div>
      </div>
    </template>
    <div class="page-bd" v-if="status === 1">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="100"
        @load="onLoad"
      >
        <van-swipe-cell ref="swipeCell" v-for="(item, index) in list" :key="index">
          <van-cell-group>
            <figure class="figure figure-skin-one">
              <div
                class="cardContent flex"
                @click="toDetails(item.id)"
                :style="item.status === 1?
     {backgroundImage:'url('+geting+')'}:{backgroundImage:'url('+geted+')'}"
              >
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
                  <!-- <p class="r-b">{{item.content}}</p> -->
                  <p
                    class="r-b"
                  >涌现出很多教育教学方式。课程改革的核心理念之一就是在教程改革的核心理念之一就是在教学中渗透情感态度与涌现出很多教育教学方式。课程改革的核心理念之一就是在教学中渗</p>
                  <p class="r-o-d flex">
                    <span class="flex-1">机构：{{item.instTitle}}</span>
                    <span class="flex-1">地址：{{item.instAddress}}</span>
                  </p>
                </div>
                <div class="cardget flex j-c-c a-i-c" v-if="item.status === -1">
                  <p>已过期</p>
                </div>
                <div class="cardget flex j-c-c a-i-c" v-if="item.status === 1">
                  <p>详情</p>
                </div>
                <div class="cardget flex j-c-c a-i-c" v-if="item.status === 2">
                  <p>已使用</p>
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
      status: 2,
      list: [],
      query: {
        openId: this.$store.state.user.info.openId,
        type: 0,
        pageNum: 1,
        pageSize: 10,
        totalPage: 1
      },
      geted: require("@/assets/geted_bg.png"),
      geting: require("@/assets/geting_bg.png")
    };
  },
  methods: {
    onLoad() {
      if (this.query.pageNum < this.query.totalPage) {
        //     //加载数据
        this.query.pageNum += 1;
        service
          .myCardList(this.query, {
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
    async noticeQuery(params = {}) {
      let res = await service.myCardList(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.query.totalPage = res.data.pages;
        this.query.pageNum = res.data.pageNum;
        this.list = res.data.list || [];
        if (this.list.length) {
          this.status = 1;
        } else {
          this.status = 0;
        }
      }
    },
    toDetails(id) {
      this.$router.push({
        path: "/myCard/cardDetails",
        query: {
          id
        }
      });
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
  height: 320px;
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
        margin-left: 20px;
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
    margin: 0;
    font-size: 20px;
    line-height: 30px;
    height: 130px;
  }
  .r-o-d {
    font-size: 20px;
    border-top: 1px solid #fff;
    padding: 10px 0;
    span {
      &:nth-of-type(1) {
        margin-right: 5px;
      }
    }
  }
}
</style>