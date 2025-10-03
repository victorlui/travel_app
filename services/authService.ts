import { useAlertStore } from "@/store/alertStore";
import { useAuthStore } from "@/store/authStore";
import { AuthResponse } from "@/types/auth";
import api from "./api";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const { setLoading } = useAuthStore.getState();
  const { showAlert } = useAlertStore.getState();
  try {
    setLoading(true);

    await api.post("/users/register", {
      name,
      email,
      password,
    });

    const response = await loginUser(email, password);
    return response;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Email ou senha incorretos. Verifique suas credenciais e tente novamente.";
    showAlert({
      type: "error",
      title: "Erro no login",
      message: errorMessage,
      duration: 5000,
    });
    setLoading(false);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  const { login, setLoading } = useAuthStore.getState();
  const { showAlert } = useAlertStore.getState();

  setLoading(true);
  try {
    const response = await api.post<AuthResponse>("/users/login", {
      email,
      password,
    });

    // Armazenar os dados no store usando SecureStore
    if (response.data.success && response.data.data) {
      login(response.data.data);
    }

    return response.data;
  } catch (error: any) {
    showAlert({
      type: "error",
      title: "Erro no login",
      message: "E-mail ou senha inválidas",
      duration: 5000,
    });
    throw error;
  } finally {
    setLoading(false);
  }
}

export async function logoutUser() {
  const { logout } = useAuthStore.getState();

  try {
    // Aqui você pode fazer uma chamada para a API para invalidar o token se necessário
    // await api.post("/users/logout");

    logout();
  } catch (error) {
    console.error("Error logging out user:", error);
    // Mesmo com erro, fazer logout local
    logout();
  }
}
