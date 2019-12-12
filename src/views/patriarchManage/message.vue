<template>
  <div class="page">
    <div class="page-bd">
      <form action ref="form">
        <div class="cells-title2 titleHZM">
          <!-- <span class="longString"></span
          ><span class="gradeTitle">老师信息</span> -->
        </div>
        <div class="cells">
          <!-- <div class="cell">
            <div class="cell-hd">
              <label class="label">关系</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入学生姓名"
                maxlength="10"
                v-model="form.studentName"
              />
            </div>
          </div> -->
          <!-- <div class="cell">
            <div class="cell-hd">
              <label class="label">性别</label>
            </div>
            <div class="cell-bd">
              <input
                disabled="disabled"
                class="input"
                placeholder="请输入学生姓名"
                maxlength="10"
                v-model="form.sex"
              />
            </div>
          </div> -->
          <div class="cell">
            <div class="cell-hd">
              <label class="label">手机号码</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入学生姓名"
                maxlength="10"
                v-model="form.birthday"
              />
            </div>
          </div>
          <div class="cell cell-select cell-select-after min-h100">
            <div class="cell-hd">
              <label for class="label">关系</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="form.relation">
                <!-- 兼容性问题修改 -->
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
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <div class="flex">
          <van-button
            size="large"
            type="danger"
            class="no-radius"
            @click="handleDel"
            >移除</van-button
          >
          <van-button
            size="large"
            type="info"
            class="no-radius"
            @click="handleSubmit"
            >保存</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "studentEdit",
  mixins: [sex, relation],
  data() {
    return {
      query: {
        teacherId: this.$store.state.user.info.id
      },
      querys: {
        openId: this.$store.state.user.info.openId,
        tel: this.$route.query.tel,
        studentId: this.$route.query.studentId
      },
      form: {
        studentid: this.$store.state.user.info.studentId,
        birthday: this.$route.query.phone,
        site: "",
        relation: 1
      },
      classList: [],
      studentList: [],
      deleteButton: false //控制删除按钮的出现
    };
  },
  methods: {
    handleDel() {
      let parentid = this.$route.query.parentid;
      if (parentid) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定要移除家长吗？"
          })
          .then(() => {
            let params = {
              parentid:parentid
            };
            this.removeRelation(params);
          })
          .catch(() => {});
      }
    },
    //移除
    async removeRelation(params = {}) {
      let res = await service.removeRelation(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    handleSubmit() {
      let { birthday, relation } = this.form;
      // console.log(birthday)
      if (!isPhone(birthday)) {
        this.$toast("请正确填写手机号");
        return;
      }
      if (relation == "") {
        this.$toast("请选择关系");
        return false;
      }
      //    switch (relation) {
      //   case 1:
      //     this.form.relation = "妈妈";
      //     break;
      //   case 2:
      //     this.form.relation = "爸爸";
      //     break;
      //   case 3:
      //     this.form.relation = "爷爷";
      //     break;
      //   case 4:
      //     this.form.relation = "奶奶";
      //     break;
      //   case 5:
      //     this.form.relation = "外公";
      //     break;
      //   case 6:
      //     this.form.relation = "外婆";
      //     break;
      //   case 7:
      //     this.form.relation = "监护人";
      //     break;
      // }
      let params = {
        studentid: this.$store.state.user.info.studentId,
        parentid: this.$route.query.parentid,
        phone: this.form.birthday,
        relation: this.form.relation
      };
      this.updateRelation(params);
    },
    //保存
    async updateRelation(params = {}) {
      let res = await service.updateRelation(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //学生信息查询
    // async studentInfoQuery(params = {}) {
    //   let res = await service.studentInfoQuery(params);
    //   if (res.errorCode === 0) {
    //     this.form = res.data[0];
    //   }
    // },

    // 查询编辑学生资料(20191006)
    async queryUpdateStudnetInfo(params = {}) {
      let res = await service.queryUpdateStudnetInfo(params);
      console.log(res);
      if (res.errorCode === 0) {
        this.form = res.data;
        if (res.data.linkMan.length > 1) {
          this.deleteButton = true;
        } else {
          this.deleteButton = false;
        }
      }
    },

    //学生修改
    async studentUpdate(params = {}) {
      let res = await service.studentUpdate(params);
      if (res.errorCode === 0) {
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
    //学生删除
    async studentDelete(params = {}) {
      let res = await service.studentDelete(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //查询老师能预录入学生的班级
    async queryTeacherClass(params = {}) {
      let res = await service.queryTeacherClass(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    }
  },
  created() {
    let relation = this.$route.query.relation;
    console.log(relation);
    switch (relation) {
      case "妈妈":
        this.form.relation = 1;
        break;
      case "爸爸":
        this.form.relation = 2;
        break;
      case "爷爷":
        this.form.relation = 3;
        break;
      case "奶奶":
        this.form.relation = 4;
        break;
      case "外公":
        this.form.relation = 5;
        break;
      case "外婆":
        this.form.relation = 6;
        break;
      case "监护人":
        this.form.relation = 7;
        break;
      default:
        this.form.relation = 8;
    }
    console.log(this.form.relation);
  },
  mounted() {
    this.queryTeacherClass(this.query);
    // this.studentInfoQuery(this.querys);
    // console.log(this.querys);
    this.queryUpdateStudnetInfo({ studentId: this.querys.studentId });
  }
};
</script>
<style lang="less" scoped>
.btn-area {
  justify-content: space-between;
  > a {
    width: 200px;
  }
}
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
  font-size: 28px;
  color: #a2e14e;
}
.add {
  background: transparent;
  font-size: 24px;
  border: none;
  color: #a2e14e;
  padding: 0 !important;
}
.cells {
  width: 91vw;
  margin: 0 auto;
  border-radius: 20px;
}
.cellsList {
  margin-bottom: 20px;
}
</style>

