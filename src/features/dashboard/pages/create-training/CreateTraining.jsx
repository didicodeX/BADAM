import Button from "@/shared/components/Button";
import InputField from "@/shared/components/InputField";

export default function CreateTrainings() {
  return (
    <div className="padd-x padd-y flex flex-col gap-14">
      <h2>Créer une formation</h2>
      <main className="border-t border-t-background-200">
        <section className="flex flex-col gap-6 py-6 border-b border-b-background-200">
          <h3>Ajouter des images et des vidéos</h3>
          <div>
            <h4>Images</h4>
            <p>
              Utilisez des images qui correspondent à l'ambiance, et évitez les
              superpositions de texte distrayantes.
            </p>
          </div>
          <input type="file" name="" id="" />
          <div>
            <h4>Videos</h4>
            <p>
              Ajoutez des vidéos pour présenter votre formation. Elle seront
              affichées avec vos images.
            </p>
          </div>
          <input type="file" name="" id="" />
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
          <InputField placeholder={"Titre de la formation"} />
          <div>
            <h4>Description</h4>
            <p>
              Attirez l'attention avec une courte description claire de votre
              formation. Elle sera visible en haut de la page. Max 140
              caractères.
            </p>
          </div>
          <textarea></textarea>
        </section>
        <section className="flex flex-col gap-6 py-6 ">
          <Button>Créer la formation</Button>
        </section>
      </main>
    </div>
  );
}
