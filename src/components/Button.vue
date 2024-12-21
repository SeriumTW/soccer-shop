<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'btn relative',
      variant === 'primary'
        ? 'btn-primary'
        : variant === 'secondary'
        ? 'btn-secondary'
        : variant === 'outline'
        ? 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
        : 'bg-transparent text-gray-700 hover:bg-gray-100',
      size === 'sm'
        ? 'px-3 py-1.5 text-sm'
        : size === 'lg'
        ? 'px-6 py-3 text-lg'
        : 'px-4 py-2 text-base',
      fullWidth ? 'w-full' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      className,
    ]"
    @click="$emit('click')"
  >
    <LoadingSpinner
      v-if="loading"
      size="sm"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <span :class="{ invisible: loading }">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue';

defineProps<{
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>
