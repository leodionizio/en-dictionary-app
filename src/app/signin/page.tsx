"use client";
import { useAuth } from "@/app/hooks/auth";
import SigninForm, { SigninFormData } from "./signin-form";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";
import { AiFillBook } from "react-icons/ai";

const SigninPage = () => {
  const router = useRouter();
  const { signin, loading } = useAuth();

  const handleSignin = async (signinForm: SigninFormData) => {
    await signin(signinForm);
  };

  return (
    <div
      className="flex flex-col justify-center text-center"
      style={{ height: "88vh" }}
    >
      <div className="flex items-center justify-center mb-8 gap-2">
        <AiFillBook size={42} />

        <h1 className="text-3xl">
          English
           Dictionary
        </h1>
      </div>
      <SigninForm handleSignin={handleSignin} loading={loading} />

      <div className="mt-4">
        <p>
          Don&apos;t have an account?{" "}
          <Link onClick={() => router.push("/signup")}>Signup here</Link>.
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
