<template>
  <header class="bg-white shadow-md px-4 py-4 w-full">
    <div class="flex items-center justify-start">
      <div
        class="text-2xl font-semibold text-gray-800 flex flex-row items-center gap-4"
      >
        <Scroll color="#4D55CC" :size="38" />
        <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-indigo-700">
          Catatan
        </h1>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { Scroll } from "lucide-vue-next";
</script>
