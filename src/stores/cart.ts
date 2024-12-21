import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([]);

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalAmount = computed(() => {
    return cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  function addToCart(product: Omit<CartItem, 'quantity'>) {
    const existingItem = cartItems.value.find(
      (item) => item.id === product.id && item.size === product.size
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  }

  function updateQuantity(id: number, size: string, quantity: number) {
    const item = cartItems.value.find(
      (item) => item.id === id && item.size === size
    );

    if (item) {
      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        removeFromCart(id, size);
      }
    }
  }

  function removeFromCart(id: number, size: string) {
    const index = cartItems.value.findIndex(
      (item) => item.id === id && item.size === size
    );

    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
  }

  function clearCart() {
    cartItems.value = [];
  }

  return {
    cartItems,
    totalItems,
    totalAmount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
});
