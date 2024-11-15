"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";

export type SigninFormData = {
  email: string;
  password: string;
};

type SigninFormProps = {
  loading: boolean;
  handleSignin: (params: SigninFormData) => void;
};

const SigninForm = ({ handleSignin, loading }: SigninFormProps) => {
  const [form, setForm] = useState<SigninFormData>({ email: "", password: "" });

  return (
    <div className="flex flex-col gap-4">
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
        onClick={() => handleSignin(form)}
        radius="md"
        fullWidth
        color="primary"
        isLoading={loading}
      >
        Signin
      </Button>
    </div>
  );
};

export default SigninForm;
