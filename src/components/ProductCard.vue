<template>
  <div class="card">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-64 object-cover"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-gray-600 mt-1">{{ product.description }}</p>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-xl font-bold text-primary-600"
          >€{{ product.price.toFixed(2) }}</span
        >
        <button
          v-if="product.inStock"
          class="btn btn-primary"
          @click="$emit('select-size')"
        >
          Aggiungi al carrello
        </button>
        <span v-else class="text-red-500">Non disponibile</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  team: string;
  category: 'club' | 'national';
  sizes: string[];
  inStock: boolean;
}

defineProps<{
  product: Product;
}>();

defineEmits<{
  (e: 'select-size'): void;
}>();
</script>
