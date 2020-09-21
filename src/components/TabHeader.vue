<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script>
export default {
  name: "TabHeader",
  methods: {
    onClickLeft() {
    //   Toast('返回');
    },
    onClickRight() {
    //   Toast('按钮');
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
