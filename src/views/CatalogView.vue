<template>
  <main>
    <PageHeader
      title="Catalogo"
      description="Esplora la nostra collezione di maglie ufficiali"
      showBreadcrumbs
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Filtri -->
        <Filters />

        <!-- Lista Prodotti -->
        <section class="flex-1">
          <ProductGrid
            :products="filteredProducts"
            :loading="loading"
            @select-size="showSizeSelector"
            @reset-filters="resetFilters"
          />
        </section>
      </div>
    </div>

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
import PageHeader from '../components/PageHeader.vue';
import Filters from '../components/Filters.vue';
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

const { filteredProducts } = storeToRefs(productStore);
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
