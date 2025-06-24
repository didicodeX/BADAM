import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/shared/components/InputField";
import { Link } from "react-router-dom";
import Button from "@/shared/components/Button";

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
      <h3>Connectez-vous à votre compte</h3>
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
      <Link to="/forgot-password">Mot de passe oublié ?</Link>

      <div>
        <Button type="submit">
          {isSubmitting ? "connexion" : "Se connecter"}
        </Button>
      </div>
      <div className=" items-center flex flex-col xl:flex-row gap-6 justify-center">
        <small>Vous n'avez pas encore de compte ?</small>
        <Link to="/register">Créer un compte</Link>
      </div>
    </form>
  );
}
