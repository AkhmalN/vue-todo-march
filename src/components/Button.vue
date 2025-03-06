<template>
  <button
    :class="buttonClass"
    :style="buttonStyle"
    :disabled="isDisabled"
    v-bind="$attrs"
  >
    <template v-if="loading">
      <div class="flex flex-row items-center gap-1">
        <LoaderCircle class="animate animate-spin" />
        <p>Processing</p>
      </div>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";
import { defineProps, computed } from "vue";

const props = defineProps<{
  buttonClass?: string;
  buttonStyle?: string;
  type?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "success" | "danger" | "warning";
}>();

const buttonClass = computed(() => {
  let baseClass = "text-white rounded cursor-pointer transition";

  const sizeClass = {
    small: "py-1 px-2 text-sm",
    medium: "py-2 px-4 text-base",
    large: "py-3 px-6 text-lg",
  }[props.size || "medium"];

  const variantClass = {
    primary: "bg-blue-500 hover:bg-blue-600",
    success: "bg-green-500 hover:bg-green-600",
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-amber-500 hover:bg-amber-600",
  }[props.variant || "primary"];

  return `${baseClass} ${sizeClass} ${variantClass} ${props.buttonClass || ""}`;
});

const buttonStyle = computed(() => props.buttonStyle || "");

const isDisabled = computed(() => props.disabled || props.loading);
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
