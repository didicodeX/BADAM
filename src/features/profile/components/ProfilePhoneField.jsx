import { useState } from "react";
import { Pencil } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePhoneField({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const { updateProfile } = useProfile();
  const handleUpdate = (data) => {
    updateProfile({ phone: data.phone });
  };


  return (
    <div className="flex flex-col py-6 border-b border-b-background-100">
      <h4>Votre numéro de téléphone</h4>
      <p className="font-medium text-text-700">
        Entrez un numéro pour recevoir des mises à jour par SMS
      </p>
      <div className="border border-text-200 rounded-md px-4 py-3 flex items-center justify-between">
        <span className="font-medium text-text-700">{user.phone}</span>
        <button
          onClick={() => setIsOpen(true)}
          className="text-text-700 hover:text-cta-500"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <EditProfileModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Changer votre numéro de téléphone"
          fields={[{ name: "phone", label: "Numéro de téléphone" }]}
          defaultValues={{ phone: user.phone }}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}
