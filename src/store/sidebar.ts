import { defineStore } from "pinia";

type TSidebar = {
  isOpen: boolean;
};

export const useSidebar = defineStore("sidebar", {
  state: (): TSidebar => ({
    isOpen: true,
  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
});
