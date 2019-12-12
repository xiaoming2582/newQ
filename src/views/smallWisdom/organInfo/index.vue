<template>
  <div class="page">
    <div class="page-bd">
      <div class="header">
        <img :src="img" alt />
      </div>
      <div class="content">
        <div>
          <p class="title">天河阳光幼儿培训机构</p>
          <div class="type flex">
            <div class="flex f-w-w flex-1">
              <span>美术</span>
              <span>少儿编程</span>
              <span>舞蹈</span>
              <span>书法</span>
              <span>武术培训</span>
              <span>美术</span>
              <span>美术</span>
            </div>
            <div class="flex">
              <span>更多</span>
              <van-icon name="arrow-down" />
            </div>
          </div>

          <div class="locationInfo flex">
            <div class="flex flex-1 a-i-c">
              <img :src="location" alt width="8%" />
              <span>华港商务大厦1703</span>
            </div>
            <div class="flex a-i-c">
              <van-icon name="phone-o" />
              <span>020-8766759</span>
            </div>
          </div>

          <div class="card">
            <div class="commom flex">
              <div class="flex a-i-c flex-1">
                <span></span>
                <h3>卡券领取</h3>
              </div>
              <div class="flex a-i-c">
                <span>领取更多</span>
                <van-icon name="arrow" />
              </div>
            </div>

            <div class="cardList">
              <div class="cardContent flex">
                <div class="cardType flex j-c-c a-i-c">
                  <p>优惠券</p>
                </div>

                <div class="cardInfo">
                  <div class="r-t">
                    <div>
                      <span>优惠</span>
                      <span>50000</span>
                    </div>
                    <div>
                      <p>庆祝德生三周年很开乐</p>
                      <p>时间：2019-10-20至2019-12-30</p>
                    </div>
                  </div>
                  <p class="r-b">涌现出很多教育教学方式。课程改革的核心理念之一就是在教学中渗透情感态度与涌现出很多教育教学方式。课程改革的核心理念之一就是在教学中渗</p>
                </div>
                <div class="cardget flex j-c-c a-i-c" @click="getCard">
                  <p>领取</p>
                </div>
              </div>
              <div class="cardContent flex">
                <div class="cardType flex j-c-c a-i-c">
                  <p>优惠券</p>
                </div>

                <div class="cardInfo">
                  <div class="r-t">
                    <div>
                      <span>优惠</span>
                      <span>50000</span>
                    </div>
                    <div>
                      <p>庆祝德生三周年很开乐</p>
                      <p>时间：2019-10-20至2019-12-30</p>
                    </div>
                  </div>
                  <p class="r-b">涌现出很多教育教学方式。课程改革的核心理念之一就是在教学中渗透情感态度与涌现出很多教育教学方式。课程改革的核心理念之一就是在教学中渗</p>
                </div>
                <div class="cardget flex j-c-c a-i-c" @click="getCard">
                  <p>领取</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: require("@/assets/no_user/main.png"),
      location: require("@/assets/location.png")
    };
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  background: #fff;
  > div {
    width: 94%;
    margin: 0 auto;
    .title {
      padding: 30px 0;
      font-size: 30px;
      font-weight: 600;
    }
    .type {
      color: #999;
      > div {
        &:nth-of-type(1) {
          span {
            display: block;
            margin: 5px;
            padding: 10px 5px;
            background: #fc7878;
            width: 130px;
            font-size: 24px;
            color: #fff;
            text-align: center;
          }
        }
        &:nth-of-type(2) {
          font-size: 28px;
          margin-top: 14px;
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
        color: #333333;
      }
    }
    &:nth-of-type(2) {
      color: #999999;
      font-size: 24px;
      i {
        font-size: 30px;
      }
    }
  }
}

.cardList {
  width: 94vw;
  overflow-x: auto;
  overflow-y: hidden;
  //   height: 600px;
  display: -webkit-box;
}

.cardContent {
  background: url("./../../../assets/geting_bg.png");
  width: 94vw;
  //   margin: 0 auto;
  height: 280px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 20px;
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