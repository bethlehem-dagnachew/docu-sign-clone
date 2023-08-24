<template>
  <header class="py-2 px-2 flex items-center gap-6">
    <button @click="$router.push('/addDocument')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#111"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
    </button>
    <div class="grid leading-3">
      <h2 class="text-lg font-bold text-black">View document</h2>
      <span class="font-semibold text-sm relative">{{
        rawFiles[selectedFileIndex]?.name
      }}</span>
    </div>
  </header>
  <div class="fixed z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
    <Loader v-if="loadingDocument" />
  </div>
  <main class="relative mb-20" ref="mainContainer">
    <Vue3DraggableResizable
      id="canvasContainer"
      class="cursor-move absolute z-50 w-[150px] h-[100px]"
      v-show="showSignature"
      v-model:x="signatureProps.x"
      v-model:y="signatureProps.y"
      :handles="['tl', 'tr', 'bl', 'br']"
      :draggable="true"
      :resizable="false"
      @dragging="updateCoords"
    >
      <canvas ref="canvasRef" id="signatureDisplayCanvas"></canvas>
    </Vue3DraggableResizable>
    <div
      ref="pdfContainer"
      id="pdfContainer"
      class="relative w-full max-w-full overflow-x-auto"
    ></div>

    <footer
      class="flex items-center gap-4 px-6 py-2 fixed w-full left-0 bottom-0 bg-gray-300 z-50"
    >
      <div class="grid justify-items-center gap-1">
        <button
          @click="modalOpen = !modalOpen"
          class="flex w-10 h-10 items-center justify-center p-2 bg-yellow-300 rounded-full"
        >
          <svg
            viewBox="0 0 28 28"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            class="w-6 h-6"
          >
            <path
              d="M16.4798956,21.0019578 L16.75,21 C17.9702352,21 18.6112441,21.5058032 19.4020627,22.7041662 L19.7958278,23.3124409 C20.1028266,23.766938 20.2944374,23.9573247 20.535784,24.0567929 C20.9684873,24.2351266 21.3271008,24.1474446 22.6440782,23.5133213 L23.0473273,23.3170319 C23.8709982,22.9126711 24.4330286,22.6811606 25.0680983,22.5223931 C25.4699445,22.4219316 25.8771453,22.6662521 25.9776069,23.0680983 C26.0780684,23.4699445 25.8337479,23.8771453 25.4319017,23.9776069 C25.0371606,24.0762922 24.6589465,24.2178819 24.1641364,24.4458997 L23.0054899,25.0032673 C21.4376302,25.7436944 20.9059009,25.8317321 19.964216,25.4436275 C19.3391237,25.1860028 18.9836765,24.813298 18.4635639,24.0180227 L18.2688903,23.7140849 C17.7071112,22.8288731 17.4057794,22.5384538 16.8688444,22.5036655 L16.75,22.5 C16.2017306,22.5 16.0933104,22.5684572 14.009281,24.1150241 C12.2670395,25.4079488 10.9383359,26.0254984 9.24864243,26.0254984 C7.18872869,26.0254984 5.24773367,25.647067 3.43145875,24.8905363 L6.31377803,24.2241784 C7.25769404,24.4250762 8.23567143,24.5254984 9.24864243,24.5254984 C10.5393035,24.5254984 11.609129,24.0282691 13.1153796,22.9104743 L14.275444,22.0545488 C15.5468065,21.1304903 15.8296113,21.016032 16.4798956,21.0019578 L16.4798956,21.0019578 Z M22.7770988,3.22208979 C24.4507223,4.8957133 24.4507566,7.60916079 22.7771889,9.28281324 L21.741655,10.3184475 C22.8936263,11.7199657 22.8521526,13.2053774 21.7811031,14.279556 L18.7800727,17.2805874 L18.7800727,17.2805874 C18.4870374,17.5733384 18.0121637,17.573108 17.7194126,17.2800727 C17.4266616,16.9870374 17.426892,16.5121637 17.7199273,16.2194126 L20.7188969,13.220444 C21.2039571,12.7339668 21.2600021,12.1299983 20.678941,11.3818945 L10.0845437,21.9761011 C9.78635459,22.2743053 9.41036117,22.482705 8.99944703,22.5775313 L2.91864463,23.9807934 C2.37859061,24.1054212 1.89457875,23.6214094 2.0192066,23.0813554 L3.42247794,17.0005129 C3.51729557,16.5896365 3.72566589,16.2136736 4.0238276,15.9154968 L16.7165019,3.22217992 C18.3900415,1.54855555 21.1034349,1.54851059 22.7770988,3.22208979 Z M17.7771889,4.28281324 L5.08451462,16.9761302 C4.98512738,17.0755224 4.91567061,17.2008434 4.88406473,17.3378022 L3.7506248,22.2493752 L8.66215777,21.1159445 C8.79912915,21.0843357 8.92446029,21.0148692 9.02385665,20.9154678 L21.7165019,8.22217992 C22.8043063,7.13432049 22.8042862,5.37060478 21.7164588,4.2827701 C20.6285914,3.19496507 18.8649506,3.19499653 17.7771889,4.28281324 Z"
              id="🎨-Color"
            ></path>
          </svg>
        </button>
        <span class="text-[0.65rem]"> Signature </span>
      </div>
      <div class="grid justify-items-center gap-1">
        <button
          class="flex w-10 h-10 items-end justify-center p-2 bg-yellow-300 rounded-full"
        >
          <span class="underline text-black">DS</span>
        </button>
        <span class="text-[0.65rem]"> Initials </span>
      </div>
      <div class="grid justify-items-center gap-1">
        <button
          @click="savePDF"
          class="flex w-10 h-10 items-center justify-center p-2 bg-yellow-300 rounded-full"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M4 6C4 4.89543 4.89543 4 6 4H12H14.1716C14.702 4 15.2107 4.21071 15.5858 4.58579L19.4142 8.41421C19.7893 8.78929 20 9.29799 20 9.82843V12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z"
                stroke="#111"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M8 4H13V7C13 7.55228 12.5523 8 12 8H9C8.44772 8 8 7.55228 8 7V4Z"
                stroke="#111"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M7 15C7 13.8954 7.89543 13 9 13H15C16.1046 13 17 13.8954 17 15V20H7V15Z"
                stroke="#111"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </button>
        <span class="text-[0.65rem]"> Save </span>
      </div>
      <div class="grid justify-items-center gap-1" v-if="downloadURL">
        <button
          @click="downloadPDF"
          class="flex w-10 h-10 items-center justify-center p-2 bg-yellow-300 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#111"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
        <span class="text-[0.65rem]"> Download </span>
      </div>
    </footer>
  </main>
  <DrawSignature
    v-if="modalOpen"
    @close="modalOpen = false"
    @save="setupSignature"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import SignaturePad from "signature_pad";
