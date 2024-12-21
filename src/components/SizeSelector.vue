<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
      <h3 class="text-lg font-semibold mb-4">Seleziona la taglia</h3>

      <div class="grid grid-cols-2 gap-2 mb-4">
        <button
          v-for="size in sizes"
          :key="size"
          class="btn"
          :class="selectedSize === size ? 'btn-primary' : 'btn-secondary'"
          @click="selectedSize = size"
        >
          {{ size }}
        </button>
      </div>

      <div class="flex justify-end space-x-2">
        <button class="btn btn-secondary" @click="$emit('close')">
          Annulla
        </button>
        <button
          class="btn btn-primary"
          :disabled="!selectedSize"
          @click="handleConfirm"
        >
          Conferma
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  sizes: string[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm', size: string): void;
}>();

const selectedSize = ref('');

function handleConfirm() {
  if (selectedSize.value) {
    emit('confirm', selectedSize.value);
  }
}
</script>
