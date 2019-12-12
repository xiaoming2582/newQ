<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="visibility">
        <div class="overlay" @click="visibility = false"></div>
        <div class="share-tip">
          <img src="@/assets/share-tip.png" />
          <p size-18>请点击右上角按钮邀请好友吧</p>
        </div>
      </template>
      <div class="create-success">
        <img src="@/assets/create-success.png" alt />
        <div class="classNum">班级码：{{ gradeNum }}</div>
        <div class="okapi">
          <a
            href="javascript:void(0);"
            class="btn btn-large btn-primary"
            @click="invitePatriarch"
            >邀请家长加入</a
          >
        </div>
        <div class="okapi okapi2">
          <a
            href="javascript:void(0);"
            class="btn btn-large btn-primary"
            @click="inviteTeacher"
            >邀请老师加入</a
          >
        </div>
        <div class="entrance" @click="EnterTheClass">
          <span class="gradeBtn">进入班级</span
          ><van-icon name="arrow" color="#84ce09" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wxapi from "@/config/wxapi";
import { API_ROOT } from "@/config/isdev";
import service from "@/api";
import Cookies from "js-cookie";
export default {
  name: "teacherSuccess",
  data() {
    return {
      visibility: false,
      classId: this.$route.query.classid,
      gradeNum: this.$route.query.classcode
    };
  },
  methods: {
    invitePatriarch() {
      this.$router.push({
        path: "/sharePage",
        query: {
          flag: 1
        }
      });
    },
    inviteTeacher() {
      this.$router.push({
        path: "/sharePage",
        query: {
          flag: 2
        }
      });
    },
    jump() {
      this.$router.replace({
        path: "/home"
      });
    },
    EnterTheClass() {
      let params = {
        openid: this.$store.state.user.info.openId,
        roletype: this.$store.state.user.info.roleType
      };
      this.getUserAccountDetail(params);
    },
    //获取用户信息
    async getUserAccountDetail(params = {}) {
      let res = await service.getUserAccountDetail(params);
      if (res.errorCode === 0) {
        let _cookie = Cookies.getJSON("info");
        let obj = Object.assign({}, _cookie, res.data);
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
            this.$router.replace({
              path: "/home"
            });
          }
        });
      }
    },
    wxRegCallback() {
      //用于微信JS-SDK回调
      this.wxShareAppMessage();
    },
    wxShareAppMessage() {
      let that = this;
      let shareUrl =
        API_ROOT + "#/baby/share?classId=" + this.classId + "&id=0";
      let option = {
        title: "亲爱的用户您好", // 分享标题
        desc: "小Q智慧欢迎您的加入", // 分享描述
        link: shareUrl, // 分享链接，根据自身项目决定是否需要split
        success: () => {
          that.$toast("分享成功");
        },
        error: () => {
          that.$toast("已取消分享");
        }
      };
      wxapi.wxShareAppMessage(option);
    }
  },
  mounted() {
    wxapi.wxRegister(this.wxRegCallback);
  }
};
</script>
<style lang="less" scoped>
.create-success {
  text-align: center;
  padding-top: 100px;
  color: #999;
  > img {
    width: 480px;
    height: 385px;
  }
  .okapi {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
    margin-bottom: 40px;
    // padding: 0 30px;
    > a {
      width: 80vw !important;
      height: 90px;
      line-height: 90px;
    }
  }
}
.classNum {
  margin-top: 50px;
  color: #84ce09;
  font-size: 50px;
  font-weight: 600;
}
.okapi2 {
  margin-top: 0 !important;
}
.entrance {
  display: flex;
  align-items: center;
  justify-content: center;
  .gradeBtn {
    color: #84ce09;
  }
}
</style>
