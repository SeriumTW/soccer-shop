<template>
  <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
    <img
      :src="item.image"
      :alt="item.name"
      class="w-24 h-24 object-cover rounded"
    />

    <div class="flex-1">
      <h3 class="font-semibold">{{ item.name }}</h3>
      <p class="text-gray-600">Taglia: {{ item.size }}</p>
      <p class="text-primary-600 font-medium">€{{ item.price.toFixed(2) }}</p>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="p-1 hover:bg-gray-100 rounded"
        @click="$emit('update-quantity', item.id, item.size, item.quantity - 1)"
        :disabled="item.quantity <= 1"
        :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <span class="w-8 text-center">{{ item.quantity }}</span>

      <button
        class="p-1 hover:bg-gray-100 rounded"
        @click="$emit('update-quantity', item.id, item.size, item.quantity + 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <button
        class="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
        @click="$emit('remove', item.id, item.size)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

defineProps<{
  item: CartItem;
}>();

defineEmits<{
  (e: 'update-quantity', id: number, size: string, quantity: number): void;
  (e: 'remove', id: number, size: string): void;
}>();
</script>
