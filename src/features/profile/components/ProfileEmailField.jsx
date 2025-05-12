import { useState } from "react";
import { Pencil } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import { useProfile } from "../hooks/useProfile";

export default function ProfileEmailField({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateProfile } = useProfile();
  const handleUpdate = (data) => {
    updateProfile({ email: data.email });
  };
  return (
    <div className="flex flex-col py-6 border-b border-b-background-100">
      <h4>Email du compte</h4>
      <p className="font-medium text-text-700">Changez votre adresse email principale</p>
      <div className="border border-text-200 rounded-md px-4 py-3 flex items-center justify-between">
        <span className="font-medium text-text-700">{user.email}</span>
        <button
          onClick={() => setIsOpen(true)}
          className="text-text-700 hover:text-cta-500"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <EditProfileModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Changer votre email"
          fields={[{ name: "email", label: "Email" }]}
          defaultValues={{ email: user.email }}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}
