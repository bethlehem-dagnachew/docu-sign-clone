import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    signature: null,
    rawFiles: [],
    results: [],
    currentFiles: [],
  }),
  actions: {
    saveSignature(signature) {
      this.signature = signature;
    },
  },
});
