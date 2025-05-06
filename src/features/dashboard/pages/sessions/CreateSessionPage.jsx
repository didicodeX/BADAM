import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageGrid from "@/shared/components/ImageGrid";
import DatePicker from "@/shared/components/DatePicker";
import TimePicker from "@/shared/components/TimePicker";
import InputField from "@/shared/components/InputField";
import LocationPicker from "@/shared/components/LocationPicker";
import Button from "@/shared/components/Button";
import { useParams } from "react-router-dom";
import { useTraining } from "../../hooks/useTrainings";
import { useSession } from "../../hooks/useSessions";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";

export default function CreateSessionPage() {
  const { id: trainingId } = useParams();
  console.log("trainingId depuis useParams:", trainingId);
  const { training } = useTraining(trainingId);
  console.log("create session", trainingId);

  const { createSession } = useSession(trainingId);
  const [selectedImage, setSelectedImage] = useState(null);

  const media = training?.images || [];

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

  console.log("selectedImage : ",selectedImage);
  const onSubmit = (data) => {
    console.log("selectedImage : ",selectedImage);

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
      coverImage: selectedImage,
    };

    console.log("id: ", trainingId, "\npayload: ", payload);

    createSession({ trainingId, ...payload });
  };

  const handleImageSelect = (img) => {
    setSelectedImage(img);
  };

  return (
    <Content className="padd-x padd-y flex flex-col gap-6 md:gap-10">
      <h2>Créer une nouvelle session</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-t border-t-background-100"
      >
        <Section>
          <div>
            <h4>Image de couverture</h4>
            <p>
              Choisissez une image qui correspond à l'ambiance, et évitez les
              superpositions de texte distrayantes.
            </p>
          </div>
          <ImageGrid
            images={media}
            selected={selectedImage}
            onSelect={handleImageSelect}
          />
        </Section>

        <Section>
          <h4>Date et Heure</h4>
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
            onChange={(address) => setValue("address", address)}
          />
        </Section>

        <Section>
          <h4>Nombre max de participants</h4>
          <InputField
            label="Nombre max de participants"
            name="maxParticipants"
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
