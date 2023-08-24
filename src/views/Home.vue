<template>
  <div class="">
    <HomeNav />
    <Action />
    <FileList />
    <MenuList />
    <PlusFooter />
  </div>
</template>

<script>
import FileList from "../components/FileList.vue";
import Action from "../components/Action.vue";
import MenuList from "../components/MenuList.vue";
import PlusFooter from "../components/PlusFooter.vue";
import HomeNav from "../components/utils/HomeNav.vue";

export default {
  components: {
    FileList,
    Action,
    MenuList,
    PlusFooter,
    HomeNav,
  },
};
</script>

<style lang="scss" scoped>
</style>