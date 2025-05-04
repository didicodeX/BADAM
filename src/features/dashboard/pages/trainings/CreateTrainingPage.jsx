import { useState } from "react";
import Button from "@/shared/components/Button";
import InputField from "@/shared/components/InputField";
import { useForm } from "react-hook-form";
import { useTraining } from "../../hooks/useTrainings";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import { uploadToCloudinary } from "@/shared/utils/uploadToCloudinary";
import MediaUploader from "../../components/MediaUploader";
import MediaPreviewList from "../../components/MediaPreviewList";
import ProgressBar from "../../components/ProgressBar";

export default function CreateTrainingPage() {
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createTraining } = useTraining();

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  const onSubmit = async (data) => {
    const images = [];
    const videos = [];
    const totalFiles = imageFiles.length + videoFiles.length;
    let uploadedCount = 0;

    const updateGlobalProgress = () => {
      uploadedCount += 1;
      const percent = Math.round((uploadedCount / totalFiles) * 100);
      setGlobalProgress(percent);
    };

    for (const file of imageFiles) {
      const url = await uploadToCloudinary(file, {
        folder: "projects/BADAM/trainings",
        resourceType: "image",
        setProgress: () => {}, // pas besoin de progress individuel ici
      });
      if (url) {
        images.push(url);
        updateGlobalProgress();
      }
    }

    for (const file of videoFiles) {
      const url = await uploadToCloudinary(file, {
        folder: "projects/BADAM/trainings",
        resourceType: "video",
        setProgress: () => {}, // idem
      });
      if (url) {
        videos.push(url);
        updateGlobalProgress();
      }
    }

    const payload = {
      title: data.title,
      description: data.description,
      images,
      videos,
    };

    createTraining(payload);
    setGlobalProgress(0); // reset après soumission
  };

  return (
    <Content>
      {globalProgress > 0 && <ProgressBar value={globalProgress} />}

      <h2>Créer une formation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Section>
          <h3>Ajouter des images et des vidéos</h3>
          <Section>
            <div>
              <h4>Images</h4>
              <p>
                Utilisez des images qui correspondent à l'ambiance, et évitez
                les superpositions de texte distrayantes.
              </p>
            </div>
            <MediaUploader
              accept="image"
              onFilesAdded={(files) =>
                setImageFiles((prev) => [...prev, ...files])
              }
            />
            <MediaPreviewList
              files={imageFiles}
              onRemove={(i) =>
                setImageFiles(imageFiles.filter((_, idx) => idx !== i))
              }
            />
          </Section>

          <Section>
            <div>
              <h4>Videos</h4>
              <p>
                Ajoutez des vidéos pour présenter votre formation. Elle seront
                affichées avec vos images.
              </p>
            </div>
            <MediaUploader
              accept="video"
              onFilesAdded={(files) =>
                setVideoFiles((prev) => [...prev, ...files])
              }
            />
            <MediaPreviewList
              files={videoFiles}
              onRemove={(i) =>
                setVideoFiles(videoFiles.filter((_, idx) => idx !== i))
              }
            />
          </Section>
        </Section>

        <Section>
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
            {...register("title", { required: "Ce champs est requis" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
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
            maxLength={800}
            className="w-full min-h-[80px] border rounded p-2"
            {...register("description", {
              required: "La description est requise",
              maxLength: 800,
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </Section>

        <Section last={true}>
          <Button type="submit">Créer la formation</Button>
        </Section>
      </form>
    </Content>
  );
}
