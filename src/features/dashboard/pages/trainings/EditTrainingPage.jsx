import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useTraining } from "../../hooks/useTrainings";
import { Loader } from "lucide-react";
import InputField from "@/shared/components/InputField";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import Button from "@/shared/components/Button";
import MediaUploader from "../../components/MediaUploader";
import { uploadToCloudinary } from "@/shared/utils/uploadToCloudinary";
import { toastError } from "@/shared/components/toast";
import MediaPreviewList from "../../components/MediaPreviewList";

export default function EditTrainingPage() {
  const { id } = useParams();
  const { training, isLoadingTraining, isErrorTraining, updateTraining } =
    useTraining(id);

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [newFiles, setNewFiles] = useState([]);

  const handleAddFiles = (files) => {
    setNewFiles((prev) => [...prev, ...files]);
  };

  // Pour supprimer localement
  const handleRemoveMedia = (type, index) => {
    if (type === "image") {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Une fois la data dispo, on la met dans le form
  useEffect(() => {
    if (training) {
      reset({
        title: training.title,
        description: training.description,
      });

      setImages(training.images || []);
      setVideos(training.videos || []);
    }
  }, [training, reset]);

  const onSubmit = async (formData) => {
    try {
      // 1. Upload des nouveaux fichiers vers Cloudinary
      const uploadPromises = newFiles.map((file) => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      const newImages = uploadedUrls.filter((url) => !url.endsWith(".mp4"));
      const newVideos = uploadedUrls.filter((url) => url.endsWith(".mp4"));

      // 2. Fusion avec les anciens fichiers conservés
      const updatedData = {
        title: formData.title,
        description: formData.description,
        images: [...images, ...newImages],
        videos: [...videos, ...newVideos],
      };

      // 3. Envoi API
      updateTraining({ id, updatedData });
    } catch (err) {
      toastError("Erreur lors de l’upload des fichiers");
      console.error(err);
    }
  };

  if (isLoadingTraining) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }

  if (isErrorTraining || !training) {
    return (
      <p className="text-center text-red-500">
        Impossible de charger la formation.
      </p>
    );
  }

  return (
    <Content>
      <h2>Modifier la formation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <h3>Médias actuels</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((url, i) => (
              <div key={i} className="relative group">
                <img src={url} className="rounded object-cover w-full h-32" />
                <button
                  type="button"
                  onClick={() => handleRemoveMedia("image", i)}
                  className="absolute top-1 right-1 text-sm bg-red-500 text-white px-1 rounded opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
            {videos.map((url, i) => (
              <div key={i} className="relative group">
                <video src={url} className="rounded w-full h-32 object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveMedia("video", i)}
                  className="absolute top-1 right-1 text-sm bg-red-500 text-white px-1 rounded opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <h3>Ajouter des médias</h3>
          <MediaUploader onFilesAdded={handleAddFiles} />
          {newFiles.length > 0 && (
            <ul className="mt-2 text-sm text-text-500">
              {newFiles.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          )}
          <MediaPreviewList
            files={newFiles}
            onRemove={(index) =>
              setNewFiles((prev) => prev.filter((_, i) => i !== index))
            }
          />
        </Section>

        {/* Titre */}
        <Section>
          <h3>Titre</h3>
          <InputField
            type="text"
            {...register("title", { required: "Ce champ est requis." })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </Section>

        {/* Description */}
        <Section>
          <h3>Description</h3>
          <textarea
            {...register("description", { required: "Ce champ est requis." })}
            rows={8}
            className="h-44"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </Section>

        <Section last={true}>
          <Button type="submit" disabled={isSubmitting}>
            Mettre à jour
          </Button>
        </Section>
      </form>
    </Content>
  );
}
