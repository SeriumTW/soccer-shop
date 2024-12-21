<template>
  <div class="space-y-1">
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @blur="$emit('blur')"
        :class="[
          'input',
          hasError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-primary-500',
        ]"
        v-bind="$attrs"
      />

      <div
        v-if="loading"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <div
          class="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
    </div>

    <p v-if="hasError" class="text-sm text-red-600">
      {{ errorMessage }}
    </p>

    <p v-else-if="hint" class="text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  modelValue: string;
  type?: string;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  hint?: string;
  loading?: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur'): void;
}>();
</script>
