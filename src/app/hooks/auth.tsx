import { useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useApiService } from "../api";
import { Signin, Signup } from "../types/auth";
import { AuthContext } from "../contexts/auth-context";
import { useToastMessage } from "./toast";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { storeToken } = useContext(AuthContext);
  const { toast } = useToastMessage();
  const router = useRouter();
  const apiService = useApiService();

  const signin = useCallback(
    async (signinData: Signin) => {
      setLoading(true);
      try {
        const { token } = await apiService.auth.signin(signinData);
        storeToken(token);
        router.push("/dictionary");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [apiService, toast, storeToken, router, setLoading]
  );

  const signup = useCallback(
    async (signinData: Signup) => {
      setLoading(true);
      try {
        const { token } = await apiService.auth.signup(signinData);
        toast.success("User signedup successful!");
        storeToken(token);
        router.push("/dictionary");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [apiService, toast, storeToken, router]
  );

  return { signin, signup, loading };
};