import { PDFDocument } from "pdf-lib";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import mammoth from "mammoth";
import { useDataStore } from "@/stores";
import { storeToRefs } from "pinia";
import DrawSignature from "../components/DrawSignature.vue";
import html2pdf from "html2pdf.js";
import Loader from "@/components/utils/Loader.vue";

// import pdf from "html-pdf";

const store = useDataStore();
const { currentFiles, results, signature, rawFiles } = storeToRefs(store);
const signatureUrl = ref(null);
const showSignature = ref(false);
const signatureProps = ref({ x: 0, y: 0, w: 150, h: 100 });
const downloadURL = ref(null);
const route = useRoute();
const modalOpen = ref(false);
const canvasRef = ref(null);
const mainContainer = ref(null);
const selectedFileIndex = route.params.index;
const fileExt = ref("pdf");
const pdfBufferContent = ref(null);

const pdfDocument = ref(null);
const currentPage = ref(0);
const loadingDocument = ref(false);

const arrayBufferToBlob = (arrayBuffer) => {
  const blob = new Blob([arrayBuffer]);
  return blob;
};

const blobToArrayBuffer = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      resolve(arrayBuffer);
    };
    reader.onerror = (event) => {
      reject(event.target.error);
    };
    reader.readAsArrayBuffer(blob);
  });
};

