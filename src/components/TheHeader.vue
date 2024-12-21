<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo e Nome -->
        <router-link to="/" class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-primary-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-xl font-bold text-gray-900">Soccer Shop</span>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-primary-600"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Cart Icon -->
        <CartIcon />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import CartIcon from './CartIcon.vue';

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Catalogo', path: '/catalog' },
];
</script>
