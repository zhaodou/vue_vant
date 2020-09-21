<template>
  <div class="home">
    {{count}}
    <div @click="setHomeData(item)">AAAAAAA</div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      item: {
        name: "11111111",
      },
    };
  },
  computed: {
    ...mapState({
      count: (state) => state.home.count,
      collects: (state) => state.home.collects,
    }),
  },
  mounted() {
    console.log(this);
  },
  methods: {
    ...mapActions("home",["set_home_data"]),
    setHomeData() {
        console.log(this)
        this.set_home_data(this.item);
    }
  },
};
</script>
<style lang="less" scoped>
</style>