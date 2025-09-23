import { useAlertStore, Alert } from '@/store/alertStore';

export function useAlert() {
  const { showAlert } = useAlertStore();

  const showSuccess = (title: string, message?: string, duration?: number) => {
    showAlert({
      type: 'success',
      title,
      message,
      duration,
    });
  };

  const showError = (title: string, message?: string, duration?: number) => {
    showAlert({
      type: 'error',
      title,
      message,
      duration,
    });
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    showAlert({
      type: 'warning',
      title,
      message,
      duration,
    });
  };

  const showInfo = (title: string, message?: string, duration?: number) => {
    showAlert({
      type: 'info',
      title,
      message,
      duration,
    });
  };

  return {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}