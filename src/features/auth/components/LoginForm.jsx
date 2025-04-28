import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/shared/components/InputField";

export function LoginForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values) => {
    login(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="email"
        {...register("email")}
        error={errors.email}
        placeholder={"Email"}
      />
      <br />
      <br />
      <InputField
        type="password"
        {...register("password")}
        error={errors.password}
        placeholder={"Password"}
      />
      <button type="submit">
        {isSubmitting ? "connexioin" : "Se connecter"}
      </button>
    </form>
  );
}
