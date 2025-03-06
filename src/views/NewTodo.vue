<template>
  <div class="p-6 bg-white rounded-xl">
    <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-500 my-5">
      Buat Catatan Baru
    </h1>
    <TextEditor v-model="text" />
    <div class="mt-5 flex justify-end">
      <Button variant="primary" @click="visible = true" class="w-auto">
        <span>Simpan</span>
      </Button>
    </div>
    <Modals
      v-model:visible="visible"
      :icon="NotebookPenIcon"
      icon-color="primary"
    >
      <div class="my-5">
        <p class="text-center">Apakah anda yakin?</p>
        <p class="text-center">Data baru akan ditambahkan ke catatan!</p>
      </div>
      <div class="flex flex-row gap-3 mt-4">
        <Button
          variant="primary"
          @click="handleAddTodo"
          :disabled="store.loading"
          :loading="store.loading"
          >Simpan</Button
        >
        <Button variant="danger" @click="visible = false">Cancel</Button>
      </div>
    </Modals>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "../components/Button.vue";
import TextEditor from "../components/TextEditor.vue";
import Modals from "../components/Modals.vue";
import { NotebookPenIcon } from "lucide-vue-next";
import { useTodoStore } from "../store/todo";
import { Toast } from "primevue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const text = ref<string>("");
const visible = ref<boolean>(false);
const store = useTodoStore();

async function handleAddTodo() {
  if (text.value.trim()) {
    const userId = Math.floor(Math.random() * 100) + 1;
    const id = Date.now().toString();
    try {
      await store.addTodo({
        userId: userId,
        title: text.value,
        completed: false,
        id: id,
      });

      visible.value = false;
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Catatan baru berhasil di tambahkan",
        life: 3000,
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }
}
</script>
