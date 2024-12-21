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
      <select
        :id="id"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
        "
        @blur="$emit('blur')"
        :class="[
          'input appearance-none pr-10',
          hasError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-primary-500',
        ]"
        v-bind="$attrs"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
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
interface Option {
  value: string | number;
  label: string;
}

defineProps<{
  id: string;
  label?: string;
  modelValue: string | number;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  hint?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur'): void;
}>();
</script>
