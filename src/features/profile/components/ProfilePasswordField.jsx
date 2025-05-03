import { useState } from "react";
import { Pencil } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import { useProfile } from "../hooks/useProfile";


export default function ProfilePasswordField() {
  const [isOpen, setIsOpen] = useState(false);

  const { updateProfile } = useProfile();
  const handleUpdate = (data) => {
    updateProfile({ password: data.password });
  };

  return (
    <div className="flex flex-col py-6 border-b border-b-background-100">
      <h4>Mot de passe du compte</h4>
      <p className="font-medium text-text-700">Changez votre mot de passe</p>
      <div className="border border-text-200 rounded-md px-4 py-3 flex items-center justify-between">
        <span className="font-medium text-text-700">••••••••••</span>
        <button
          onClick={() => setIsOpen(true)}
          className="text-text-700 hover:text-cta-500"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <EditProfileModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Changer votre mot de passe"
          fields={[
            {
              name: "password",
              label: "Nouveau mot de passe",
              type: "password",
            },
            {
              name: "confirmPassword",
              label: "Confirmer le mot de passe",
              type: "password",
            },
          ]}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}
