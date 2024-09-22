<!-- @format -->

<template>
  <div class="home">
    <CardItem />
  </div>
</template>

<script>
import CardItem from "../components/CardItem.vue";
export default {
  name: "HomeView",
  components: {
    CardItem,
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  overflow: hidden;
}
</style>
