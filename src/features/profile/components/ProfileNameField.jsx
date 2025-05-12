import { useState } from "react";
import { Pencil } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import { useProfile } from "../hooks/useProfile";
import { formatName } from "@/shared/utils/formatName";

export default function ProfileNameField({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateProfile } = useProfile();
  const handleUpdate = (data) => {
    updateProfile({ name: data.name });
    formatName(user.name)
  };

  return (
    <div className="flex flex-col py-6 border-b border-b-background-100">
      <h4>Nom du profil</h4>
      <p className="font-medium text-text-700">Choisissez un nom visible par les autres</p>
      <div className="border border-text-200 rounded-md px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium text-text-700">{formatName(user.name)}</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-text-700 hover:text-cta-500"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <EditProfileModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Changer votre nom"
          fields={[{ name: "name", label: "Nom" }]}
          defaultValues={{ name: formatName(user.name) }}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}
