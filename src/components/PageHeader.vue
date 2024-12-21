<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
          <Breadcrumbs
            v-if="showBreadcrumbs"
            :items="breadcrumbs"
            class="mb-2"
          />
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
          >
            {{ title }}
          </h2>
          <p v-if="description" class="mt-1 text-sm text-gray-500">
            {{ description }}
          </p>
        </div>
        <div v-if="$slots.actions" class="mt-5 flex lg:ml-4 lg:mt-0">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Breadcrumbs from './Breadcrumbs.vue';
import { useBreadcrumbs } from '../composables/useBreadcrumbs';

const props = defineProps<{
  title: string;
  description?: string;
  showBreadcrumbs?: boolean;
}>();

const { breadcrumbs } = useBreadcrumbs();
</script>
