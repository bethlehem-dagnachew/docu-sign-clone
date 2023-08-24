<template>
  <div class="m-3">
    <div class="bg-white w-full p-1 rounded-lg">
      <div class="p-4">
        <ul class="space-y-3 font-medium">
          <li
            class="flex items-start mb-5 lg:col-span-1 w-full"
            v-for="(files, index) in filesStore"
            :key="index"
          >
            <div class="flex-shrink-0 items-center justify-center">
              <svg class="w-5 h-5 text-emerald-500" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fill="#10b981"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="w-full">
              <p class="ml-3 leading-5 text-start text-gray-600">
                {{ files.title }}
              </p>
              <div class="ml-3 flow-root w-full">
                <p class="float-left text-sm text-gray-400">
                  Completed by beth
                </p>
                <p class="float-right text-sm text-gray-400">11:00</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filesStore: [
        {
          title: "Cross at Designated Crosswalks",
        },
        {
          title: "Cross at Designated Crosswalks",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>