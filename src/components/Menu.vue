<template>
  <nav class="nav">
    <div class="tab-con" v-if="computedMenu.length < 8">
      <div class="div1">
        <router-link
          :to="{ path: menu.url }"
          class="langur"
          v-for="(menu, index) in computedMenu"
          :key="index"
        >
          <img :src="menu.icon" width="57" height="57" />
          <div class="text-ellipsis">{{ menu.name }}</div>
        </router-link>
      </div>
    </div>
    <div class="tab-con" v-else>
      <div class="div1" v-show="curId === 0">
        <router-link
          :to="{ path: menu.url }"
          class="langur"
          v-for="(menu, index) in newComputedMenu1"
          :key="index"
        >
          <img :src="menu.icon" width="57" height="57" />
          <div class="text-ellipsis">{{ menu.name }}</div>
        </router-link>
      </div>
      <div class="div1" v-show="curId === 1">
        <router-link
          :to="{ path: menu.url }"
          class="langur"
          v-for="(menu, index) in newComputedMenu2"
          :key="index"
        >
          <img :src="menu.icon" width="57" height="57" />
          <div class="text-ellipsis">{{ menu.name }}</div>
        </router-link>
      </div>
    </div>

    <div class="tab" v-if="computedMenu.length > 8">
      <span
        :class="{ active: index === curId }"
        v-for="(item, index) in tabLabel"
        :key="index"
        @click="tabBtn(index)"
        @touchend="tabBtn(index)"
      ></span>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "qmenu",
  data() {
    return {
      newComputedMenu1: [],
      newComputedMenu2: [],
      curId: 0,
      tabLabel: [1, 2],
      //学校类型
      recipeList: [
        {
          name: "营养食谱",
          url: "/recipe",
          icon: require("../assets/men-icon-9@2x.png")
        }
      ],
      shuttleList: [
        {
          name: "实时接送",
          url: "/shuttle",
          icon: require("../assets/men-icon-6@2x.png")
        }
      ],
      clockList: [
        {
          name: "考勤管理",
          url: "/clock",
          icon: require("../assets/men-icon-3@2x.png")
        }
      ],
      //学校
      schoolList: [
        {
          name: "班级管理",
          url: "/class",
          icon: require("../assets/men-icon-1@2x.png")
        },
        {
          name: "老师管理",
          url: "/teacher/grade",
          icon: require("../assets/men-icon-4@2x.png")
        }
      ],
      //老师
      teacherList: [
        {
          name: "班级管理",
          url: "/student/grade",
          icon: require("../assets/men-icon-10@2x.png")
        }
      ],
      scheduleList: [
        {
          name: "班级课表",
          url: "/schedule/teacher",
          icon: require("../assets/men-icon-12@2x.png")
        }
      ],
      feedList: [
        {
          name: "师生互动",
          url:
            this.$store.state.user.info.roleType == 2
              ? "/feed/teacher"
              : "/feed",
          icon: require("../assets/men-icon-11@2x.png")
        }
        //  {
        //   name: "家长管理",
        //   url:"/patriarchManage",
        //   icon: require("../assets/men-icon-11@2x.png")
        // },
        // {
        //   name: "园长专栏",
        //   url: "/specialColumn",
        //   icon: require("../assets/specialColumn.png")
        // }
      ],
      //共用的菜单
      menuList: [
        {
          name: "通知",
          url:
            this.$store.state.user.info.roleType == 1 ||
            this.$store.state.user.info.roleType == 4
              ? "/notice/admin"
              : "/notice",
          icon: require("../assets/men-icon-7@2x.png")
        },
        {
          name: "作业",
          url: "/home-work",
          icon: require("../assets/men-icon-5@2x.png")
        },
        {
          name: "班级速报",
          url: "/fresh",
          icon: require("../assets/men-icon-8@2x.png")
        },
        {
          name: "班级相册",
          url: "/album",
          icon: require("../assets/men-icon-2@2x.png")
        }
      ]
    };
  },
  computed: {
    ...mapState("user", {
      type: state => state.info.type,
      roleType: state => state.info.roleType
    }),
    computedMenu() {
      switch (parseInt(this.roleType)) {
        case 1:
          return this.menuList
            .concat(this.recipeList)
            .concat(this.clockList)
            .concat(this.schoolList);
          break;
        case 2:
          return this.menuList
            .concat(this.recipeList)
            .concat(this.clockList)
            .concat(this.teacherList)
            .concat(this.shuttleList)
            .concat(this.feedList)
            .concat(this.schoolList)
            .concat(this.scheduleList);
          break;
        case 3:
          return this.menuList
            .concat(this.recipeList)
            .concat(this.clockList)
            .concat(this.scheduleList)
            .concat(this.feedList);
          break;
        default:
          return this.menuList
            .concat(this.recipeList)
            .concat(this.clockList)
            .concat(this.schoolList);
          break;
      }
    }
  },
  mounted() {
    // console.log(this.computedMenu);
  },
  created() {
    if (this.computedMenu.length > 8) {
      let arr = this.computedMenu.slice(0, 8);
      let arr2 = this.computedMenu.slice(8);
      this.newComputedMenu1 = arr;
      this.newComputedMenu2 = arr2;
      // console.log(this.newComputedMenu1);
      // console.log(this.newComputedMenu2);
      // console.log(this.computedMenu);
      // console.log(arr);
      // console.log(arr2);
    }
  },
  methods: {
    tabBtn(index) {
      this.curId = index;
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  background-color: #fff;
  .tab-con {
    .div1 {
      display: flex;
      flex-wrap: wrap;
      height: 400px;
    }
  }
  .langur {
    width: 25%;
    min-width: 0; /*解决方案*/
    height: 180px;
    padding-top: 10px;
    text-align: center;
  }
}
.tab {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    height: 10px;
    width: 50px;
    background: #84ce09;
    opacity: 0.2;
    border-radius: 10px;
    margin: 0 10px;
  }
  .active {
    opacity: 1;
  }
}
</style>
