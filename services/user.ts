import { useAuthStore } from "@/store/authStore";
import api from "./api";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export function useUserService() {
  const { updateUser } = useAuthStore();

  const updateProfile = async (user: UserProfile) => {
    try {
      const response = await api.put("/users/profile", user);
      updateUser({ phone: user.phone, name: user.name, email: user.email });
      return response.data;
    } catch (error: any) {
      console.error("Error updating user:", error.response);
      throw error;
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const response = await api.patch("/users/change-password", {
        old_password: currentPassword,
        new_password: newPassword,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  return { updateProfile, updatePassword };
}
