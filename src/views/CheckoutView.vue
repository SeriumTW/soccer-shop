<template>
  <main>
    <PageHeader
      title="Checkout"
      description="Completa il tuo ordine"
      showBreadcrumbs
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="cartItems.length > 0" class="flex flex-col lg:flex-row gap-8">
        <!-- Form Checkout -->
        <section class="flex-1">
          <CheckoutForm :loading="loading" @submit="handleSubmit" />
        </section>

        <!-- Riepilogo -->
        <aside class="lg:w-96">
          <CartSummary
            :items="cartItems"
            :total-items="totalItems"
            :total-amount="totalAmount"
            :shipping="shipping"
          >
            <template #footer>
              <p class="text-sm text-gray-500">
                Spedizione gratuita per ordini superiori a €100
              </p>
            </template>
          </CartSummary>
        </aside>
      </div>

      <EmptyState
        v-else
        icon="shopping-bag"
        title="Il tuo carrello è vuoto"
        description="Aggiungi dei prodotti al carrello per procedere all'acquisto"
      >
        <template #action>
          <Button variant="primary" @click="$router.push('/catalog')">
            Vai al catalogo
          </Button>
        </template>
      </EmptyState>
    </div>

    <!-- Modal Conferma -->
    <Modal
      v-model="showConfirmation"
      title="Ordine Confermato"
      description="Grazie per il tuo acquisto! Riceverai una email con i dettagli dell'ordine."
    >
      <template #footer>
        <div class="flex justify-end">
          <Button variant="primary" @click="$router.push('/')">
            Torna alla home
          </Button>
        </div>
      </template>
    </Modal>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '../stores/cart';
import { useToast } from '../composables/useToast';
import PageHeader from '../components/PageHeader.vue';
import CheckoutForm from '../components/CheckoutForm.vue';
import CartSummary from '../components/CartSummary.vue';
import EmptyState from '../components/EmptyState.vue';
import Modal from '../components/Modal.vue';
import Button from '../components/Button.vue';

const loading = ref(false);
const showConfirmation = ref(false);

const cartStore = useCartStore();
const toast = useToast();

const { cartItems, totalItems, totalAmount } = storeToRefs(cartStore);
const { clearCart } = cartStore;

const shipping = computed(() => {
  return totalAmount.value >= 100 ? 0 : 7.99;
});

async function handleSubmit(data: Record<string, string>) {
  try {
    loading.value = true;
    // Simula chiamata API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    clearCart();
    showConfirmation.value = true;
  } catch (error) {
    toast.showError('Si è verificato un errore durante il checkout');
  } finally {
    loading.value = false;
  }
}
</script>
