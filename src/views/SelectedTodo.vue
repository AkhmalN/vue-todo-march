<template>
  <div class="p-6 bg-white rounded-xl">
    <TextEditor v-model="textInput" v-if="isEdited" />
    <Editor v-model="textRender" readonly v-if="!isEdited" />
    <div class="mt-5 flex justify-end gap-2">
      <Button variant="warning" @click="toggleEditMode" class="w-auto">
        <span>Edit</span>
      </Button>
      <Button
        variant="primary"
        @click="visibleUpdate = true"
        class="w-auto"
        :disabled="!isEdited"
      >
        <span>Simpan</span>
      </Button>
      <Button variant="danger" @click="visibleDelete = true" class="w-auto">
        <span>Hapus</span>
      </Button>
    </div>

    <Modals
      v-model:visible="visibleUpdate"
      :icon="OctagonAlert"
      icon-color="primary"
    >
      <div class="my-5">
        <p class="text-center">Apakah anda yakin?</p>
        <p class="text-center">Catatan akan diubah!</p>
      </div>
      <div class="flex flex-row gap-3 mt-4">
        <Button
          variant="primary"
          @click="handleUpdateTodo"
          :disabled="store.loading"
          :loading="store.loading"
        >
          Simpan
        </Button>
        <Button variant="danger" @click="visibleUpdate = false">Cancel</Button>
      </div>
    </Modals>
    <Modals
      v-model:visible="visibleDelete"
      :icon="OctagonAlert"
      icon-color="danger"
    >
      <div class="my-5">
        <p class="text-center">Apakah anda yakin?</p>
        <p class="text-center">Catatan akan dihapus!</p>
      </div>
      <div class="flex flex-row gap-3 mt-4">
        <Button
          variant="primary"
          @click="handleDeleteTodo"
          :disabled="store.loading"
          :loading="store.loading"
        >
          Hapus
        </Button>
        <Button variant="danger" @click="visibleDelete = false">Cancel</Button>
      </div>
    </Modals>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Editor from "primevue/editor";

import Button from "../components/Button.vue";
import TextEditor from "../components/TextEditor.vue";
import Modals from "../components/Modals.vue";
import { OctagonAlert } from "lucide-vue-next";
import { useTodoStore } from "../store/todo";
import { Toast } from "primevue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const store = useTodoStore();
const visibleUpdate = ref<boolean>(false);
const visibleDelete = ref<boolean>(false);
const isEdited = ref<boolean>(false);
const todo = computed(() => store.isSelectedItem);
const textInput = ref(todo.value?.title || "");
const textRender = computed(() => store.isSelectedItem?.title || "");

watch(
  () => store.isSelectedItem,
  (newTodo) => {
    textInput.value = newTodo?.title || "";
  },
  { immediate: true }
);

watch(
  isEdited,
  (newValue) => {
    if (!newValue) {
      textInput.value = textRender.value;
    }
  },
  { immediate: true }
);

function toggleEditMode() {
  isEdited.value = !isEdited.value;
  showEditModeToast(isEdited.value);
}

function showEditModeToast(isEdited: boolean) {
  if (isEdited) {
    toast.add({
      severity: "info",
      summary: "Editor Mode",
      detail: "Editor mode true",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "info",
      summary: "Editor Mode",
      detail: "Editor mode false",
      life: 3000,
    });
  }
}

async function handleUpdateTodo() {
  if (textInput.value?.trim()) {
    try {
      await store.updateTodo({
        userId: todo.value?.userId || 0,
        title: textInput.value,
        completed: false,
        id: todo.value?.id || "",
      });
      isEdited.value = false;
      visibleUpdate.value = false;
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Catatan baru berhasil diupdate",
        life: 3000,
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }
}

async function handleDeleteTodo() {
  if (todo.value?.id) {
    try {
      await store.removeTodo(todo.value.id);
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Catatan berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Terjadi kesalahan saat menghapus catatan",
        life: 3000,
      });
    }
  }
}
</script>
