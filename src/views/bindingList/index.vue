<template>
  <div class="wrapper">
    <div class="main">
      <div class="mainList">
        <div class="mainLi">
          <div><span>序号:</span><span>1</span></div>
          <div><span>DeviceID:</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>MAC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>NFC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
        </div>
        <div class="mainLi">
          <div><span>序号:</span><span>1</span></div>
          <div><span>DeviceID:</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>MAC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>NFC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
        </div>
        <div class="mainLi">
          <div><span>序号:</span><span>1</span></div>
          <div><span>DeviceID:</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>MAC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>NFC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
        </div>
        <div class="mainLi">
          <div><span>序号:</span><span>1</span></div>
          <div><span>DeviceID:</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>MAC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>NFC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
        </div>
        <div class="mainLi">
          <div><span>序号:</span><span>1</span></div>
          <div><span>DeviceID:</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>MAC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>NFC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
        </div>
        <div class="mainLi">
          <div><span>序号:</span><span>1</span></div>
          <div><span>DeviceID:</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>MAC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>NFC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
        </div>
        <div class="mainLi">
          <div><span>序号:</span><span>1</span></div>
          <div><span>DeviceID:</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>MAC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>NFC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
        </div>
        <div class="mainLi">
          <div><span>序号:</span><span>1</span></div>
          <div><span>DeviceID:</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>MAC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
          <div><span>NFC</span><span>AHDASIUIEHNFDSJINICNSI</span></div>
        </div>

      </div>
    </div>
    <div class="footer">
      <p @click="binding">扫码绑定</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    binding(){
      this.$router.push({
        path:"/bindingList/bindingMessage"
      })
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.wrapper {
  margin-bottom:150px;
  .main {
    margin: 0;
    .mainList {
      .mainLi {
        background: #fff;
        margin-bottom:10px;
        div {
          height: 80px;
          // width:100%;
          margin: 0 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgb(238, 238, 238);
          &:last-child{
            border:0;
          }
          span{
            color:#333333;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      background: linear-gradient(
        289deg,
        rgba(195, 235, 129, 1) 0%,
        rgba(195, 235, 129, 1) 0%,
        rgba(132, 206, 9, 1) 100%
      );
      opacity: 1;
      border-radius: 100px;
      color: #fff;
      width: 80vw;
      height: 80px;
      text-align: center;
      line-height: 80px;
    }
  }
}
</style>