<template>
  <div class="wrapper">
    <div v-if="haveSchool === -1"></div>
    <div v-else-if="haveSchool === 1" class="haveSchool">
      <div class="SchoolName">{{ schoolname }}</div>
      <div class="grade">
        <div class="titleHZM">
          <span class="longString"></span
          ><span class="gradeTitle">班级列表</span>
        </div>
        <div class="gradeList">
          <ul>
            <li
              @click="gradeBtn(item)"
              v-for="(item, index) in gradeArr"
              :key="index"
            >
              {{ item.classname }}
            </li>
            <!-- <li>一年级一班</li>
            <li>一年级一班</li>
            <li>一年级一班</li> -->
          </ul>
        </div>
        <van-popup
          class="classAndGrade"
          v-model="identicalNameOff"
          @close="onClose"
        >
          <div class="deleteBtn" @click="deleteBtn">X</div>
          <div class="main">
            <div class="main1">
              <p class="p1">学生名重复</p>
              <p class="p2">该班已存在以下同名学生</p>
              <p>请确认是否需要关联</p>
            </div>
            <div class="main2">
              <div class="message">
                <van-radio-group v-model="radio" bind:change="onChange">
                  <div
                    class="messageLis"
                    v-for="(item, index) in patriarchList"
                    :key="index"
                  >
                    <p>
                      {{ item.studentname }} ({{ item.relation }})
                      {{ item.phone }}
                    </p>
                    <van-radio
                      checked-color="#84CE09"
                      :name="index"
                      @click="selectPatriarch(item)"
                    ></van-radio>
                  </div>

                  <!-- <div class="messageLis">
                    <p>张三（妈妈）153****5689</p>
                    <van-radio checked-color="#84CE09" name="2"></van-radio>
                  </div> -->
                </van-radio-group>
              </div>
              <div class="warn">
                <p>请您谨慎确认孩子信息是否为同一人。</p>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="noRelevance">不关联</div>
            <div class="ensureRelevance" @click="relevance">确认关联</div>
          </div>
        </van-popup>
      </div>
      <div class="recommend">
        <span class="active1">班级不存在？</span>
        <span class="active2">点击推荐给老师使用</span>
      </div>
    </div>
    <div v-else class="noSchool">
      <div class="top"><img src="@/assets/kong.png" alt="" /></div>
      <div class="center">
        <div>您搜索的学校不存在</div>
        <div>请去推荐给老师建立班级</div>
      </div>
      <div class="bottom">邀请老师建立班级</div>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  components: {},
  props: {},
  data() {
    return {
      schoolname: this.$route.query.schoolname,
      gradeArr: [],
      haveSchool: -1,
      identicalName: 0, //1出现同名，0没有重名
      identicalNameOff: false,
      radio: "",
      classcode: "",
      classid: "",
      schoolid: "",
      patriarchList: [
        {
          parentid: 7,
          phone: "15386040940",
          relation: "爸爸",
          studentid: 1,
          studentname: "张三"
        },
        {
          parentid: 7,
          phone: "15386040940",
          relation: "爸爸",
          studentid: 2,
          studentname: "张三"
        }
      ],
      sameStudentId: "",
      sameStudentTel: ""
      // gradeArr: [
      //   {
      //     classid: "1",
      //     classname: "小一班",
      //     classcode: "1234"
      //   },
      //   {
      //     classid: "1",
      //     classname: "小二班",
      //     classcode: "1234"
      //   },
      //     {
      //     classid: "1",
      //     classname: "小一班",
      //     classcode: "1234"
      //   },
      //   {
      //     classid: "1",
      //     classname: "小二班",
      //     classcode: "1234"
      //   },  {
      //     classid: "1",
      //     classname: "小一班",
      //     classcode: "1234"
      //   },
      //   {
      //     classid: "1",
      //     classname: "小二班",
      //     classcode: "1234"
      //   }
      // ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    gradeList() {
      let params = {
        schoolid: this.$route.query.schoolid * 1,
        schoolname: this.$route.query.schoolname
      };
      this.querySchoolClassList(params);
    },
    //班级列表
    async querySchoolClassList(params = {}) {
      let res = await service.querySchoolClassList(params);
      if (res.errorCode === 0) {
        this.gradeArr = res.data.arr;
        this.haveSchool = res.data.result;
        this.schoolid = res.data.schoolid;
      } else {
        this.$toast(res.errorMsg);
      }
    },
    onChange(event) {
      console.log(event);
    },
    selectPatriarch(item) {
      console.log(item);
      this.sameStudentId = item.studentid;
      this.sameStudentTel = item.phone;
    },
    onClose() {
      this.identicalNameOff = false;
    },
    deleteBtn() {
      this.identicalNameOff = false;
    },
    gradeBtn(item) {
      this.classcode = item.classcode;
      this.classid = item.classid;
      this.$dialog
        .alert({
          title: item.classname,
          message: "确认要申请加入该班级吗？", //改变弹出框的内容
          showCancelButton: true, //展示取消按钮
          confirmButtonText: "申请加入",
          cancelButtonColor: "#C2C2C2"
        })
        .then(() => {
          //点击确认按钮后的调用
          let params = {
            studentid: this.$store.state.user.info.studentId,
            classid: this.classid,
            openid: this.$store.state.user.info.openId,
            schoolid: this.$route.query.schoolid 
          };
          this.parentJoinStudentForClass(params);
        })
        .catch(() => {
          //点击取消按钮后的调用
          // console.log("点击了取消按钮噢");
        });
    },
    async parentJoinStudentForClass(params = {}) {
      let res = await service.parentJoinStudentForClass(params);
      if (res.errorCode === 0) {
        // let flag = res.data.flag;
        let flag = 2;
        if (flag === 0) {
          this.$toast("加入班级成功");
          this.$router.push({
            path: "/home"
          });
        } else if (flag === 1) {
          this.$router.push({
            path: "/searchSchool/submitSucceed",
            query: {
              flag: flag
            }
          });
        } else if (flag === 2) {
          this.identicalNameOff = true;
          let params = {
            openid: this.$store.state.user.info.openId,
            studentname: this.$store.state.user.info.studentname,
            classid: this.classid
          };
          this.querySameNameStudentsInClass(params);
        }
      } else {
        this.$toast(res.errorMsg);
      }
    },
    //同名列表
    async querySameNameStudentsInClass(params = {}) {
      let res = await service.querySameNameStudentsInClass(params);
      if (res.errorCode === 0) {
        if (res.data) {
          // this.patriarchList=res.data
        }
      }
    },
    relevance() {
      let params = {
        openid: this.$store.state.user.info.openId,
        studentid: this.sameStudentId,
        phone: this.sameStudentTel
      };
      this.submitAuditJoinClassToMainParent(params);
    },
    //同名列表-确认关联
    async submitAuditJoinClassToMainParent(params = {}) {
      let res = await service.submitAuditJoinClassToMainParent(params);
      if (res.errorCode === 0) {
        if (res.data.result === 1) {
          this.$router.push({
            path: "/searchSchool/submitSucceed",
            query: {
              flag: 2
            }
          });
        }
      }
    }
  },
  created() {
    // console.log(this.$route.query.gradeList);
    console.log(this.$route.query.schoolid)
  },
  mounted() {
    this.gradeList();
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  height: 100vh;
  background: #fff;
  .noSchool {
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      margin-top: 200px;
    }
    .center {
      text-align: center;
      color: #c2c2c2;
      margin-top: 40px;
      div {
        margin-bottom: 10px;
      }
    }
    .bottom {
      margin-top: 150px;
      width: 80vw;
      height: 80px;
      line-height: 80px;
      background: linear-gradient(
        289deg,
        rgba(195, 235, 129, 1) 0%,
        rgba(195, 235, 129, 1) 0%,
        rgba(132, 206, 9, 1) 100%
      );
      opacity: 1;
      border-radius: 100px;
      text-align: center;
      color: #fff;
    }
  }
  .haveSchool {
    .SchoolName {
      height: 100px;
      text-align: center;
      line-height: 100px;
      color: #84ce09;
      font-size: 38px;
      border-top: 1px solid rgb(241, 241, 241);
      border-bottom: 1px solid rgb(241, 241, 241);
    }
    .grade {
      //   height: 100px;
      line-height: 100px;
      margin-left: 38px;
      .gradeList {
        ul {
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-between;
          li {
            width: 200px;
            height: 60px;
            background: rgba(132, 206, 9, 1);
            opacity: 1;
            border-radius: 30px;
            text-align: center;
            line-height: 60px;
            color: #fff;
            margin-bottom: 40px;
            margin-right: 37px;
          }
        }
      }
    }
    .recommend {
      position: fixed;
      bottom: 100px;
      width: 100vw;
      text-align: center;
      .active1 {
        color: #999999;
      }
      .active2 {
        color: #84ce09;
      }
    }
  }
}
.classAndGrade {
  width: 90vw;
  //   height: 500px;
  border-radius: 20px;
  .deleteBtn {
    height: 70px;
    text-align: right;
    line-height: 70px;
    margin-right: 20px;
  }
  .main {
    margin: 0;
    margin-bottom: 40px;
    .main1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      .p1 {
        font-size: 40px;
        //   font-weight:600;
        margin-bottom: 60px;
      }
      .p2 {
        margin-bottom: 10px;
      }
    }
    .main2 {
      margin-top: 60px;
      .message {
        width: 70%;
        // height: 80px;
        background: #f6f6f6;
        line-height: 80px;
        text-align: center;
        margin: 0 auto;
        border-radius: 15px;
        p {
          height: 80px;
          line-height: 80px;
          color: #666666;
          margin-right: 10px;
        }
        .messageLis {
          padding: 0 25px;
          display: flex;
          line-height: 80px;
        }
      }
      .warn {
        margin-top: 20px;
        p {
          color: #fc7878;
          font-size: 20px;
          text-align: center;
        }
      }
    }
  }
  .bottom {
    display: flex;
    height: 100px;
    line-height: 100px;
    text-align: center;
    div {
      flex: 1;
    }
    .noRelevance {
      color: #c2c2c2;
    }
    .ensureRelevance {
      color: #84ce09;
    }
  }
}
</style>