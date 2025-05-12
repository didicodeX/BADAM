import { useForm } from "react-hook-form";
import Modal from "@/shared/components/Modal";
import { useEffect } from "react";

export default function EditBioModal({
  isOpen,
  onClose,
  defaultBio = "",
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { bio: defaultBio },
  });

  const bioValue = watch("bio");
  const maxLength = 300;

  useEffect(() => {
    if (isOpen) {
      reset({ bio: defaultBio });
    }
  }, [isOpen, defaultBio, reset]);

  const handleSave = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Modifier votre biographie">
      <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
        <textarea
          {...register("bio")}
          rows={6}
          maxLength={maxLength}
          placeholder="Parlez-nous un peu de vous..."
          className="w-full border border-text-200 rounded p-3 resize-none text-text-700"
        />
        <div className="text-sm text-text-700 text-right">
          {bioValue?.length || 0} / {maxLength} caractères
        </div>

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
            disabled={isSubmitting}
            className="px-4 py-2 text-sm rounded bg-cta-700/90 text-white hover:bg-cta-700"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </Modal>
  );
}
