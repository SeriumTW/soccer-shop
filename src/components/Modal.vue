<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        @click="$emit('update:modelValue', false)"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="$emit('update:modelValue', false)"
      >
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div v-if="title" class="mb-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
              </h3>
              <div v-if="description" class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ description }}
                </p>
              </div>
            </div>

            <slot></slot>

            <div v-if="$slots.footer" class="mt-5 sm:mt-6">
              <slot name="footer"></slot>
            </div>

            <button
              v-if="showClose"
              type="button"
              class="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              @click="$emit('update:modelValue', false)"
            >
              <span class="sr-only">Chiudi</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  title?: string;
  description?: string;
  showClose?: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>
