import Button from "@/shared/components/Button";
import InputField from "@/shared/components/InputField";
import { useForm } from "react-hook-form";
import { useTraining } from "../../hooks/useTrainings";

export default function CreateTrainings() {
  const {
    register,
    handleSubmit,
    // setValue,
    // watch,
    formState: { errors },
  } = useForm();

  const { createTraining } = useTraining();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("titre", data.titre);
    formData.append("description", data.description);

    for (const file of data.images || []) {
      formData.append("images", file); // 👈 ce que ton backend attend
    }
    for (const file of data.videos || []) {
      formData.append("videos", file); // 👈 ce que ton backend attend
    }

    createTraining(formData);
  };

  return (
    <div className="padd-x padd-y flex flex-col gap-6 md:gap-10">
      <h2>Créer une formation</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="border-t border-t-background-200"
      >
        <section className="flex flex-col gap-6 py-6 border-b border-b-background-200">
          <h3>Ajouter des images et des vidéos</h3>
          <div>
            <h4>Images</h4>
            <p>
              Utilisez des images qui correspondent à l'ambiance, et évitez les
              superpositions de texte distrayantes.
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("images")}
          />
          <div>
            <h4>Videos</h4>
            <p>
              Ajoutez des vidéos pour présenter votre formation. Elle seront
              affichées avec vos images.
            </p>
          </div>
          <input
            type="file"
            accept="video/*"
            multiple
            {...register("videos")}
          />
        </section>
        <section className="flex flex-col gap-6 py-6 border-b border-b-background-200">
          <h3>Aperçu de la formation</h3>
          <div>
            <h4>Titre de la formation</h4>
            <p>
              Choisissez un titre clair et descriptif pour que les gens sachent
              de quoi il s'agit..
            </p>
          </div>
          <InputField
            placeholder={"Titre de la formation"}
            {...register("titre", { required: "Ce champs est requis" })}
          />
          {errors.titre && (
            <p className="text-red-500 text-sm">{errors.titre.message}</p>
          )}
          <div>
            <h4>Description</h4>
            <p>
              Attirez l'attention avec une courte description claire de votre
              formation. Elle sera visible en haut de la page. Max 140
              caractères.
            </p>
          </div>
          <textarea
            maxLength={140}
            className="w-full min-h-[80px] border rounded p-2"
            {...register("description", {
              required: "La description est requise",
              maxLength: 140,
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}{" "}
        </section>
        <section className="flex flex-col gap-6 py-6 ">
          <Button type="submit">Créer la formation</Button>
        </section>
      </form>
    </div>
  );
}
