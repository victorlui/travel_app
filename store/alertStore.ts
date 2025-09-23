import { create } from 'zustand';

export interface Alert {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number; // em milissegundos, undefined = não remove automaticamente
}

interface AlertState {
  alerts: Alert[];
}

interface AlertActions {
  showAlert: (alert: Omit<Alert, 'id'>) => void;
  hideAlert: (id: string) => void;
  clearAllAlerts: () => void;
}

export type AlertStore = AlertState & AlertActions;

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: [],

  showAlert: (alertData) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const alert: Alert = {
      id,
      duration: 5000, // 5 segundos por padrão
      ...alertData,
    };

    set((state) => ({
      alerts: [...state.alerts, alert],
    }));

    // Auto-remover após o tempo especificado
    if (alert.duration) {
      setTimeout(() => {
        get().hideAlert(id);
      }, alert.duration);
    }
  },

  hideAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },

  clearAllAlerts: () => {
    set({ alerts: [] });
  },
}));

// Seletores úteis
export const useAlerts = () => useAlertStore((state) => state.alerts);