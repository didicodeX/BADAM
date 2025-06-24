import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signupSchema } from "../schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/shared/components/InputField";
import { Link } from "react-router-dom";
import Button from "@/shared/components/Button";

export function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (values) => {
    signup(values);
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 padd-l padd-r bg-white min-h-screen justify-center text-center"
    >
      <h3>Créer un nouveau compte</h3>
      <InputField
        type="text"
        {...register("name")}
        error={errors.name}
        placeholder={"Name"}
      />
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
      <div>
        <Button type="submit">{isSubmitting ? "inscription" : "S'inscrire"}</Button>
      </div>
      <div className=" items-center flex flex-col xl:flex-row gap-6 justify-center">
        <small>Déjà membre ?</small>
        <Link to="/login">Se connecter</Link>
      </div>
    </form>
  );
}