const updateCoords = (arg) => {
  // console.log(arg);
  signatureProps.value.x = arg.x;
  signatureProps.value.y = arg.y;

  determineCurrentPage(arg.y);
};

const savePDF = async () => {
  try {
    // console.log("Pdf buffer conent", pdfBufferContent.value);
    let pdfContent;
    if (fileExt.value !== "pdf") {
      if (pdfBufferContent.value instanceof Blob)
        pdfContent = await blobToArrayBuffer(pdfBufferContent.value);
    } else {
      const file = currentFiles.value[selectedFileIndex];
      const arrayBuffer = await file.arrayBuffer();
      pdfContent = arrayBuffer;
    }
    const pdfDoc = await PDFDocument.load(pdfContent);
    const pages = pdfDoc.getPages();
    const page =
      currentPage.value < 1 ? pages[0] : pages[currentPage.value - 1];
    const form = pdfDoc.getForm();
    // console.log("FOrms", form.getFields());
    if (signature.value) {
      const signatureBytes = await pdfDoc.embedPng(signature.value);

      let newY;
      if (signatureProps.value.y >= page.getHeight()) {
        newY =
          signatureProps.value.y - page.getHeight() * (currentPage.value - 1);
        // console.log("New y: ", newY);
      } else newY = signatureProps.value.y;
      const adjustedX = signatureProps.value.x;
      const adjustedY = page.getHeight() - newY - signatureProps.value.h;

      page.drawImage(signatureBytes, {
        width: signatureProps.value.w,
        height: signatureProps.value.h,
        x: adjustedX,

        y: adjustedY,
      });

      // console.log("First page", page);
    }

    const pdfBytes = await pdfDoc.save();
    // Create a Blob from the Uint8Array
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a download URL for the Blob
    downloadURL.value = URL.createObjectURL(blob);
    const container = document.getElementById("pdfContainer");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    await renderPDF(pdfBytes);
  } catch (error) {
    console.error(error);
  }
};

const downloadPDF = () => {
  // Create a link element
  const link = document.createElement("a");
  link.href = downloadURL.value;
  link.download = `${rawFiles.value[selectedFileIndex].name.split(".")[0]}.pdf`;

  document.body.appendChild(link);

  link.click();

  URL.revokeObjectURL(downloadURL.value);
};

const setupSignature = async () => {
  showSignature.value = true;
  signatureProps.value.y = window.scrollY;
  const signatureCanvas = canvasRef.value;
  // console.log("Current Y", window.scrollY);
  signatureCanvas.style.width = signatureProps.value.w;
  signatureCanvas.style.height = signatureProps.value.h;
  const signaturePad = new SignaturePad(signatureCanvas, {
    minWidth: 2,
    maxWidth: 2,
  });
  signatureUrl.value = await signaturePad.fromDataURL(signature.value);
  signaturePad.off();
};

const initRender = async () => {
  loadingDocument.value = true;
  try {
    store.signature = null;
    // Load the PDF worker
    const file = currentFiles.value[selectedFileIndex];
    const pdfWorkerPath = await import("pdfjs-dist/build/pdf.worker.entry");

    GlobalWorkerOptions.workerSrc = pdfWorkerPath.default;

    // Read the PDF data from the file
    const arrayBuffer = await file.arrayBuffer();
    const pdfData = new Uint8Array(arrayBuffer);

    // Read the PDF data from the file
    if (fileExt.value !== "pdf") {
      await convertToPdf(arrayBuffer);
      return;
    } else {
      pdfBufferContent.value = arrayBufferToBlob(pdfData);
      renderPDF(pdfData);
    }
  } catch (error) {
    console.error(error);
  }
};

