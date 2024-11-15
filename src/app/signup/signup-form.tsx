"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

type SignupFormProps = {
  loading: boolean;
  handleSignup: (params: SignupFormData) => void;
};

const SignupForm = ({ handleSignup, loading }: SignupFormProps) => {
  const [form, setForm] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex flex-col gap-4">
      <Input
        fullWidth
        placeholder="Fullname"
        value={form.name}
        onValueChange={(value) => setForm({ ...form, name: value })}
        variant="bordered"
        color="primary"
        radius="md"
      />

      <Input
        fullWidth
        placeholder="E-mail"
        type="email"
        value={form.email}
        onValueChange={(value) => setForm({ ...form, email: value })}
        variant="bordered"
        color="primary"
        radius="md"
      />

      <Input
        fullWidth
        placeholder="Password"
        type="password"
        value={form.password}
        onValueChange={(value) => setForm({ ...form, password: value })}
        variant="bordered"
        color="primary"
        radius="md"
      />

      <Button
        onClick={() => handleSignup(form)}
        radius="md"
        fullWidth
        color="primary"
        isLoading={loading}
      >
        Signup
      </Button>
    </div>
  );
};

export default SignupForm;
