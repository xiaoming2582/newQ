<template>
  <div class="wrapper">
    <div class="area">
      <div><span>学校区域</span></div>

      <div class="selectRegion" @click="searchDistrict">
        <span class="region">{{ region }}</span>
        <van-icon color="#CCCCCC" name="arrow" />
      </div>
    </div>
    <van-popup round v-model="regionOff" @close="onClose" position="bottom">
      <van-area
        :area-list="areaList"
        :item-height="40"
        @confirm="onAddrConfirm"
        @cancel="shut"
        :value="addrCode"
      />
    </van-popup>

    <div class="schoolName">
      <van-cell-group>
        <van-field
          v-model="gradeTel"
          label="学校名称"
          placeholder="请输入学校名称"
          :border="false"
          @input="onChange"
        />
      </van-cell-group>
    </div>
    <div class="dimSearch" v-if="schoolShow">
      <ul>
        <li
          v-for="(item, index) in schoolArr"
          :key="index"
          @click="schoolNameBtn(item)"
        >
          <div>{{ item.schoolname }}</div>
          <div><van-icon color="#fff" name="arrow" /></div>
        </li>
        <!-- <li>
            <div>广州天河黄河幼儿园</div>
            <div><van-icon color="#fff" name="arrow" /></div>
          </li> -->
      </ul>
    </div>
    <div class="searchBtn" @click="searchBtn">搜索</div>
  </div>
</template>

<script>
import areaList from "@/utils/area";
import service from "@/api";
export default {
  components: {
    areaList
  },
  data() {
    return {
      gradeTel: "",
      region: "请选择地区",
      regionOff: false,
      areaList: null,
      addrCode: "440106",
      province: "",
      city: "",
      district: "",
      schoolArr: [
        // {
        //   schoolid: "1",
        //   schoolname: "华景幼儿园"
        // },
      ],
      schoolShow: false,
      schoolid: 0 //学校ID
    };
  },
  watch: {},
  computed: {},
  methods: {
    schoolNameBtn(item) {
      // console.log(item.schoolid);
      this.schoolid = item.schoolid;
      this.gradeTel = item.schoolname;
      this.schoolShow = false;
    },
    onClose() {
      this.regionOff = false;
    },
    onChange(value) {
      this.schoolid = 0;
      // console.log(value);
      let params = {
        schoolname: value,
        regioncode: "01"
      };
      if (value) {
        this.querySchoolList(params);
      } else {
        this.schoolShow = false;
      }
    },
    //学校查询
    async querySchoolList(params = {}) {
      let res = await service.querySchoolList(params);
      if (res.errorCode === 0) {
        if (res.data) {
          this.schoolShow = true;
          this.schoolArr = res.data;
        }
      }
    },
    searchDistrict() {
      this.regionOff = true;
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
    searchBtn() {
      if (this.region == "请选择地区") {
        this.$toast("请选择地区");
        return false;
      }
      if (this.gradeTel == "") {
        this.$toast("输入学校名称");
        return false;
      }
      let params = {
        schoolid: this.schoolid,
        schoolname: this.gradeTel
      };
      this.querySchoolClassList(params);
    },
    //搜索
    async querySchoolClassList(params = {}) {
      let res = await service.querySchoolClassList(params);
      if (res.errorCode === 0) {
        this.$router.push({
          path: "/searchSchool/result",
          query: {
            schoolid: this.schoolid,
            schoolname: this.gradeTel,
          }
        });
      } else {
        this.$toast(res.errorMsg);
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 90vw;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  //   display: flex;
  // justify-content:center;
  // text-align: center;
  margin: 20px auto;
  padding: 0 20px;
  .area {
    height: 100px;
    // line-height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(233, 233, 233);
    color: #333333;
    .selectRegion {
      display: flex;
      align-items: center;
    }
    .region {
      font-size: 25px;
      margin-right: 10px;
    }
  }
  .schoolName {
    height: 100px;
    line-height: 100px;
    .van-cell {
      padding: 0;
      line-height: 100px;
    }
  }
  .dimSearch {
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 80vw;
    // height: 200px;
    background: #b4b2b2;
    border-radius: 20px;
    padding: 0 30px;
    color: #fff;
    margin-bottom: 100px;
    ul {
      li {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
.wrapper /deep/ .van-field__control {
  text-align: right;
  font-size: 25px;
  color: #333333;
}
.wrapper /deep/ .van-field__control::-webkit-input-placeholder {
  color: #333333;
}
.searchBtn {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100%;
  background: linear-gradient(
    289deg,
    rgba(195, 235, 129, 1) 0%,
    rgba(195, 235, 129, 1) 0%,
    rgba(132, 206, 9, 1) 100%
  );
  text-align: center;
  line-height: 80px;
  color: #fff;
}

.wrapper /deep/.van-picker__cancel {
  color: #c2c2c2 !important;
}
.van-popup--bottom {
  border-radius: 20px 20px 0px 0px;
}
</style>