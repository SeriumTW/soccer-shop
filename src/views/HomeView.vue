<template>
  <main>
    <section class="bg-primary-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">Le Migliori Maglie da Calcio</h1>
          <p class="text-xl mb-8">
            Scopri la nostra collezione di maglie ufficiali
          </p>
          <router-link
            to="/catalog"
            class="btn bg-white text-primary-600 hover:bg-gray-100"
          >
            Vai al catalogo
          </router-link>
        </div>
      </div>
    </section>

    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold mb-8">Prodotti in Evidenza</h2>

        <ProductGrid
          :products="products"
          :loading="loading"
          @select-size="showSizeSelector"
          @reset-filters="resetFilters"
        />
      </div>
    </section>

    <!-- Size Selector Modal -->
    <Modal v-model="showModal" title="Seleziona la taglia" showClose>
      <div class="grid grid-cols-2 gap-2 mb-4">
        <Button
          v-for="size in selectedProduct?.sizes"
          :key="size"
          :variant="selectedSize === size ? 'primary' : 'secondary'"
          @click="selectedSize = size"
        >
          {{ size }}
        </Button>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button variant="secondary" @click="showModal = false">
            Annulla
          </Button>
          <Button
            variant="primary"
            :disabled="!selectedSize"
            @click="handleAddToCart"
          >
            Conferma
          </Button>
        </div>
      </template>
    </Modal>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart';
import { useToast } from '../composables/useToast';
import ProductGrid from '../components/ProductGrid.vue';
import Modal from '../components/Modal.vue';
import Button from '../components/Button.vue';

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

const loading = ref(false);
const showModal = ref(false);
const selectedProduct = ref<Product | null>(null);
const selectedSize = ref('');

const productStore = useProductStore();
const cartStore = useCartStore();
const toast = useToast();

const { products } = storeToRefs(productStore);
const { resetFilters } = productStore;

function showSizeSelector(product: Product) {
  selectedProduct.value = product;
  selectedSize.value = '';
  showModal.value = true;
}

function handleAddToCart() {
  if (selectedProduct.value && selectedSize.value) {
    cartStore.addToCart({
      id: selectedProduct.value.id,
      name: selectedProduct.value.name,
      price: selectedProduct.value.price,
      image: selectedProduct.value.image,
      size: selectedSize.value,
    });
    showModal.value = false;
    toast.showSuccess('Prodotto aggiunto al carrello');
  }
}
</script>
