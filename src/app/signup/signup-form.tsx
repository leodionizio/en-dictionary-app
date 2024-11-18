"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export type SignupErrorsData = {
  name?: string;
  email?: string;
  password?: string;
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

  const [errors, setErrors] = useState<SignupErrorsData>({});

  const handleValidateFormField = (field: string, value: string) => {
    if (!value) {
      setErrors({ [field]: "This field is required" });

      return;
    }

    setErrors({ [field]: undefined });
  };

  const hasFormError = () =>
    Object.values(errors).some((error) => !!error) ||
    Object.values(form).some((field) => !field);

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
        className="text-start"
        isInvalid={!!errors.name}
        onBlur={(evt) => handleValidateFormField("name", (evt.target as HTMLInputElement).value)}
        errorMessage={errors.name}
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
        className="text-start"
        isInvalid={!!errors.email}
        onBlur={(evt) => handleValidateFormField("email", (evt.target as HTMLInputElement).value)}
        errorMessage={errors.email}
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
        className="text-start"
        isInvalid={!!errors.password}
        onBlur={(evt) => handleValidateFormField("password", (evt.target as HTMLInputElement).value)}
        errorMessage={errors.password}
      />

      <Button
        onClick={() => handleSignup(form)}
        radius="md"
        fullWidth
        color="primary"
        isLoading={loading}
        isDisabled={hasFormError()}
      >
        Signup
      </Button>
    </div>
  );
};

export default SignupForm;
