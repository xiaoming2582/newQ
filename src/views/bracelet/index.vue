<template>
  <div>
    <!-- <div>
      <div class="button-sp-area flex top" size-17>
        <a href="javascript:void(0);" id="showDatePicker" @click="popupOne = true">
          <span id="data1">{{ date }}</span>
          <van-icon name="arrow-down" size="16px"></van-icon>
        </a>
      </div>
    </div>
    <van-popup v-model="popupOne" position="bottom">
      <van-datetime-picker
        ref="datetime"
        @cancel="popupOne = false"
        v-model="currentDate"
        @confirm="handleShowDatePicker"
        type="date"
        :formatter="formatter"
      ></van-datetime-picker>
    </van-popup>-->

    <div id="myChart" :style="{width: '100vw', height: '350px'}"></div>
  </div>
</template>

<script>
import service from "@/api";
let echarts = require("echarts/lib/echarts");
import { mapState } from "vuex";
// 引入折线组件
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import formatter from "@/mixins/date-formatter";
import dayjs from "dayjs";
export default {
  name: "hello",
  mixins: [formatter],
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      popupOne: false,
      currentDate: new Date(),
      date: dayjs().format("YYYY-MM-DD")
    };
  },
  computed: {
    ...mapState("user", {
      openId: state => state.info.openId,
      name: state => state.info.name,
      photo: state => state.info.photo,
      totalStarCount: state => state.info.totalStarCount,
      id: state => state.info.id,
      studentId: state => state.info.studentId,
      roleType: state => state.info.roleType,
      isOpen: state => state.info.isOpen
    })
  },
  mounted() {
    this.StudentLessonActive();
    // this.drawLine();
  },
  methods: {
    drawLine(activeData, date) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.$route.query.title,
          x: "center",
          align: "right"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["专心度"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          name: "分钟",
          // data: [
          //   "10:00",
          //   "10:05",
          //   "10:10",
          //   "10:15",
          //   "10:20",
          //   "10:25",
          //   "10:30",
          //   "10:35",
          //   "10:40",
          //   "10:45"
          // ]
          data: date
        },
        yAxis: {
          type: "value",
          name: "专心度",
          max: 6,
          min: 1,
          data: [1, 2, 3, 4, 5, 6]
        },
        series: [
          {
            name: "活跃度",
            type: "line",
            stack: "总量",
            data: activeData
          }
        ]
      });
    },
    handleShowDatePicker(value) {
      let now = dayjs(new Date(value).getTime()).format("YYYY-MM-DD");
      this.date = now;
      this.popupOne = false;
      //   if (this.roleType == 2) {
      //     this.clockStat(this.query);
      //   } else {
      //     this.clockStatWithSchool(this.query);
      //   }
    },

    async StudentLessonActive() {
      let data = {
        studentId: this.studentId,
        day: this.date,
        startTime: this.$route.query.startTime,
        endTime: this.$route.query.endTime,
        type: this.$route.query.type
      };

      let res = await service.StudentLessonActive(data);
      if (res.errorCode === 0) {
        let activeData;
        if (res.data.data === null) {
          activeData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        } else {
          activeData = res.data.data;
        }
        let hour = this.$route.query.startTime.slice(0, 2);
        let min = this.$route.query.startTime.slice(3, 5);
        let date = [];
        for (let i = 0; i < 10; i++) {
          if (parseInt(min) + i * 5 < 60) {
            if (parseInt(min) + i * 5 < 10) {
              date.push(`${hour}:0${parseInt(min) + i * 5}`);
            } else {
              date.push(`${hour}:${parseInt(min) + i * 5}`);
            }
          } else {
            console.log(2);
            if (parseInt(min) + i * 5 - 60 < 10) {
              date.push(
                `${parseInt(hour) + 1 < 10 ? 0 : ""}${parseInt(hour) +
                  1}:0${parseInt(min) + i * 5 - 60}`
              );
            } else {
              date.push(
                `${parseInt(hour) + 1 < 10 ? 0 : ""}${parseInt(hour) +
                  1}:${parseInt(min) + i * 5 - 60}`
              );
            }
          }
        }
        this.drawLine(activeData, date);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.top,
#myChart {
  background: #fff;
}

.top {
  padding: 60px 0px;
  margin-bottom: 20px;
}
</style>
