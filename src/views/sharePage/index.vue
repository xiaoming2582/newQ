<template>
  <div class="wrapper">
    <template>
      <div class="overlay"></div>
      <div class="share-tip">
        <img src="@/assets/share-tip.png" />
        <p size-18>请点击右上角按钮邀请好友吧</p>
      </div>
    </template>
  </div>
</template>

<script>
import wxapi from "@/config/wxapi";
export default {
  components: {},
  props: {},
  data() {
    return {
      flag: this.$route.query.flag //1家长，2老师，3关注小孩
    };
  },
  watch: {},
  computed: {},
  methods: {
    wxRegCallback() {
      //用于微信JS-SDK回调
      this.wxShareAppMessage();
    },
    wxShareAppMessage() {
      let that = this;
      let shareUrl = "";
      if (this.flag == 1) {
        shareUrl = API_ROOT + "#/student/newAdd";
      } else if (this.flag == 2) {
        shareUrl = API_ROOT + "#/teacher/newAdd";
      } else {
        shareUrl = API_ROOT + "#/focus-join";
      }
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
  created() {},
  mounted() {
    wxapi.wxRegister(this.wxRegCallback);
  }
};
</script>
<style lang="less" scoped>
.wrapper {
}
</style>