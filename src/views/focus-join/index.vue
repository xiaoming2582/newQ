<template>
  <div class="page">
    <div class="page-bd">
      <!-- 查询开放版是否有录入学生 -->
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="studentList"
          show-toolbar
          title="选择要添加的学生"
          value-key="name"
          @cancel="popupShow = false"
          @confirm="handleStudentConfirm"
        ></van-picker>
      </van-popup>
      <form action ref="form">
        <div class="cells-title2 titleHZM">
          <span class="longString"></span
          ><span class="gradeTitle newGradeTitle"
            >您的亲人邀请您一起关注孩子成长</span
          >
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">学生姓名</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入学生姓名"
                maxlength="5"
                v-model="form.studentName"
              />
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
              <label class="label">出生日期</label>
            </div>
            <div class="cell-bd" @click="birthday">
              <input
                class="input"
                placeholder="请选择出生日期"
                v-model="form.dateOfBirth"
                readonly="readonly"
              />
            </div>
          </div>
          <!-- 出生日期选择 -->
          <van-popup class="round" v-model="birthdayBtn" position="bottom">
            <van-datetime-picker
              @cancel="birthdayBtn = false"
              @confirm="handleConfirm"
              v-model="startDate"
              type="date"
              :min-date="minDate"
              :formatter="formatter"
            ></van-datetime-picker>
          </van-popup>
        </div>
        <div class="cells-title2 titleHZM">
          <span class="longString"></span
          ><span class="gradeTitle">家长信息</span>
          <!-- <span class="suggest">建议添加多个家长信息</span> -->
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">联系方式</label>
            </div>
            <div class="cell-bd">
              <input
                type="number"
                class="input"
                pattern="[0-9]*"
                placeholder="请输入您的手机号码"
                v-model="form.tel"
                @input="changeTel(form.tel)"
              />
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd">
              <input
                class="input text-left"
                maxlength="6"
                placeholder="请输入验证码"
                v-model="form.code"
              />
            </div>
            <div class="cell-ft">
              <button
                :disabled="noMore"
                ref="gainYZM"
                class="HZMlabel gainYZM2"
                @click="acquireYZM"
              >
                获取验证码
              </button>
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">您与孩子的关系</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="form.relation">
                <optgroup disabled hidden></optgroup>
                <option
                  :value="option.id"
                  v-for="(option, index) in relationList"
                  :key="index"
                  >{{ option.name }}</option
                >
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- 学生名字重复 -->
    <!-- <van-dialog
      v-model="repeatName"
      title="学生名字重复"
      show-cancel-button
      class="repeatName"
      @confirm="handleAdd"
    >
      <p>该班已存在以下同名学生</p>
      <p>请确认是否继续添加</p>
      <div class="message" v-for="(item, index) in messageName" :key="index">
        {{ item }}
      </div>
    </van-dialog> -->

    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button
          size="large"
          type="info"
          class="no-radius"
          @click="handleSubmit"
          >提交</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import dayjs from "dayjs";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