const renderPDF = async (pdfData) => {
  loadingDocument.value = true;
  try {
    // Load the PDF document
    pdfDocument.value = await PDFDocument.load(new Uint8Array(pdfData));
    const pdfDoc = await getDocument(pdfData).promise;
    // Get the total number of pages in the document
    const numPages = pdfDoc.numPages;

    // Iterate over all pages
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      let scaledViewport = viewport;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      canvas.id = `page${pageNumber}`;
      canvas.className = "page";
      const context = canvas.getContext("2d");
      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };
      await page.render(renderContext);

      // Append the canvas to your desired container
      const container = document.getElementById("pdfContainer");

      container.appendChild(canvas);
    }
    loadingDocument.value = false;
  } catch (error) {
    loadingDocument.value = false;
    console.error(error);
  }
};
const convertToPdf = async (docxArrayBuffer) => {
  try {
    loadingDocument.value = true;
    const options = {
      styleMap: [
        "p[style-name='Heading 1'] => h1",
        "p[style-name='Heading 2'] => h2",
        "p[style-name='Heading 3'] => h3",
        "p[style-name='Title'] => h1",
        "p[style-name='Subtitle'] => h2",
        "p[style-name='Normal'] => p",
        "p[style-name='Preformatted'] => pre",
        "p[style-name='Strong'] => strong",
        "p[style-name='Emphasis'] => em",
        "p[style-name='Box'] => div.box", // Map 'Box' style to a div with class 'box'
        "p[style-name='Padding'] => div.padding", // Map 'Padding' style to a div with class 'padding'
        // "u => u", // Preserve underline style
      ],
    };
    const { value: html } = await mammoth.convertToHtml(
      {
        arrayBuffer: docxArrayBuffer,
      },
      options
    );

    const htmlText = html.replace(
      /<p style="[^"](?:border:(.*?)\s*)?(?:outline:(.*?)\s*)?">(.*?)<\/p>/g,
      '<div style="border:$1; outline:$2">$3</div>'
    );

    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlText;

    function applyFontColorToTextNodes(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        node.parentNode.style.color = "black";
        node.parentNode.style.fontSize = "18px";
        node.parentNode.style.display = "flex";
        node.parentNode.style.padding = "2px";
      } else {
        for (const childNode of node.childNodes) {
          applyFontColorToTextNodes(childNode);
        }
      }
    }

    applyFontColorToTextNodes(tempElement);

    const modifiedHtmlContent = tempElement.innerHTML;

    const opt = {
      jsPDF: { format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      margin: [10, 10, 10, 10],
    };
    html2pdf()
      .set(opt)
      .from(modifiedHtmlContent)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const buffer = pdf.output("arraybuffer");
        pdfBufferContent.value = arrayBufferToBlob(buffer);

        renderPDF(buffer);
      });
    loadingDocument.value = false;
  } catch (error) {
    loadingDocument.value = false;
    console.error(error);
  }
};

function determineCurrentPage(clientY) {
  currentPage.value = 0;
  const canvases = document.querySelectorAll('canvas[id^="page"]');
  canvases.forEach((canvas, index) => {
    if (clientY >= currentPage.value * canvas.height) {
      currentPage.value = index + 1;
    } else {
      currentPage.value = index;
    }
  });
}

onMounted(async () => {
  if (currentFiles.value[selectedFileIndex]) {
    fileExt.value = currentFiles.value[selectedFileIndex]?.name
      .split(".")
      .pop()
      .toLowerCase();

    if (results.value[selectedFileIndex]) {
      await initRender();
    }
  } else {
    useRouter().push("/addDocument");
  }
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.page {
  @apply outline-red-300;
}

#signatureDisplayCanvas {
  @apply w-[19.375rem] h-[12.25rem] sm:w-[9.375rem] sm:h-[6.25rem];
}
</style>
