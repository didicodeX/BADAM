import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import Button from "@/shared/components/Button";
import DatePicker from "@/shared/components/DatePicker";
import TimePicker from "@/shared/components/TimePicker";
import InputField from "@/shared/components/InputField";
import LocationPicker from "@/shared/components/LocationPicker";
import MediaUploader from "../../components/MediaUploader";
import ImageGrid from "@/shared/components/ImageGrid";
import ProgressBar from "../../components/ProgressBar";
import { uploadToCloudinary } from "@/shared/utils/uploadToCloudinary";
import { useSession } from "../../hooks/useSessions";
// import { useTrainingStore } from "../../store/training.store";
import SingleImagePreview from "../../components/SingleImagePreview";

export default function EditSessionPage() {
  const { id } = useParams();
  const { mySessionDetail, updateSession } = useSession(id);

  const [mediaFiles, setMediaFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const training = mySessionDetail?.session?.training;
  const {
    control,
    register,
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      address: "",
      maxParticipants: "",
    },
  });

  useEffect(() => {
    if (mySessionDetail?.session) {
      const s = mySessionDetail.session;
      const start = new Date(s.startDateTime);
      const end = new Date(s.endDateTime);

      reset({
        startDate: start,
        endDate: end,
        startTime: start,
        endTime: end,
        address: s.address,
        maxParticipants: s.maxParticipants,
      });

      if (s.coverImage) {
        setMediaFiles([{ preview: s.coverImage, type: "image" }]);
      }
    }
  }, [mySessionDetail, reset]);

  const onSubmit = async (data) => {
    const fileItem = mediaFiles[0];
    let coverImage = null;

    if (fileItem instanceof File) {
      coverImage = await uploadToCloudinary(fileItem, {
        folder: "projects/BADAM/trainings",
        resourceType: "image",
        setProgress,
      });
    } else if (fileItem?.preview) {
      coverImage = fileItem.preview;
    }

    const startDateTime = new Date(data.startDate);
    startDateTime.setHours(
      data.startTime.getHours(),
      data.startTime.getMinutes()
    );

    const endDateTime = new Date(data.endDate);
    endDateTime.setHours(data.endTime.getHours(), data.endTime.getMinutes());

    const updatedData = {
      coverImage,
      address: data.address,
      maxParticipants: parseInt(data.maxParticipants, 10) || 0,
      startDateTime,
      endDateTime,
    };

    updateSession({ id, updatedData });
  };

  return (
    <Content>
      {progress > 0 && <ProgressBar value={progress} />}
      <h2>Modifier cette session</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Section>
          <h3>Image de couverture</h3>
          <p>Choisissez une image existante ou uploadez une nouvelle.</p>

          <ImageGrid
            images={training?.images || []}
            selected={mediaFiles[0]?.preview}
            onSelect={(imgUrl) =>
              setMediaFiles([{ preview: imgUrl, type: "image" }])
            }
          />

          <MediaUploader
            accept="image"
            onFilesAdded={(files) => {
              const file = files[0];
              setMediaFiles([file]); // file est de type File
            }}
          />

          {mediaFiles.length > 0 && (
            <SingleImagePreview
              file={mediaFiles[0]}
              onRemove={() => setMediaFiles([])}
            />
          )}
        </Section>

        <Section>
          <h3>Date et heure</h3>
          <div className="flex flex-wrap gap-4">
            <DatePicker
              label="Date de début"
              name="startDate"
              control={control}
              error={errors.startDate}
            />
            <DatePicker
              label="Date de fin"
              name="endDate"
              control={control}
              error={errors.endDate}
            />
            <TimePicker
              label="Heure de début"
              name="startTime"
              control={control}
              error={errors.startTime}
            />
            <TimePicker
              label="Heure de fin"
              name="endTime"
              control={control}
              error={errors.endTime}
            />
          </div>
          <LocationPicker
            value={watch("address")}
            onChange={(val) => setValue("address", val)}
          />
        </Section>

        <Section>
          <h3>Participants</h3>
          <InputField
            label="Nombre max de participants"
            type="number"
            {...register("maxParticipants")}
            error={errors.maxParticipants}
          />
        </Section>

        <Section last>
          <Button type="submit">Enregistrer les modifications</Button>
        </Section>
      </form>
    </Content>
  );
}
