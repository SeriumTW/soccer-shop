<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variant === 'success'
        ? 'bg-green-100 text-green-800'
        : variant === 'error'
        ? 'bg-red-100 text-red-800'
        : variant === 'warning'
        ? 'bg-yellow-100 text-yellow-800'
        : variant === 'info'
        ? 'bg-blue-100 text-blue-800'
        : variant === 'primary'
        ? 'bg-primary-100 text-primary-800'
        : 'bg-gray-100 text-gray-800',
    ]"
  >
    <svg
      v-if="icon"
      :class="[
        'mr-1.5 h-2 w-2',
        variant === 'success'
          ? 'text-green-400'
          : variant === 'error'
          ? 'text-red-400'
          : variant === 'warning'
          ? 'text-yellow-400'
          : variant === 'info'
          ? 'text-blue-400'
          : variant === 'primary'
          ? 'text-primary-400'
          : 'text-gray-400',
      ]"
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx="4" cy="4" r="3" />
    </svg>
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'default';
  icon?: boolean;
}>();
</script>
