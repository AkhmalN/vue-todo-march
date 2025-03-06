<template>
  <div class="flex-1 flex flex-col h-screen bg-gray-100 overflow-auto w-full">
    <Header />
    <div class="flex flex-row h-screen overflow-hidden w-full">
      <SideBar />
      <main class="flex flex-col mx-5 pt-4 w-full">
        <SelectedTodo
          v-if="store.isSelectedItem"
          :todo="store.isSelectedItem || undefined"
        />
        <NewTodo v-if="store.isNewTodo" />
        <div
          v-if="store.isOnBoarding"
          class="flex flex-col items-center justify-center min-h-screen"
        >
          <div class="p-6 rounded-lg text-center">
            <img
              src="./assets/image.png"
              alt="Illustration"
              class="w-48 mx-auto mb-4"
            />
            <h2 class="text-xl font-semibold">Catatan App</h2>
            <p class="text-gray-600 mb-4">
              Buat catatan baru sekarang atau Lihat catatan yang sudah ada.
            </p>
            <Button @click="store.setNewTodo(true)"> Buat Catatan Baru </Button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "./components/Button.vue";
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import { useTodoStore } from "./store/todo";
import NewTodo from "./views/NewTodo.vue";
import SelectedTodo from "./views/SelectedTodo.vue";

const store = useTodoStore();
</script>
