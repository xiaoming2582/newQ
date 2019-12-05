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
      <div class="cells mb-20">
        <div class="area">
          <div><span>学校区域</span></div>

          <div class="selectRegion" @click="searchDistrict">
            <span class="region">{{ region }}</span>
            <van-icon color="#CCCCCC" name="arrow" />
          </div>
        </div>
        <div class="area">
          <div><span>班级类型</span></div>

          <div class="selectRegion" @click="gradeTypeBtn">
            <span class="region">{{ gradeType }}</span>
            <van-icon color="#CCCCCC" name="arrow" />
          </div>
        </div>
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
        <div class="area">
          <div><span>年级</span></div>

          <div class="selectRegion" @click="gradeBtn">
            <span class="region">{{ grade }}</span>
            <van-icon color="#CCCCCC" name="arrow" />
          </div>
        </div>
        <!-- <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label for class="label">年级</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="form.gradeId">
              <option
                :value="option.gradeId"
                v-for="(option, index) in grdeList"
                :key="index"
                >{{ option.gradeName }}</option
              >
            </select>
          </div>
        </div> -->
        <div class="cell">
          <div class="cell-hd">
            <label class="label">班级名称</label>
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
      <!-- 班级类型选择 -->
      <van-popup
        v-model="gradeTypeOff"
        @close="onCloseGradeType"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
      <!-- 年级选择 -->
      <van-popup v-model="gradeOff" @close="onCloseGrade" position="bottom">
        <van-picker
          show-toolbar
          :columns="gradeColumns"
          @cancel="onCancelGrade"
          @confirm="onConfirmGrade"
        />
      </van-popup>
      <!-- 学校区域选择 -->
      <van-popup round v-model="regionOff" @close="onClose" position="bottom">
        <van-area
          :area-list="areaList"
          :item-height="40"
          @confirm="onAddrConfirm"
          @cancel="shut"
          :value="addrCode"
        />
      </van-popup>

      <!-- <div class="cells">
        <div class="cell min-h120">
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
        <div class="cell min-h120 cell-select cell-select-after">
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
        <div class="cell min-h120">
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
        <div class="cell min-h120">
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
              class="HZMlabel gainYZM"
              @click="acquireYZM"
            >
              获取验证码
            </button>
            <span v-if="hidden" style="color:#8d8d8d;">{{ second }}s</span>
          </div>
        </div>
      </div> -->
    </div>
    <div class="page-ft">
      <!-- <div class="fixed-bottom" style="z-index: 100;">
        <van-button
          size="large"
          type="info"
          class="no-radius"
          @click="handleSubmit"
          >提交</van-button
        >
      </div> -->
      <div class="nextStep" @click="submit">提交</div>
    </div>
    <!-- 同名班级 -->
    <van-popup
      class="classAndGrade"
      v-model="identicalNameOff"
      @close="onClosEequal"
    >
      <div class="main">
        <div class="mainTitle">提示</div>
        <div class="main2">此学校已存在同名班级是否继续建立？</div>
      </div>
      <div class="bottom">
        <div class="noRelevance" @click="continueAdd">继续添加</div>
        <div class="ensureRelevance" @click="alter">更改名称</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { sex } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
