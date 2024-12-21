<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="product" class="flex flex-col md:flex-row gap-8">
      <!-- Immagine Prodotto -->
      <div class="md:w-1/2">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      <!-- Dettagli Prodotto -->
      <div class="md:w-1/2 space-y-6">
        <div>
          <h1 class="text-3xl font-bold">{{ product.name }}</h1>
          <p class="text-gray-600 mt-2">{{ product.description }}</p>
        </div>

        <div>
          <p class="text-2xl font-bold text-primary-600">
            €{{ product.price.toFixed(2) }}
          </p>
        </div>

        <div v-if="product.inStock">
          <h3 class="text-lg font-semibold mb-2">Seleziona la Taglia</h3>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="size in product.sizes"
              :key="size"
              class="btn"
              :class="selectedSize === size ? 'btn-primary' : 'btn-secondary'"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <button
          class="btn btn-primary w-full"
          :disabled="!product.inStock || !selectedSize"
          @click="addToCart"
        >
          {{ product.inStock ? 'Aggiungi al Carrello' : 'Non Disponibile' }}
        </button>

        <div class="border-t pt-6">
          <h3 class="text-lg font-semibold mb-2">Dettagli</h3>
          <ul class="space-y-2 text-gray-600">
            <li>Squadra: {{ product.team }}</li>
            <li>
              Categoria:
              {{ product.category === 'club' ? 'Club' : 'Nazionale' }}
            </li>
            <li>Taglie disponibili: {{ product.sizes.join(', ') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">Prodotto non trovato</p>
      <router-link to="/catalog" class="btn btn-primary mt-4">
        Torna al catalogo
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const product = ref(productStore.getProductById(Number(route.params.id)));
const selectedSize = ref('');

function addToCart() {
  if (product.value && selectedSize.value) {
    cartStore.addToCart({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      size: selectedSize.value,
    });
    router.push('/cart');
  }
}

onMounted(() => {
  if (!product.value) {
    router.push('/catalog');
  }
});
</script>
