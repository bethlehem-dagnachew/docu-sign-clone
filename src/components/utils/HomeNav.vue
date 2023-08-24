<template>
  <div>
    <div class="flex items-center justify-between">
      <PageHeader title="My Dashboard" />
      <div
        class="bg-gray-300 w-10 h-10 rounded-full mr-3 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-black items-center justify-center"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "./PageHeader.vue";
export default {
  components: {
    PageHeader,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>