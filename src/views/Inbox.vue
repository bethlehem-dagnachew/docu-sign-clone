<template>
  <div>
    <PageHeader title="Inbox" />
    <FileList />
  </div>
</template>

<script>
import FileList from "../components/FileList.vue";
import PageHeader from "../components/utils/PageHeader.vue";
export default {
  components: {
    PageHeader,
    FileList,
  },
};
</script>

<style lang="scss" scoped>
</style>