"use client";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import { useUserProfile } from "@/app/hooks/user";
import withAuth from "@/app/guard/with-auth";

const UserProfilePage = () => {
  const { getUserProfile, user, loading } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    getUserProfile();
  }, []);

  const redirectToPage = useCallback((page: string) => {
    router.push(page);
  }, []);

  return loading && !user ? (
    <div className="flex justify-center">
      <Spinner color="primary" labelColor="primary" />
    </div>
  ) : (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <Avatar
          showFallback
          src="https://images.unsplash.com/broken"
          size="lg"
        />
      </div>

      <div className="mt-2 text-center">
        <h2 className="text-xl">{user.name}</h2>
        <h3 className="text-sm">{user.email}</h3>
      </div>

      <hr className="my-8" />

      <div className="flex justify-center">
        <Button
          variant="solid"
          color="primary"
          onClick={() => redirectToPage("favorites")}
        >
          See favorites words
        </Button>
      </div>
    </div>
  );
};

export default withAuth(UserProfilePage);
