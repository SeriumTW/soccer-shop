<template>
  <div
    class="flex items-center justify-center"
    :class="[size === 'sm' ? 'p-2' : size === 'lg' ? 'p-6' : 'p-4']"
  >
    <div
      class="border-2 border-primary-500 border-t-transparent rounded-full animate-spin"
      :class="[
        size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6',
      ]"
    ></div>
    <span v-if="text" class="ml-2 text-gray-600">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}>();
</script>
