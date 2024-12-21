import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

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

type FilterValue = string | number;

interface Filters {
  category: string;
  team: string;
  maxPrice: number;
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([
    {
      id: 1,
      name: 'Maglia Inter Home 2023/24',
      price: 89.99,
      image: '/images/inter-home.jpg',
      description: 'Maglia ufficiale Inter Home stagione 2023/24',
      team: 'Inter',
      category: 'club',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
    },
    {
      id: 2,
      name: 'Maglia Italia Home 2024',
      price: 99.99,
      image: '/images/italia-home.jpg',
      description: 'Maglia ufficiale Nazionale Italiana 2024',
      team: 'Italia',
      category: 'national',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
    },
    {
      id: 3,
      name: 'Maglia Milan Away 2023/24',
      price: 89.99,
      image: '/images/milan-away.jpg',
      description: 'Maglia ufficiale Milan Away stagione 2023/24',
      team: 'Milan',
      category: 'club',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
    },
  ]);

  const filters = ref<Filters>({
    category: '',
    team: '',
    maxPrice: 0,
  });

  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const categoryMatch =
        !filters.value.category || product.category === filters.value.category;
      const teamMatch =
        !filters.value.team || product.team === filters.value.team;
      const priceMatch =
        !filters.value.maxPrice || product.price <= filters.value.maxPrice;
      return categoryMatch && teamMatch && priceMatch;
    });
  });

  const teams = computed(() => {
    return [...new Set(products.value.map((p) => p.team))];
  });

  const maxProductPrice = computed(() => {
    return Math.max(...products.value.map((p) => p.price));
  });

  function setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    filters.value[key] = value;
  }

  function resetFilters() {
    filters.value = {
      category: '',
      team: '',
      maxPrice: 0,
    };
  }

  function getProductById(id: number) {
    return products.value.find((p) => p.id === id);
  }

  return {
    products,
    filters,
    filteredProducts,
    teams,
    maxProductPrice,
    setFilter,
    resetFilters,
    getProductById,
  };
});
