import { computed } from 'vue';
import { useRoute } from 'vue-router';

interface BreadcrumbItem {
  name: string;
  path: string;
  current?: boolean;
}

export function useBreadcrumbs() {
  const route = useRoute();

  const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [
      {
        name: 'Home',
        path: '/',
      },
    ];

    if (route.name === 'catalog') {
      items.push({
        name: 'Catalogo',
        path: '/catalog',
        current: true,
      });
    }

    if (route.name === 'product') {
      items.push({
        name: 'Catalogo',
        path: '/catalog',
      });
      items.push({
        name: (route.params.name as string) || 'Dettaglio Prodotto',
        path: route.path,
        current: true,
      });
    }

    if (route.name === 'cart') {
      items.push({
        name: 'Carrello',
        path: '/cart',
        current: true,
      });
    }

    if (route.name === 'checkout') {
      items.push({
        name: 'Carrello',
        path: '/cart',
      });
      items.push({
        name: 'Checkout',
        path: '/checkout',
        current: true,
      });
    }

    return items;
  });

  return {
    breadcrumbs,
  };
}
