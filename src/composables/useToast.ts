import { useToast as useVueToast } from 'vue-toastification';

export function useToast() {
  const toast = useVueToast();

  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  const showWarning = (message: string) => {
    toast.warning(message);
  };

  const showInfo = (message: string) => {
    toast.info(message);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}
