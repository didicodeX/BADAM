import { useState } from "react";
import { Pencil } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import { useProfile } from "../hooks/useProfile";
import EditBioModal from "./EditBioModal";

export default function ProfileBioField({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateProfile } = useProfile();

  // const handleUpdate = (data) => {
  //   updateProfile({ bio: data.bio });
  // };

  const displayBio = user.bio?.trim()
    ? user.bio
    : "Aucune biographie renseignée pour le moment.";

  return (
    <div className="flex flex-col py-6 border-b border-b-background-100">
      <h4>Votre biographie</h4>
      <p className="text-sm text-text-700">Quelques mots sur vous…</p>

      <div className="border border-text-200 rounded-md px-4 py-3 mt-2 flex items-start justify-between gap-4">
        <p className="whitespace-pre-wrap text-text-800">{displayBio}</p>
        <button
          onClick={() => setIsOpen(true)}
          className="text-text-700 hover:text-cta-500 shrink-0"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>

      <EditBioModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultBio={user.bio}
        onSubmit={(data) => updateProfile({ bio: data.bio })}
      />
    </div>
  );
}