import formatter from "@/mixins/date-formatter";
export default {
  name: "studentAdd",
  mixins: [sex, relation, formatter],
  data() {
    return {
      minDate: new Date(1966, 10, 1),
      startDate: new Date(),
      popupShow: false,
      openDirection: this.$route.query.openDirection,
      query: {
        teacherId: this.$store.state.user.info.id
      },
      form: {
        openId: this.$store.state.user.info.openId,
        studentName: "",
        sex: 1,
        dateOfBirth: "",
        code: "",
        relation: 1,
        tel: ""
      },
      classList: [],
      studentList: [],
      repeatName: false,
      messageName: [],
      obj: {},
      birthdayBtn: false,
      noMore: false,
      timer: null,
      whetherTel: 1 //0手机号不存在，1手机号存在
    };
  },
  methods: {
    //点击获取验证码
    acquireYZM() {
      if (isPhone(this.form.tel)) {
        // this.telVeriftCode(this.form.tel);
        this.noMore = true;
        this.$nextTick(() => {
          let newNum = "";
          console.log(this.$refs.gainYZM);
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
    //获取验证码
    async telVeriftCode(tel) {
      let res = await service.telVeriftCode({ tel, codeType: 1 });
      if (res.errorCode === 0) {
        this.$toast("验证码已经发送，请注意查收");
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    },
    handleConfirm(value) {
      let now = dayjs(new Date(value).getTime()).format("YYYY-MM-DD");
      this.form.dateOfBirth = now;
      this.birthdayBtn = false;
    },
    birthday() {
      console.log(1);
      this.birthdayBtn = true;
    },
    handleStudentConfirm(value, index) {
      //开放版添加学生
      let { studentId } = value;
      let { classId } = this.form;
      this.addStudentWithStudentId({ classId, studentId });
    },
    changeTel(item) {
      let tel = item.tel;
      if (isPhone(tel)) {
        // this.queryStudentOpen({ tel });
      } else {
        //this.$toast("手机号格式不对");
      }
    },
    handleAddLinkMan() {
      this.form.linkMan.push({ relation: 1, tel: "" });
    },
    handleDelLinkMan(index) {
      return this.form.linkMan.splice(index, 1);
    },
    handleSubmit() {
      let { studentName, sex, dateOfBirth, code, relation, tel } = this.form;
      if (studentName == "") {
        this.$toast("请输入学生姓名");
        return false;
      }
      if (sex == "") {
        this.$toast("请选择性别");
        return false;
      }
      if (dateOfBirth == "") {
        this.$toast("请选择出生日期");
        return false;
      }
      if (tel == "") {
        this.$toast("请输入您的手机号码");
        return false;
      }
      if (code == "") {
        this.$toast("请输入验证码");
        return false;
      }
      if (relation == "") {
        this.$toast("请选择学生与家长的关系");
        return false;
      }

      // let obj = Object.assign({}, this.form);
      // console.log(obj);
      // // return false;
      // // this.studentAdd(obj);
      // this.queryStudentSame(obj);
      // if (this.whetherTel) {
      //   this.$router.push({
      //     path: "/single"
      //   });
      // } else {
      //   this.$router.push({
      //     path: "/searchSchool/submitSucceed"
      //   });
      // }
      let params = {
        // studentid: 2,
        studentid: this.$route.query.studentid,
        relation: this.form.relation,
        phone: this.form.tel,
        openid: this.$route.query.openid
        // openid: "oCjqXxOBka7ksyAh9CDLvlacEOxY"
      };
      this.parentInvitationNewParentToStudent(params);
    },
    //提交
    async parentInvitationNewParentToStudent(params = {}) {
      let res = await service.parentInvitationNewParentToStudent(params);
      if (res.errorCode === 0) {
        let params = {
          openid: this.$route.query.openid,
          roletype: 2
        };
        this.getUserAccountDetail(params);
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
    //  查询学生是否已录入
    async queryStudentSame(obj) {
      console.log(obj);
      let data = {
        studentName: obj.studentName,
        classId: obj.classId,
        linkMans: obj.linkMan
      };
      let res = await service.queryStudentSame(data);
      if (res.errorCode === 0) {
        if (res.data.length === 0) {
          // 未出现重复名字
          this.studentAdd(obj);
        } else {
          // 出现重复名字
          this.messageName = res.data;
          this.repeatName = true;
          this.obj = obj;
        }
      } else {
        // 学生已经录入
        this.$dialog.alert({
          message: res.errorMsg
        });
      }
    },

    handleAdd() {
      this.studentAdd(this.obj);
    },
    //学生新增
    async studentAdd(params = {}) {
      let res = await service.studentAdd(params);
      console.log(res);
      if (res.errorCode === 0) {
        this.$refs.form.reset();
        this.$router.go(-1);
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      } else if (res.errorCode === 2) {
        this.$dialog
          .alert({
            message: `${res.errorMsg}`
          })
          .then(() => {
            this.$refs.form.reset();
            this.$router.go(-1);
          });
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //查询存在的学生
    // async queryStudentOpen(params = {}) {
    //   let res = await service.queryStudentOpen(params);
    //   if (res.errorCode === 0 && res.data.length) {
    //     this.popupShow = true;
    //     this.studentList = res.data;
    //   }
    // },
    //老师录入学生（开放版存在的学生）
    async addStudentWithStudentId(params = {}) {
      let res = await service.addStudentWithStudentId(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //查询老师能预录入学生的班级
    async queryTeacherClass(params = {}) {
      let res = await service.queryTeacherClass(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
        // this.form.classId = this.classList[0].classId;
      }
    }
  },
  mounted() {
    this.queryTeacherClass(this.query);
  }
};
</script>
<style lang="less" scoped>
.cells-footer {
  .cell {
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
  }
  a {
    font-size: 28px;
    border-radius: 0;
  }
}

.ico {
  justify-content: flex-end;
  align-items: center;
  font-size: 40px;
  color: #a2e14e;
}
.add {
  background: transparent;
  font-size: 26px;
  border: none;
  color: #a2e14e;
  padding: 0 !important;
  margin-left: 10px;
}
// .cells-title2 {
//   color: #808080;
//   font-size: 30px;
//   margin: 20px 0;
//   padding: 0 30px;
// }
.cells {
  width: 91vw;
  border-radius: 20px;
  margin: 0 auto;
}
.suggest {
  margin-left: 250px;
  color: #c2c2c2;
  font-size: 25px;
}
.gainYZM2 {
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
.newGradeTitle {
  color: #84ce09 !important;
}
</style>
