<template>
  <div class="wrapper">
    <div class="content">
      <div><span class="name">MAC</span><span class="HzmEmpty"></span></div>
      <div><span class="name">NFC</span><span class="HzmEmpty"></span></div>
    </div>
    <div class="footer">确认绑定</div>
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
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.wrapper {
  .content {
    background: #fff;
    padding: 0 30px;
    padding-bottom: 40px;
    div {
      height: 100px;
      line-height: 100px;
      display: flex;
      .HzmEmpty {
        // display:inline-block;
        border-bottom: 1px solid rgb(235, 235, 235);
        width: 100%;
      }
    }
  }
  .footer {
    background: linear-gradient(
      289deg,
      rgba(195, 235, 129, 1) 0%,
      rgba(195, 235, 129, 1) 0%,
      rgba(132, 206, 9, 1) 100%
    );
    opacity: 1;
    border-radius: 100px;
    color: #fff;
    height: 90px;
    line-height: 90px;
    text-align: center;
    width: 90vw;
    margin: 500px auto;
  }
}
</style>