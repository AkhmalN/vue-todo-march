<template>
  <div class="rounded-lg">
    <Editor
      v-bind:model-value="modelValue"
      @update:model-value="onUpdateModel"
    />
  </div>
</template>
<script setup lang="ts">
import Editor from "primevue/editor";

const { modelValue } = defineProps({
  modelValue: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);

const onUpdateModel = (newValue: string) => {
  emit("update:modelValue", newValue);
};
</script>
