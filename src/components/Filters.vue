<template>
  <aside class="w-full md:w-64 space-y-6">
    <div>
      <h3 class="text-lg font-semibold mb-2">Categoria</h3>
      <Radio
        id="category"
        name="category"
        :modelValue="filters.category"
        @update:modelValue="(value) => setFilter('category', value as string)"
        :options="[
          { value: '', label: 'Tutte' },
          { value: 'club', label: 'Club' },
          { value: 'national', label: 'Nazionali' },
        ]"
      />
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-2">Squadra</h3>
      <Select
        id="team"
        :modelValue="filters.team"
        @update:modelValue="(value) => setFilter('team', value as string)"
        :options="teams.map((team) => ({ value: team, label: team }))"
        placeholder="Tutte le squadre"
      />
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-2">
        Prezzo Massimo: €{{ filters.maxPrice || maxProductPrice }}
      </h3>
      <input
        type="range"
        :value="filters.maxPrice || maxProductPrice"
        @input="(e) => setFilter('maxPrice', +(e.target as HTMLInputElement).value)"
        :max="maxProductPrice"
        class="w-full accent-primary-600"
      />
      <div class="flex justify-between text-sm text-gray-500 mt-1">
        <span>€0</span>
        <span>€{{ maxProductPrice }}</span>
      </div>
    </div>

    <Button variant="secondary" fullWidth @click="resetFilters">
      Resetta Filtri
    </Button>

    <div v-if="hasActiveFilters" class="border-t pt-6">
      <h3 class="text-sm font-medium text-gray-900 mb-2">Filtri Attivi</h3>
      <div class="flex flex-wrap gap-2">
        <Badge
          v-if="filters.category"
          variant="primary"
          class="cursor-pointer"
          @click="setFilter('category', '')"
        >
          {{ filters.category === 'club' ? 'Club' : 'Nazionali' }}
          <span class="ml-1">×</span>
        </Badge>

        <Badge
          v-if="filters.team"
          variant="primary"
          class="cursor-pointer"
          @click="setFilter('team', '')"
        >
          {{ filters.team }}
          <span class="ml-1">×</span>
        </Badge>

        <Badge
          v-if="filters.maxPrice && filters.maxPrice < maxProductPrice"
          variant="primary"
          class="cursor-pointer"
          @click="setFilter('maxPrice', maxProductPrice)"
        >
          Max €{{ filters.maxPrice }}
          <span class="ml-1">×</span>
        </Badge>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '../stores/products';
import Radio from './Radio.vue';
import Select from './Select.vue';
import Button from './Button.vue';
import Badge from './Badge.vue';

const productStore = useProductStore();
const { teams, maxProductPrice } = storeToRefs(productStore);
const { filters, setFilter, resetFilters } = productStore;

const hasActiveFilters = computed(() => {
  return (
    !!filters.category ||
    !!filters.team ||
    (!!filters.maxPrice && filters.maxPrice < maxProductPrice.value)
  );
});
</script>
