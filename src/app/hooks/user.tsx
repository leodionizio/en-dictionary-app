import { useCallback, useContext, useState } from "react";
import { useApiService } from "@/app/api";
import { UserProfileContext } from "@/app/contexts/user-context";
import { useToastMessage } from "./toast";

export const useUserProfile = () => {
  const apiService = useApiService();
  const { user, setUser } = useContext(UserProfileContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToastMessage();

  const getUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const user = await apiService.user.getUserProfile();
      setUser(user);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, apiService, toast]);

  return { getUserProfile, user, loading };
};
