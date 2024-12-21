<template>
  <div>
    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div v-for="i in 6" :key="i" class="animate-pulse">
        <div class="bg-gray-200 h-64 rounded-lg mb-4"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>

    <div
      v-else-if="products.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div v-for="product in products" :key="product.id">
        <ProductCard
          :product="product"
          @select-size="$emit('select-size', product)"
        />
      </div>
    </div>

    <EmptyState
      v-else
      icon="search"
      title="Nessun prodotto trovato"
      description="Prova a modificare i filtri di ricerca"
    >
      <template #action>
        <Button variant="primary" @click="$emit('reset-filters')">
          Resetta Filtri
        </Button>
      </template>
    </EmptyState>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import EmptyState from './EmptyState.vue';
import Button from './Button.vue';

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
  products: Product[];
  loading?: boolean;
}>();

defineEmits<{
  (e: 'select-size', product: Product): void;
  (e: 'reset-filters'): void;
}>();
</script>
