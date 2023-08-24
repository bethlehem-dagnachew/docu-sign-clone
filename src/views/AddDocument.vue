<template>
  <div>
    <PageHeader title="Add Documents" />
    <div class="w-full p-1">
      <div class="p-2">
        <ul class="space-y-3 mb-4 font-medium">
          <li
            class="flex items-center p-4 lg:col-span-1 w-full bg-white rounded-lg"
            v-for="(file, index) in filesStore"
            :key="index"
            @click="$router.push(`/view-pdf/${index}`)"
          >
            <div class="flex-shrink-0 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-black"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <div class="w-full">
              <p class="ml-3 leading-5 text-start text-gray-600">
                {{ file.title }}
              </p>
              <div class="ml-3 flow-root w-full">
                <p class="float-left text-sm text-gray-400">{{ file.size }}</p>
                <!-- <p class="float-right text-sm text-gray-400">11:00</p> -->
              </div>
            </div>
            <div class="flex-shrink-0 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-black"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </div>
          </li>
        </ul>

        <!-- <div class="fixed bottom-0 right-0 p-5">
          <div class="relative">
            <button
              class="flex items-center p-2 bg-blue-500 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </div> -->
        <label
          for="fileInput"
          class="flex items-start p-3 lg:col-span-1 w-full bg-transparent rounded-lg border-2 border-gray-700"
        >
          <button class="text-gray-700 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-700 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Another Document
          </button>
        </label>
        <input
          id="fileInput"
          type="file"
          @change="handleFileUpload"
          accept=".docx, .txt, .pdf"
          class="hidden"
          multiple
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import PageHeader from "../components/utils/PageHeader.vue";
import { useDataStore } from "@/stores";
import { storeToRefs } from "pinia";

const store = useDataStore();
const { currentFiles, rawFiles } = storeToRefs(store);

const filesStore = computed(() =>
  rawFiles.value.map((rawFile) => ({
    title: rawFile?.name,
    size: getFileSize(rawFile),
  }))
);

const handleFileUpload = (event) => {
  let file = event.target.files[0];
  const reader = new FileReader();
  store.currentFiles = [...currentFiles.value, file];

  store.rawFiles = [
    ...rawFiles.value,
    {
      name: file.name,
      size: file.size,
    },
  ];

  reader.onload = (event) => {
    console.log("Called");
    const uint8Array = new Uint8Array(event.target.result);
    const decoder = new TextDecoder();
    const fileData = decoder.decode(uint8Array);

    store.results = [...store.results, fileData];
  };

  reader.readAsArrayBuffer(file);
};

const getFileSize = (file) => {
  const fileSize = file.size;

  if (fileSize < 1024) {
    return fileSize + " B";
  } else if (fileSize < 1024 * 1024) {
    const sizeInKB = (fileSize / 1024).toFixed(2);
    return sizeInKB + " KB";
  } else if (fileSize < 1024 * 1024 * 1024) {
    const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2);
    return sizeInMB + " MB";
  } else {
    const sizeInGB = (fileSize / (1024 * 1024 * 1024)).toFixed(2);
    return sizeInGB + " GB";
  }
};
</script>

<style lang="scss" scoped></style>
