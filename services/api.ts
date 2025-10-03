import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.8:8000/api/v1",
});

// Interceptor de requisição para adicionar o token Bearer
api.interceptors.request.use(
  (config) => {
    // Obtém o token do store de autenticação
    const { accessToken } = useAuthStore.getState();
    
    // Adiciona o token no header Authorization se existir
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta para tratar erros de autenticação
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se receber erro 401 (Unauthorized), limpa o token e redireciona para login
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
    }
    
    return Promise.reject(error);
  }
);

export default api;
