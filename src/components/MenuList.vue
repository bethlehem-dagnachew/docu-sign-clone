<template>
  <div>
    <ul class="flex flex-col gap-2 mx-auto mt-2 p-2">
      <li
        v-for="(item, index) in sidebarItems"
        :key="index"
        class="bg-white p-2 rounded-lg"
      >
        <label :for="`file_input_${index}`" class="w-full h-full">
          <div
            class="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer"
          >
            <div class="flex h-full items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-2 text-black"
              >
                <path :d="item.svg.path" />
              </svg>

              <span class="flex gap-2">
                <span class="text-gray-700">{{ item.label }}</span>
              </span>
            </div>
            <svg
              class="w-5 h-5 text-gray-700 transition group-open:rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              ></path>
            </svg>
          </div>
        </label>
        <input
          type="file"
          class="hidden"
          :id="`file_input_${index}`"
          :value="file"
          accept=".docx, .txt, .pdf"
          @change="($ev) => handleFileUpload($ev, index)"
          multiple
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { useDataStore } from "@/stores";

export default {
  setup() {
    return {
      file: null,
      sidebarItems: [
        {
          label: "Profile",
          route: "/",
          svg: {
            path: "M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z",
          },
        },
        {
          label: "Request Signatures",
          route: "/",
          svg: {
            path: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
          },
        },
        {
          label: "Sign Document",
          route: "/addDocument",
          svg: {
            path: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
          },
        },
      ],
    };
  },
  methods: {
    async handleFileUpload(event, index) {
      let files = [...event.target.files];
      const reader = new FileReader();
      const store = useDataStore();
      store.currentFiles = files;
      store.rawFiles = files.map((file) => {
        return {
          name: file.name,
          size: file.size,
        };
      });

      await Promise.resolve(() => {
        for (let idx = 0; idx < files.length; idx++) {
          const file = files[idx];
          console.log("File", file);
          reader.onload = (event) => {
            const uint8Array = new Uint8Array(event.target.result);
            // const fileData = String.fromCharCode.apply(null, uint8Array);
            const decoder = new TextDecoder("utf-8");
            const fileData = decoder.decode(uint8Array);
            store.results[idx] = fileData;
          };
          reader.readAsArrayBuffer(file);
        }
      });
      this.$router.push(this.sidebarItems[index].route);
    },
  },
};
</script>

<style scoped></style>
