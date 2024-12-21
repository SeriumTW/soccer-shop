import { createApp } from 'vue';
import Toast from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification';
import { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  toastDefaults: {
    success: {
      timeout: 2000,
      icon: '✅',
    },
    error: {
      timeout: 4000,
      closeButton: true,
      icon: '❌',
    },
    warning: {
      timeout: 3000,
      icon: '⚠️',
    },
    info: {
      timeout: 3000,
      icon: 'ℹ️',
    },
  },
};

export const setupToast = (app: ReturnType<typeof createApp>) => {
  app.use(Toast, options);
};
