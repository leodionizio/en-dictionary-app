"use client";
import { useAuth } from "@/app/hooks/auth";
import SignupForm, { SignupFormData } from "./signup-form";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const { signup, loading } = useAuth();

  const handleSignup = async (signupForm: SignupFormData) => {
    await signup(signupForm);
  };

  return (
    <div
      className="flex flex-col justify-center text-center"
      style={{ height: "88vh" }}
    >
      <h2 className="text-4xl mb-8">Signup</h2>
      <SignupForm handleSignup={handleSignup} loading={loading} />

      <div className="mt-4">
        <p>
          Already have an account?{" "}
          <Link onClick={() => router.push("/signin")}>Signin here</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
