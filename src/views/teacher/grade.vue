<template>
  <div class="wrapper push-out">
    <div class="cells-title2 titleHZM">
      <span class="longString"></span><span class="gradeTitle">班级列表</span>
    </div>
    <div class="main">
      <div class="lis" @click="auditList(item)" v-for="(item,index) in arr" :key="index">
        <div class="left">
          <div class="grade">{{item.classname}}</div>
          <div class="gradeNum">
            关联学生：{{item.number}}人
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" color="#CCCCCC" />
        </div>
      </div>
      <!-- <div class="lis">
        <div class="left">
          <div class="grade">大一班</div>
          <div class="gradeNum">
            关联学生：30人
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" color="#CCCCCC" />
        </div>
      </div> -->
    </div>
    <div class="footer" @click="newGrade">新建班级</div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  components: {},
  props: {},
  data() {
    return {
        // teacherid: this.$store.state.user.info.teacherId
       openid:this.$store.state.user.info.openId,
      arr:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    async queryTeacherClassDetailListByTeacher(openid) {
      let res = await service.queryTeacherClassDetailListByTeacher({ openid });
      if (res.errorCode === 0) {
        this.arr = res.data;
      }
    },
    auditList(item) {
      this.$router.push({
        path: "/teacher",
        query:{
          classid:item.classid
        }
      });
    },
    newGrade() {
      this.$router.push({
        path: "/teacher/createClass"
      });
    }
  },
  created() {},
  mounted() {
     this.queryTeacherClassDetailListByTeacher(this.openid)
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  // .cells-title2 {
  //   color: #808080;
  //   font-size: 30px;
  //   margin: 20px 0;
  //   padding: 0 30px;
  // }
  .main {
    background: #fff;
    .lis {
      height: 150px;
      display: flex;
      padding: 0 30px;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #f6f6f6;
      .left {
        .grade {
          font-weight: 600;
        }
        .gradeNum {
          font-size: 25px;
          color: #fc7878;
          margin-top: 30px;
        }
      }
      .right {
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px;
    line-height: 100px;
    color: #fff;
    background: linear-gradient(
      289deg,
      rgba(195, 235, 129, 1) 0%,
      rgba(195, 235, 129, 1) 0%,
      rgba(132, 206, 9, 1) 100%
    );
    text-align: center;
    width: 100%;
  }
}
</style>