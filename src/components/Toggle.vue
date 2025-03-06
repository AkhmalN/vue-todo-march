<template>
  <div
    :class="{
      'text-lg font-semibold flex flex-row w-full': true,
      'justify-end': sidebar.isOpen,
      'justify-center': !sidebar.isOpen,
    }"
  >
    <button
      @click="sidebar.isOpen = !sidebar.isOpen"
      class="text-grey cursor-pointer bg-gray-300 w-10 h-10 text-white rounded-full p-2"
    >
      <svg
        v-if="sidebar.isOpen"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useSidebar } from "../store/sidebar";

const sidebar = useSidebar();
</script>
