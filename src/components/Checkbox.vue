<template>
  <div class="relative flex items-start">
    <div class="flex h-5 items-center">
      <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        @change="
          $emit(
            'update:modelValue',
            ($event.target as HTMLInputElement).checked
          )
        "
        :class="[
          'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
          hasError ? 'border-red-500' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ]"
        :disabled="disabled"
        v-bind="$attrs"
      />
    </div>
    <div class="ml-3 text-sm">
      <label
        :for="id"
        :class="['font-medium', disabled ? 'text-gray-400' : 'text-gray-700']"
      >
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      <p
        v-if="description"
        :class="['text-gray-500', disabled ? 'text-gray-300' : '']"
      >
        {{ description }}
      </p>
      <p v-if="hasError" class="mt-1 text-sm text-red-600">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  modelValue: boolean;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>
