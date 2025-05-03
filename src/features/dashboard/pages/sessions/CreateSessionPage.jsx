import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ImageGrid from "@/shared/components/ImageGrid";
import DatePicker from "@/shared/components/DatePicker";
import TimePicker from "@/shared/components/TimePicker";
import InputField from "@/shared/components/InputField";
import LocationPicker from "@/shared/components/LocationPicker";
import Button from "@/shared/components/Button";

export default function CreateSessionPage() {
  const [selectedImage, setSelectedImage] = useState(null);

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

  const onSubmit = (data) => {
    const startDateTime = new Date(data.startDate);
    startDateTime.setHours(data.startTime.getHours(), data.startTime.getMinutes(), 0, 0);
  
    const endDateTime = new Date(data.endDate);
    endDateTime.setHours(data.endTime.getHours(), data.endTime.getMinutes(), 0, 0);
  
    const payload = {
      address: data.address,
      maxParticipants: parseInt(data.maxParticipants, 10),
      startDateTime,
      endDateTime,
      image: selectedImage, // si tu veux l'inclure ici
    };
  
    console.log(payload);
  };
  

  const handleImageSelect = (img) => {
    setSelectedImage(img);
  };
  const media = [
    "https://res.cloudinary.com/duvjrq5ca/image/upload/v1746188847/projects/BADAM/formations/1746188845514-Frame%2013.png.png",
    "https://res.cloudinary.com/duvjrq5ca/video/upload/v1746188848/projects/BADAM/formations/1746188845974-185787-876545918_small.mp4.mp4",
    "/video/[_Traduction_Française_]_Beautiful_People_-_Ed_Sheeran_ft._Khalid(360p).mp4"
  ];
  return (
    <div className="padd-x padd-y flex flex-col gap-6 md:gap-10">
      <h2>Créer une nouvelle session</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-t border-t-background-200"
      >
        <section className="flex flex-col gap-6 py-6 border-b border-b-background-200">
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
        </section>

        <section className="flex flex-col gap-6 py-6 border-b border-b-background-200">
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
        </section>

        <section className="flex flex-col gap-6 py-6 border-b border-b-background-200">
          <h4>Nombre max de participants</h4>
          <InputField
            label="Nombre max de participants"
            name="maxParticipants"
            type="number"
            {...register("maxParticipants")}
            error={errors.maxParticipants}
          />
        </section>

        <section className="flex flex-col gap-6 py-6">
          <Button type="submit">Créer la session</Button>
        </section>
      </form>
    </div>
  );
}
