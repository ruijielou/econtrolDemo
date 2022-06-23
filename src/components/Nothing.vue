<template>
  <div class="container space-between-align">
    <div class="l"></div>
    <div class="m">没有更多内容了</div>
    <div class="r"></div>
  </div>
</template>

<script>
export default {
  name: "Nothing"
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  margin: 20px auto 70px;
  padding: 10px 16px 48px;
  .l {
    flex: 1;
    height: 1px;
    background: #E9EFF3;
  }
  .m {
    color: #8D9EAE;
    font-size: 12px;
    padding: 0 19px;
  }
  .r {
    flex: 1;
    height: 1px;
    background: #E9EFF3;
  }
}

</style>