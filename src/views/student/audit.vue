<template>
  <div class="page">
    <div class="page-bd">
      <form action ref="form">
        <div class="cells-title2 titleHZM">
          <span class="longString"></span
          ><span class="gradeTitle">学生信息</span>
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">学生姓名</label>
            </div>
            <div class="cell-bd">
              <input
                disabled="disabled"
                class="input"
                placeholder="请输入学生姓名"
                maxlength="10"
                v-model="form.studentName"
              />
            </div>
          </div>
          <div class="cell">
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
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label class="label">出生日期</label>
            </div>
            <div class="cell-bd">
              <input
                disabled="disabled"
                class="input"
                placeholder="请输入学生姓名"
                maxlength="10"
                v-model="form.birthday"
              />
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label class="label">家庭地址</label>
            </div>
            <div class="cell-bd">
              <input
                disabled="disabled"
                class="input"
                placeholder="请输入学生姓名"
                v-model="form.site"
              />
            </div>
          </div>
        </div>

        <div class="cells-title2 titleHZM">
          <span class="longString"></span
          ><span class="gradeTitle">家长信息</span>
        </div>
        <div
          class="cells cellsList"
          v-for="(link, index) in form.linkMan"
          :key="index"
        >
          <div class="cell">
            <div class="cell-hd">
              <label class="label">联系方式</label>
            </div>
            <div class="cell-bd">
              <input
                disabled="disabled"
                type="number"
                class="input"
                pattern="[0-9]*"
                placeholder="请输入手机号"
                v-model="link.tel"
              />
            </div>
          </div>
          <!-- <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">家长与学生的关系</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="link.relation">
                <option
                  :value="option.id"
                  v-for="(option, index) in relationList"
                  :key="index"
                  >{{ option.name }}</option
                >
              </select>
            </div>
          </div> -->
          <div class="cell">
            <div class="cell-hd">
              <label class="label">家长与学生的关系</label>
            </div>
            <div class="cell-bd">
              <input
                disabled="disabled"
                type="number"
                class="input"
                pattern="[0-9]*"
                placeholder="请输入手机号"
                v-model="link.tel"
              />
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
            >拒绝</van-button
          >
          <van-button
            size="large"
            type="info"
            class="no-radius"
            @click="handleSubmit"
            >通过</van-button
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
        studentName: "",
        sex: "",
        birthday: "",
        site: ""
      },
      classList: [],
      studentList: [],
      deleteButton: false //控制删除按钮的出现
    };
  },
  methods: {
    handleDel() {
      let { studentId } = this.form;
      if (studentId) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定要移除学生吗？"
          })
          .then(() => {
            this.studentDelete({
              studentId,
              openId: this.$store.state.user.info.openId,
              classId: this.$route.query.classId,
              tel: this.querys.tel
            });
          })
          .catch(() => {});
      }
    },
    handleSubmit() {
      let { studentName, classId, linkMan } = this.form;
      if (studentName == "" || !studentName.length) {
        this.$toast("请输入学生姓名");
        return false;
      }
      if (!classId) {
        this.$toast("请选择学生所在班级");
        return false;
      }
      for (let i = 0; i < linkMan.length; i++) {
        let tel = linkMan[i].tel;
        if (!isPhone(tel)) {
          this.$toast("请正确填写手机号");
          return;
        }
      }
      this.studentUpdate(this.form);
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

