<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h2 class="text-lg font-semibold mb-4">Riepilogo Ordine</h2>

    <div class="space-y-4 mb-4">
      <div v-for="item in items" :key="`${item.id}-${item.size}`">
        <div class="flex justify-between text-sm">
          <span>{{ item.name }} ({{ item.size }})</span>
          <span>x{{ item.quantity }}</span>
        </div>
        <div class="text-primary-600 text-right">
          €{{ (item.price * item.quantity).toFixed(2) }}
        </div>
      </div>
    </div>

    <div class="border-t pt-4 space-y-2">
      <div class="flex justify-between">
        <span>Totale prodotti</span>
        <span>{{ totalItems }}</span>
      </div>

      <div v-if="shipping" class="flex justify-between text-sm">
        <span>Spedizione</span>
        <span>€{{ shipping.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between font-semibold text-lg">
        <span>Totale</span>
        <span>€{{ (totalAmount + (shipping || 0)).toFixed(2) }}</span>
      </div>
    </div>

    <div class="mt-6">
      <slot name="actions"></slot>
    </div>

    <div v-if="$slots.footer" class="mt-4 pt-4 border-t">
      <slot name="footer"></slot>
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
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  shipping?: number;
}>();
</script>
