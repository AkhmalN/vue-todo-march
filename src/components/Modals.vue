<template>
  <Dialog
    :style="{ width: '25rem' }"
    :draggable="false"
    :modal="true"
    v-bind="$attrs"
  >
    <div class="modal-body">
      <component :is="icon" :class="[iconClass, 'icons']" v-if="icon" />

      <slot></slot>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import type { LucideProps } from "lucide-vue-next";
import { Dialog } from "primevue";
import { ref, type FunctionalComponent, type PropType } from "vue";

const { icon, iconColor } = defineProps({
  icon: {
    type: Object as PropType<FunctionalComponent<LucideProps>>,
    required: false,
  },
  iconColor: {
    type: String as () => "primary" | "danger" | "warning",
    default: "primary",
  },
});

const colorMap = {
  primary: "text-indigo-500",
  danger: "text-red-500",
  warning: "text-yellow-500",
};

const iconClass = ref(colorMap[iconColor]);
</script>

<style scoped>
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icons {
  width: 100px;
  height: 100px;
}
</style>
