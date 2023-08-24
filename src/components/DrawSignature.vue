<template>
  <div
    class="grid bg-gray-500 gap-2 w-96 shadow-sm rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border z-50"
  >
    <header class="flex items-center justify-between px-4 p-2">
      <button @click="$emit('close')">
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div>
        <h2 class="text-lg font-semibold">Draw</h2>
      </div>
      <button
        @click="saveSignature"
        class="text-gray-200 bg-blue font-semibold text-sm"
      >
        Create
      </button>
    </header>
    <main class="bg-white">
      <canvas
        id="signatureCanvas"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
      ></canvas>
    </main>
    <footer class="px-4 p-2 flex items-center justify-between">
      <section class="flex gap-3 items-center">
        <button @click="toggleEraserMode">
          <svg
            v-if="!isEraserMode"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M20.454,19.028h-7.01l6.62-6.63a2.935,2.935,0,0,0,.87-2.09,2.844,2.844,0,0,0-.87-2.05l-3.42-3.44a2.93,2.93,0,0,0-4.13.01L3.934,13.4a2.946,2.946,0,0,0,0,4.14l1.48,1.49H3.554a.5.5,0,0,0,0,1h16.9A.5.5,0,0,0,20.454,19.028Zm-7.24-13.5a1.956,1.956,0,0,1,2.73,0l3.42,3.44a1.868,1.868,0,0,1,.57,1.35,1.93,1.93,0,0,1-.57,1.37l-5.64,5.64-6.15-6.16Zm-1.19,13.5h-5.2l-2.18-2.2a1.931,1.931,0,0,1,0-2.72l2.23-2.23,6.15,6.15Z"
            ></path>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M15.4998 5.50067L18.3282 8.3291M13 21H21M3 21.0004L3.04745 20.6683C3.21536 19.4929 3.29932 18.9052 3.49029 18.3565C3.65975 17.8697 3.89124 17.4067 4.17906 16.979C4.50341 16.497 4.92319 16.0772 5.76274 15.2377L17.4107 3.58969C18.1918 2.80865 19.4581 2.80864 20.2392 3.58969C21.0202 4.37074 21.0202 5.63707 20.2392 6.41812L8.37744 18.2798C7.61579 19.0415 7.23497 19.4223 6.8012 19.7252C6.41618 19.994 6.00093 20.2167 5.56398 20.3887C5.07171 20.5824 4.54375 20.6889 3.48793 20.902L3 21.0004Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <button
          @click="clearSignature"
          class="text-gray-200 font-semibold text-sm"
        >
          Clear
        </button>
      </section>
    </footer>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";
import { useDataStore } from "@/stores";

let store;

export default {
  data() {
    return {
      signaturePad: null,
      isEraserMode: false,
      drawing: false,
      history: [],
      historyIndex: -1,
    };
  },
  methods: {
    toggleEraserMode() {
      this.isEraserMode = !this.isEraserMode;
      if (this.isEraserMode) {
        this.signaturePad.penColor = "white";
      } else {
        this.signaturePad.penColor = "black";
      }
    },

    clearSignature() {
      this.signaturePad.clear();
    },
    handleMouseDown(event) {
      if (this.isEraserMode) {
        this.drawing = true;
        this.erase(event.clientX, event.clientY);
      } else {
        this.signaturePad.on();
      }
    },

    handleMouseMove(event) {
      if (this.drawing && this.isEraserMode) {
        this.erase(event.clientX, event.clientY);
      }
    },

    handleMouseUp() {
      if (this.drawing && this.isEraserMode) {
        this.drawing = false;
      } else {
        // this.signaturePad.handleMouseUp();
        if (this.drawing) {
          const data = this.signaturePad.toData();
          this.history.splice(this.historyIndex + 1);
          this.history.push(data);
          this.historyIndex = this.history.length - 1;
        }
        this.drawing = false;
      }
    },
    erase(x, y) {
      const canvas = document.getElementById("signatureCanvas");
      const context = canvas.getContext("2d");

      // Adjust the eraser thickness here
      const eraserRadius = 50;

      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 1)";
      context.beginPath();
      context.arc(x, y, eraserRadius, 0, 2 * Math.PI);
      context.fill();
      context.globalCompositeOperation = "source-over";
    },

    saveSignature() {
      store = useDataStore();
      const signatureCanvas = document.getElementById("signatureCanvas");
      if (signatureCanvas && this.signaturePad) {
        const signatureDataUrl = this.signaturePad.toDataURL();
        store.saveSignature(signatureDataUrl);
        this.$emit("save");
        this.$emit("close");
      }
    },
  },
  async mounted() {
    const signatureCanvas = document.getElementById("signatureCanvas");
    this.signaturePad = new SignaturePad(signatureCanvas);
    signatureCanvas.addEventListener("mousedown", this.handleMouseDown);
    signatureCanvas.addEventListener("mouseup", this.handleMouseUp);
    signatureCanvas.addEventListener("mousemove", this.handleMouseMove);

    // if (store.signature) {
    //   await this.signaturePad.fromDataURL(store.signature);
    // }
  },
};
</script>
