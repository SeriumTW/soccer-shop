<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="space-y-2">
      <div
        v-for="option in options"
        :key="option.value"
        class="relative flex items-start"
      >
        <div class="flex h-5 items-center">
          <input
            type="radio"
            :id="`${id}-${option.value}`"
            :name="name"
            :value="option.value"
            :checked="modelValue === option.value"
            @change="$emit('update:modelValue', option.value)"
            :class="[
              'h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500',
              hasError ? 'border-red-500' : '',
              disabled ? 'opacity-50 cursor-not-allowed' : '',
            ]"
            :disabled="disabled"
            v-bind="$attrs"
          />
        </div>
        <div class="ml-3">
          <label
            :for="`${id}-${option.value}`"
            :class="[
              'text-sm font-medium',
              disabled ? 'text-gray-400' : 'text-gray-700',
            ]"
          >
            {{ option.label }}
          </label>
          <p
            v-if="option.description"
            :class="['text-sm text-gray-500', disabled ? 'text-gray-300' : '']"
          >
            {{ option.description }}
          </p>
        </div>
      </div>
    </div>

    <p v-if="hasError" class="mt-1 text-sm text-red-600">
      {{ errorMessage }}
    </p>

    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string | number;
  label: string;
  description?: string;
}

defineProps<{
  id: string;
  name: string;
  label?: string;
  modelValue: string | number;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  hint?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
</script>