import areaList from "@/utils/area";
export default {
  name: "createClass",
  mixins: [sex],
  components: {
    areaList
  },
  data() {
    return {
      hidden: false,
      timer: null,
      second: 60,
      popupShow: false,
      form: {
        schoolName: "",
        gradeId: null,
        id: 0,
        sex: 1,
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
      region: "请选择区域",
      gradeType: "请选择班级类型",
      regionOff: false,
      areaList: null,
      addrCode: "440105",
      province: "",
      city: "",
      district: "",
      gradeTypeOff: false,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      gradeColumns: ["杭州112", "宁波", "温州", "嘉兴", "湖州"],
      grade: "",//年级
      gradeOff: false,
      identicalNameOff: false
    };
  },
  methods: {
    continueAdd(){
      this.$router.push({
        path:"/teacher/success"
      })
    },
    alter() {
      this.identicalNameOff = false;
    },
    onClosEequal() {
      this.identicalNameOff = false;
    },
    //提交
    submit() {
       if (this.region == "请选择区域") {
        this.$toast("请选择区域");
        return false;
      }
      if (this.gradeType=="请选择班级类型") {
        this.$toast("请选择班级类型");
        return false;
      }
      if (this.form.schoolName == "") {
        this.$toast("请输入学校名称");
        return false;
      }
      if (this.grade == "") {
        this.$toast("请选择年级");
        return false;
      }
      if (this.form.className == "") {
        this.$toast("请输入班级名称");
        return false;
      }
      //同名班级
      this.identicalNameOff = true;
    },
    gradeBtn() {
      this.gradeOff = true;
    },
    onConfirm(event) {
      console.log(event);
      this.gradeType = event;
      this.gradeTypeOff = false;
    },
    onCancel() {
      this.gradeTypeOff = false;
    },
    onConfirmGrade(event) {
      console.log(event);
      this.grade = event;
      this.gradeOff = false;
    },
    onCancelGrade() {
      this.gradeOff = false;
    },
    onCloseGrade() {
      this.gradeOff = false;
    },
    onCloseGradeType() {
      this.gradeTypeOff = false;
    },
    gradeTypeBtn() {
      this.gradeTypeOff = true;
    },
    init() {
      // 初始化地址选择器
      this.areaList = areaList; // 初始化选择器数据
    },
    onAddrConfirm(e) {
      // 点击确认，获取所选的省市区数据
      // 确定选择,返回的必定是三元素数组
      console.log("this.onAddrConfirm=>e", e);
      this.province = e[0].name;
      this.city = e[1].name;
      this.district = e[2].name;
      this.region = this.province + this.city + this.district;
      this.regionOff = false;
    },
    shut() {
      this.regionOff = false;
    },
    onClose() {
      this.regionOff = false;
    },
    searchDistrict() {
      this.regionOff = true;
    },
    handleConfirm(value, index) {
      this.form.schoolName = value.schoolTemplateName;
      this.form.id = value.id;
      this.popupShow = false;
    },
    handleSearch(e) {
      this.querySchoolName(e.target.value);
    },
    // handleSecond() {
    //   if (isPhone(this.form.tel)) {
    //     this.telVeriftCode(this.form.tel);
    //   } else {
    //     this.$toast("请正确填写手机号");
    //   }
    // },
    //点击获取验证码
    acquireYZM() {
      if (isPhone(this.form.tel)) {
        // this.telVeriftCode(this.form.tel);
        this.noMore = true;
        this.$nextTick(() => {
          let newNum = "";
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
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    handleSubmit() {
      let {
        schoolName,
        gradeId,
        className,
        teacherName,
        tel,
        code
      } = this.form;
      if (schoolName == "") {
        this.$toast("请输入学校全称");
        return false;
      }
      if (!gradeId) {
        this.$toast("请选择年级");
        return false;
      }
      if (className == "") {
        this.$toast("请输入班级名称");
        return false;
      }
      if (teacherName == "") {
        this.$toast("请输入老师姓名");
        return false;
      }
      if (code == "") {
        this.$toast("请填写手机验证码");
        return false;
      }
      if (isPhone(tel)) {
        this.addPlaySchoolWithTemplate(this.form);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
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
    this.init();
    console.log(this.$route.query.teacherName)
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
  width: 90vw;
  height: 90px;
  background: linear-gradient(
    289deg,
    rgba(195, 235, 129, 1) 0%,
    rgba(195, 235, 129, 1) 0%,
    rgba(132, 206, 9, 1) 100%
  );
  opacity: 1;
  border-radius: 100px;
  text-align: center;
  line-height: 90px;
  color: #fff;
  margin: 100px auto;
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
</style>
