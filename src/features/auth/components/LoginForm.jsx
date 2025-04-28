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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 padd-l padd-r bg-white min-h-screen justify-center text-center"
    >
      <InputField
        type="email"
        {...register("email")}
        error={errors.email}
        placeholder={"Email"}
      />
      <InputField
        type="password"
        {...register("password")}
        error={errors.password}
        placeholder={"Password"}
      />
      <a href="">Mot de passe oublié ?</a>
      <button type="submit">
        {isSubmitting ? "connexioin" : "Se connecter"}
      </button>
      <div className=" items-center flex flex-col xl:flex-row gap-6 justify-center">
        <p>Vous n'avez pas encore de compte ?</p>
        <a href="">Créer un compte</a>
      </div>
    </form>
  );
}
