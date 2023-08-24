<template>
  <div>
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-gray-700 bg-opacity-50 z-0"
    ></div>

    <!-- <div
      v-if="showPopup"
      class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur z-0"
    ></div> -->
    <div class="fixed bottom-0 right-0 p-5">
      <div class="relative">
        <button
          @click="togglePopup"
          class="flex items-center p-2 bg-blue-500 text-white rounded-xl"
        >
          <!-- <span class="mr-2">{{ showPopup ? "Close" : "Open" }}</span> -->
          <svg
            v-if="showPopup"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        <div
          v-if="showPopup"
          class="absolute -mt-[10rem] p-1 right-2 justify-end z-10"
        >
          <div
            class="bg-white flex text-gray-700 shadow-md p-3 mb-2 rounded-xl w-[14rem]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <p>Request Signatures</p>
          </div>
          <label
            :for="`file_input_${index}`"
            class="bg-white flex text-gray-700 shadow-md p-3 rounded-xl"
          >
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <p>Sign Documents</p>
          </label>
          <input
            type="file"
            class="hidden"
            :id="`file_input_${index}`"
            :value="file"
            accept=".docx, .txt, .pdf"
            @change="handleFileUpload"
            multiple
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useDataStore } from "@/stores";
export default {
  data() {
    return {
      showPopup: false,
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    async handleFileUpload(event) {
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
      this.$router.push("/addDocument");
    },
  },
};
</script>

<style lang="scss" scoped></style>
