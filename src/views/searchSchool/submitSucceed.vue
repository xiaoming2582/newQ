<template>
  <div class="wrapper">
    <div v-if="auditUser === 2" class="patriarch">
      <p>提交成功</p>
      <p>请耐心等候第一家长审核结果通知</p>
    </div>
    <div v-if="auditUser === 1" class="teacher">
      <p>提交成功</p>
      <p>请耐心等候老师审核结果通知</p>
    </div>
    <div class="home" @click="goHome">返回首页</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      auditUser: 2 //1老师审核，2家长审核
    };
  },
  watch: {},
  computed: {},
  methods: {
    goHome(){
      this.$router.push({
        path:"/home"
      })
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.wrapper {
  text-align: center;
  .patriarch {
    text-align: center;
    margin: 400px 0 200px 0;
    font-size: 35px;
    color: #333333;
    font-weight: bold;
    p {
      margin-bottom: 10px;
    }
  }
  .teacher {
    text-align: center;
    margin: 400px 0 200px 0;
    font-size: 35px;
    color: #333333;
    font-weight: bold;
    p {
      margin-bottom: 10px;
    }
  }
  .home {
    height: 80px;
    line-height: 80px;
    color: #fff;
    width: 90vw;
    margin: 0 auto;
    background: linear-gradient(
      289deg,
      rgba(195, 235, 129, 1) 0%,
      rgba(195, 235, 129, 1) 0%,
      rgba(132, 206, 9, 1) 100%
    );
    opacity: 1;
    border-radius: 100px;
  }
}
</style>