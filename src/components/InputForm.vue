<template>
  <div class="mb-4">
    <div
      class="flex flex-row items-center border border-gray-300 rounded-md shadow-sm px-3 h-12"
    >
      <div v-if="type === 'search'">
        <Search color="gray" />
      </div>
      <input
        v-bind="$attrs"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleChangeInput"
        class="block w-full focus:outline-none ml-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { defineProps, defineEmits, toRefs } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String as () => "text" | "search",
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

function handleChangeInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit("update:modelValue", target.value);
  }
}

const { id, type, placeholder } = toRefs(props);
</script>
