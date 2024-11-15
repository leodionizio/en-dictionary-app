import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (Component: ComponentType) => {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/signin");
      }
    }, [router]);

    return <Component {...props} />;
  };
};

export default withAuth;
