import { useForm } from "react-hook-form";
import { X, Pencil } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Button from "@/shared/components/Button";
import InputField from "@/shared/components/InputField";

export default function EditProfileModal({
  isOpen,
  onClose,
  title,
  fields, 
  onSubmit,
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleSave = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 ">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-background-50 rounded-md shadow-md max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-text-500 hover:text-error-500"
          >
            <X className="w-5 h-5" />
          </button>

          <Dialog.Title className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Pencil className="w-4 h-4 text-cta-500" />
            {title}
          </Dialog.Title>

          <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm mb-1" htmlFor={field.name}>
                  {field.label}
                </label>
                <InputField
                  id={field.name}
                  type={field.type || "text"}
                  placeholder="placeholder"
                  {...register(field.name, { required: true })}
                  className="w-full border border-text-200 rounded px-3 py-2 bg-transparent"
                />
                {errors[field.name] && (
                  <p className="text-error-500 text-sm mt-1">Ce champ est requis</p>
                )}
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded hover:bg-cta-100 text-orange-700"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded bg-cta-700/90 text-white hover:bg-cta-700"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
