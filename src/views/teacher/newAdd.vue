<template>
  <div class="page">
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="schoolList"
          show-toolbar
          value-key="schoolTemplateName"
          @cancel="popupShow = false"
          @confirm="handleConfirm"
        ></van-picker>
      </van-popup>
      <div class="cells-title2 titleHZM">
        <span class="longString"></span><span class="gradeTitle">学校信息</span>
      </div>
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label class="label">学校名称</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入学校名称"
                v-model="form.schoolName"
                @blur="handleSearch($event)"
              />
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label class="label">班级</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入班级名称，如一年级（1）班"
                v-model="form.className"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="cells-title2 titleHZM">
        <span class="longString"></span><span class="gradeTitle">老师信息</span>
      </div>
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label class="label">姓名</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入您的姓名"
                maxlength="5"
                v-model="form.teacherName"
              />
            </div>
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label for class="label">性别</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="form.sex">
              <option
                :value="option.id"
                v-for="(option, index) in sexList"
                :key="index"
                >{{ option.name }}</option
              >
            </select>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label class="label">手机号码</label>
          </div>
          <div class="cell-bd">
            <input
              class="input"
              type="number"
              pattern="[0-9]*"
              placeholder="请输入您的手机号码"
              v-model="form.tel"
            />
          </div>
        </div>
        <div class="cell">
          <div class="cell-bd">
            <input
              class="input text-left"
              type="number"
              placeholder="请输入验证码"
              v-model="form.code"
            />
          </div>
          <div class="cell-ft">
            <button
              :disabled="noMore"
              ref="gainYZM"
              class="HZMlabel gainYZM"
              @click="acquireYZM"
            >
              获取验证码
            </button>
            <!-- <span v-if="hidden" style="color:#8d8d8d;">{{ second }}s</span> -->
          </div>
        </div>
      </div>
    </div>
    <div class="page-ft">
      <div class="nextStep" @click="submit">添加</div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { sex } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "createClass",
  mixins: [sex],
  data() {
    return {
      hidden: false,
      timer: null,
      second: 60,
      popupShow: false,
      form: {
        schoolName: "",
        id: 0,
        sex: 2,
        className: "",
        teacherName: "",
        tel: "",
        code: "",
        openId: this.$route.query.openId
      },
      schoolList: [],
      grdeList: [],
      noMore: false,
      timer: null, //定时器
      whetherTel: 0 //0手机不存在，1手机存在
    };
  },
  methods: {
    submit() {
      let { schoolName, className, teacherName, tel, sex, code } = this.form;
      if (schoolName == "") {
        this.$toast("请输入学校名称");
        return false;
      }
      if (className == "") {
        this.$toast("请输入班级名称");
        return false;
      }
      if (teacherName == "") {
        this.$toast("请输入您的姓名");
        return false;
      }
      if (!isPhone(tel)) {
        this.$toast("请正确填写手机号");
        return false;
      }
      if (code == "") {
        this.$toast("请填写手机验证码");
        return false;
      }
      let params = {
        // classid:4,
        classid:this.$route.query.classid,
        name: this.form.teacherName,
        gender: this.form.sex,
        phone: this.form.tel,
        openid: this.$route.query.openid,
      };
      this.teacherInvitationNewTeacherToClass(params);
      // if (this.whetherTel) {
      //   this.$router.push({
      //     path: "/home"
      //   });
      // } else {
      //   this.$router.push({
      //     path: "/searchSchool/submitSucceed"
      //   });
      // }
    },
    //添加
    async teacherInvitationNewTeacherToClass(params = {}) {
      let res = await service.teacherInvitationNewTeacherToClass(params);
      if (res.errorCode === 0) {
        if (res.data.result === 1) {
          this.$router.push({
            path: "/searchSchool/submitSucceed",
            query:{
              flag:1
            }
          });
        }
      } else if (res.errorCode === -1) {
        if (res.errorMsg === "老师已存在该班级") {
          let params = {
            openid: this.$route.query.openid,
            roletype: 2
          };
          this.getUserAccountDetail(params)
        }
      }
    },
    //获取当前用户详细信息
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
    handleConfirm(value, index) {
      this.form.schoolName = value.schoolTemplateName;
      this.form.id = value.id;
      this.popupShow = false;
    },
    handleSearch(e) {
      this.querySchoolName(e.target.value);
    },
    //点击获取验证码
    acquireYZM() {
      if (isPhone(this.form.tel)) {
        // this.telVeriftCode(this.form.tel);
        this.noMore = true;
        this.$nextTick(() => {
          let newNum = "";
          // console.log(this.$refs.gainYZM)
          this.$refs.gainYZM.style.background = "#C2C2C2";
          this.$refs.gainYZM.innerHTML = "60s";
          let num = parseInt(this.$refs.gainYZM.innerHTML);
          this.timer = setInterval(() => {
            --num;
            newNum = num + "s";
            this.$refs.gainYZM.innerHTML = newNum;
            if (parseInt(newNum) === 0) {
              this.$refs.gainYZM.style.background = "#84CE09";
              this.$refs.gainYZM.innerHTML = "获取验证码";
              clearInterval(this.timer);
              this.noMore = false;
            }
          }, 1000);
        });
        this.telVeriftCode(this.form.tel);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    // handleSubmit() {
    //   let {
    //     schoolName,
    //     className,
    //     teacherName,
    //     tel,
    //     sex,
    //     code
    //   } = this.form;
    //   if (schoolName == "") {
    //     this.$toast("请输入学校全称");
    //     return false;
    //   }
    //   if (!gradeId) {
    //     this.$toast("请选择年级");
    //     return false;
    //   }
    //   if (className == "") {
    //     this.$toast("请输入班级名称");
    //     return false;
    //   }
    //   if (teacherName == "") {
    //     this.$toast("请输入老师姓名");
    //     return false;
    //   }
    //   if (code == "") {
    //     this.$toast("请填写手机验证码");
    //     return false;
    //   }
    //   if (isPhone(tel)) {
    //     this.addPlaySchoolWithTemplate(this.form);
    //   } else {
    //     this.$toast("请正确填写手机号");
    //   }
    // },
    //获取验证码
    async telVeriftCode(tel) {
      let res = await service.telVeriftCode({ tel, codeType: 0 });
      if (res.errorCode === 0) {
        this.$toast("验证码已经发送，请注意查收");
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //查询学校模板
    async querySchoolName(schoolName) {
      let res = await service.querySchoolName({ schoolName });
      if (res.errorCode === 0 && res.data.length) {
        this.popupShow = true;
        this.schoolList = res.data;
      }
    },
    //查询年级
    async queryGrade(params = {}) {
      let res = await service.queryGrade(params);
      if (res.errorCode === 0) {
        this.grdeList = res.data;
      }
    },
    //创建班级
    async addPlaySchoolWithTemplate(params = {}) {
      let res = await service.addPlaySchoolWithTemplate(params);
      if (res.errorCode === 0) {
        this.second = 60;
        this.hidden = false;
        //定时器清除
        window.clearInterval(this.timer);
        let _cookie = Cookies.getJSON("info");
        let obj = Object.assign({}, _cookie, res.data);
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
            this.$router.push({
              path: "/teacher/success",
              query: {
                classId: res.data.classId
              }
            });
          }
        });
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    this.queryGrade();
  }
};
</script>
<style lang="less" scoped>
// .cells-title2 {
//   color: #808080;
//   font-size: 30px;
//   margin: 20px 0;
//   padding: 0 30px;
// }
.gainYZM {
  width: 160px;
  height: 60px;
  background: rgba(132, 206, 9, 1);
  opacity: 1;
  border: 0;
  border-radius: 30px;
  color: #fff !important;
  text-align: center;
  line-height: 60px;
  font-size: 25px !important;
}
.HZMlabel {
  font-size: 30px;
  font-family: PingFang SC;
  color: rgba(149, 207, 59, 1);
}
.nextStep {
  width: 100vw;
  height: 90px;
  background: linear-gradient(
    289deg,
    rgba(195, 235, 129, 1) 0%,
    rgba(195, 235, 129, 1) 0%,
    rgba(132, 206, 9, 1) 100%
  );
  opacity: 1;
  text-align: center;
  line-height: 90px;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.area {
  height: 100px;
  // line-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgb(233, 233, 233);
  color: #333333;
  padding: 0 30px;
  .selectRegion {
    display: flex;
    align-items: center;
  }
  .region {
    font-size: 30px;
    margin-right: 10px;
    color: #666666;
  }
}
.classAndGrade {
  width: 90vw;
  //   height: 500px;
  border-radius: 20px;
  .main {
    text-align: center;
    margin-bottom: 80px;
    .mainTitle {
      font-size: 35px;
      margin: 30px 0 40px 0;
      font-weight: bold;
    }
    .main2 {
      font-weight: bold;
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
      color: #84ce09;
    }
    .ensureRelevance {
      color: #c2c2c2;
    }
  }
}
.cells {
  width: 91vw;
  border-radius: 20px;
  margin: 0 auto;
}
</style>
