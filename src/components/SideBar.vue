<template>
  <div
    :class="sidebarClass"
    class="bg-white transition-all duration-300 ease-in-out shadow-md flex flex-col justify-between"
  >
    <div class="px-4 py-2 flex flex-col overflow-y-auto scroll-smooth">
      <div
        v-if="sidebar.isOpen"
        class="flex flex-row justify-between items-center gap-5"
      >
        <div class="w-full bg-white">
          <InputForm
            id="search"
            v-model="search"
            type="search"
            class="sm:mr-2 md:mr-1 m-0"
            placeholder="Masukkan kata"
          />
        </div>

        <div class="flex items-center justify-center mb-3">
          <Button
            class="bg-gray-500"
            type="submit"
            size="small"
            @click="store.setNewTodo(true)"
          >
            <div class="flex flex-row items-center">
              <Plus />
            </div>
          </Button>
        </div>
      </div>

      <div v-if="sidebar.isOpen" class="overflow-y-auto p-3">
        <div v-if="store.loading" class="flex flex-row items-center gap-1">
          <LoaderCircle class="animate animate-spin" />
          <p>Processing</p>
        </div>

        <Listing
          v-for="todo in store.filteredTodos"
          :key="todo.id"
          :todo="todo"
        />

        <div v-if="isEmptyState" class="flex justify-center items-center gap-4">
          <AlertCircle class="text-amber-500" :size="40" />
          <div class="flex justify-center items-center w-full">
            <p class="text-gray-500">Tidak ada note yang ditemukan</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center p-4 relative">
      <Toggle />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, Plus, LoaderCircle } from "lucide-vue-next";
import { useSidebar } from "../store/sidebar";
import Button from "./Button.vue";
import InputForm from "./InputForm.vue";
import Listing from "./Listing.vue";
import Toggle from "./Toggle.vue";
import { onMounted, ref, computed, watch } from "vue";
import { useTodoStore } from "../store/todo";

const search = ref<string>("");
const store = useTodoStore();
const sidebar = useSidebar();

watch(search, (newQuery) => {
  store.setSearch(newQuery);
});

onMounted(() => {
  store.fetchTodos();
});

const sidebarClass = computed(() => ({
  "w-[30%]": sidebar.isOpen && window.innerWidth >= 640,
  "w-full": sidebar.isOpen && window.innerWidth < 640,
  "w-16": !sidebar.isOpen,
}));

const isEmptyState = computed(() => {
  return !store.loading && store.filteredTodos.length < 1;
});
</script>
