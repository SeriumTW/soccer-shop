<template>
  <main>
    <PageHeader
      title="Carrello"
      :description="`${cartItems.length} prodotti nel carrello`"
      showBreadcrumbs
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="cartItems.length > 0" class="flex flex-col lg:flex-row gap-8">
        <!-- Lista Prodotti -->
        <section class="flex-1 space-y-4">
          <CartItem
            v-for="item in cartItems"
            :key="`${item.id}-${item.size}`"
            :item="item"
            @update-quantity="updateQuantity"
            @remove="removeFromCart"
          />
        </section>

        <!-- Riepilogo -->
        <aside class="lg:w-96">
          <CartSummary
            :items="cartItems"
            :total-items="totalItems"
            :total-amount="totalAmount"
            :shipping="shipping"
          >
            <template #actions>
              <Button
                variant="primary"
                fullWidth
                @click="$router.push('/checkout')"
              >
                Procedi al checkout
              </Button>
            </template>

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
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '../stores/cart';
import { useToast } from '../composables/useToast';
import PageHeader from '../components/PageHeader.vue';
import CartItem from '../components/CartItem.vue';
import CartSummary from '../components/CartSummary.vue';
import EmptyState from '../components/EmptyState.vue';
import Button from '../components/Button.vue';

const cartStore = useCartStore();
const toast = useToast();

const { cartItems, totalItems, totalAmount } = storeToRefs(cartStore);
const { updateQuantity, removeFromCart } = cartStore;

const shipping = computed(() => {
  return totalAmount.value >= 100 ? 0 : 7.99;
});
</script>
