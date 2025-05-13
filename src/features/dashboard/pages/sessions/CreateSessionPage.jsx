import { useState } from "react";
import { useForm } from "react-hook-form";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import ImageGrid from "@/shared/components/ImageGrid";
import MediaUploader from "../../components/MediaUploader";
import MediaPreviewList from "../../components/MediaPreviewList";
import InputField from "@/shared/components/InputField";
import DatePicker from "@/shared/components/DatePicker";
import TimePicker from "@/shared/components/TimePicker";
import LocationPicker from "@/shared/components/LocationPicker";
import Button from "@/shared/components/Button";
import { useParams } from "react-router-dom";
import { useTraining } from "../../hooks/useTrainings";
import { useSession } from "../../hooks/useSessions";
import { uploadToCloudinary } from "@/shared/utils/uploadToCloudinary";

export default function CreateSessionPage() {
  const { id: trainingId } = useParams();
  const { training } = useTraining(trainingId);
  const { createSession } = useSession(trainingId);

  const media = training?.images || [];

  const [selectedImage, setSelectedImage] = useState(null); // depuis ImageGrid
  const [uploadedImage, setUploadedImage] = useState(null); // upload direct

  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      maxParticipants: "",
      address: "",
    },
  });

  const onSubmit = async (data) => {
    let coverImage = selectedImage || training.images[0];

    if (uploadedImage) {
      const uploadedUrl = await uploadToCloudinary(uploadedImage, {
        folder: "projects/BADAM/trainings",
        resourceType: "image",
        setProgress: () => {},
      });

      if (uploadedUrl) {
        coverImage = uploadedUrl;
      }
    }

    const startDateTime = new Date(data.startDate);
    startDateTime.setHours(
      data.startTime.getHours(),
      data.startTime.getMinutes(),
      0,
      0
    );

    const endDateTime = new Date(data.endDate);
    endDateTime.setHours(
      data.endTime.getHours(),
      data.endTime.getMinutes(),
      0,
      0
    );

    const payload = {
      address: data.address,
      maxParticipants: parseInt(data.maxParticipants, 10) || 0,
      startDateTime,
      endDateTime,
      coverImage,
    };

    createSession({ trainingId, ...payload });
  };

  return (
    <Content>
      <h2>Créer une nouvelle session</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Section>
          <h3>Image de couverture</h3>
          <p>Choisissez une image parmi celles de la formation ou importez-en une nouvelle.</p>

          {/* Sélection depuis la formation */}
          <ImageGrid
            images={media}
            selected={selectedImage}
            onSelect={(img) => {
              setSelectedImage(img);
              setUploadedImage(null); // on annule l’upload si sélection manuelle
            }}
          />

          {/* Upload image personnalisée */}
          <MediaUploader
            accept="image"
            onFilesAdded={(files) => {
              const file = files[0];
              setUploadedImage(file);
              setSelectedImage(null); // on annule la sélection manuelle
            }}
          />

          <MediaPreviewList
            files={uploadedImage ? [uploadedImage] : []}
            onRemove={() => setUploadedImage(null)}
          />
        </Section>

        <Section>
          <h3>Date et heure</h3>
          <div className="flex flex-wrap gap-4">
            <DatePicker label="Date de début" name="startDate" control={control} error={errors.startDate} />
            <DatePicker label="Date de fin" name="endDate" control={control} error={errors.endDate} />
            <TimePicker label="Heure de début" name="startTime" control={control} error={errors.startTime} />
            <TimePicker label="Heure de fin" name="endTime" control={control} error={errors.endTime} />
          </div>
          <LocationPicker value={watch("address")} onChange={(val) => setValue("address", val)} />
        </Section>

        <Section>
          <h3>Nombre maximal de participants</h3>
          <InputField
            label="Nombre max de participants"
            type="number"
            {...register("maxParticipants")}
            error={errors.maxParticipants}
          />
        </Section>

        <Section last>
          <Button type="submit">Créer la session</Button>
        </Section>
      </form>
    </Content>
  );
}
