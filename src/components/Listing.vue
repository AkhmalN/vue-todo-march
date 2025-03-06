<template>
  <div
    class="p-6 rounded-xl shadow-sm my-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transition transform hover:scale-105 cursor-pointer relative"
    @click="handleClick"
    :class="todoClass"
  >
    <div class="my-4">
      <h2 :class="titleClass" class="text-md font-semibold truncate">
        {{ todo?.title }}
      </h2>
    </div>

    <div
      v-if="todo?.completed !== undefined"
      :class="statusBadgeClass"
      class="absolute top-2 right-2 flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full bg-opacity-80"
    >
      <span v-if="todo?.completed" class="text-green-600 flex items-center">
        <LucideCheck class="w-4 h-4 mr-1" />
        Selesai
      </span>
      <span v-else class="text-amber-600 flex items-center">
        <LucideX class="w-4 h-4 mr-1" />
        Belum Selesai
      </span>
    </div>

    <div class="mt-4">
      <span
        :class="userIdClass"
        class="text-xs font-medium flex flex-row items-center"
      >
        <User2Icon class="w-4 h-4 mr-1" /> ID : {{ todo?.userId }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore, type ITodo } from "../store/todo";
import { computed } from "vue";
import { LucideCheck, LucideX, User2Icon } from "lucide-vue-next";

const { todo } = defineProps({
  todo: {
    type: Object as () => ITodo,
  },
});

const todoStore = useTodoStore();

const todoClass = computed(() => ({
  "bg-[#4D55CC]": todoStore.isSelectedItem?.id === todo?.id,
  "bg-[#F5F5F5]": todoStore.isSelectedItem?.id !== todo?.id,
}));

const titleClass = computed(() => ({
  "text-gray-500": todoStore.isSelectedItem?.id !== todo?.id,
  "text-white": todoStore.isSelectedItem?.id === todo?.id,
}));

const userIdClass = computed(() => ({
  "text-gray-500": todoStore.isSelectedItem?.id !== todo?.id,
  "text-white": todoStore.isSelectedItem?.id === todo?.id,
}));

const statusBadgeClass = computed(() => ({
  "bg-green-100": todo?.completed,
  "bg-amber-100": !todo?.completed,
}));

function handleClick() {
  todoStore.setSelectedItem(todo);
}
</script>

<style scoped>
.transition-transform {
  transition: transform 0.3s ease;
}

@media (max-width: 640px) {
  .transition-transform {
    padding: 4px;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .transition-transform {
    padding: 6px;
    max-width: 100%;
  }
}

@media (min-width: 768px) {
  .transition-transform {
    padding: 8px;
  }
}
</style>
