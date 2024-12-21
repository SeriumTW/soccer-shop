<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-2">
      <li v-for="(item, index) in items" :key="item.path">
        <div class="flex items-center">
          <template v-if="index > 0">
            <svg
              class="h-5 w-5 flex-shrink-0 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
          <router-link
            v-if="!item.current"
            :to="item.path"
            class="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {{ item.name }}
          </router-link>
          <span
            v-else
            class="text-sm font-medium text-gray-900"
            aria-current="page"
          >
            {{ item.name }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string;
  path: string;
  current?: boolean;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>
