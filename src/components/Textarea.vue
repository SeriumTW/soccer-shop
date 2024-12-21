<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <textarea
        :id="id"
        :value="modelValue"
        @input="
          $emit(
            'update:modelValue',
            ($event.target as HTMLTextAreaElement).value
          )
        "
        @blur="$emit('blur')"
        :rows="rows"
        :class="[
          'input resize-none',
          hasError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-primary-500',
        ]"
        v-bind="$attrs"
      ></textarea>

      <div
        v-if="maxLength"
        class="absolute bottom-2 right-2 text-xs text-gray-500"
      >
        {{ modelValue.length }}/{{ maxLength }}
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
  label?: string;
  modelValue: string;
  rows?: number;
  maxLength?: number;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  hint?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur'): void;
}>();
</script>
