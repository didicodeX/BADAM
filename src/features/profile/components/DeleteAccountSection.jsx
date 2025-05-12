import { useState } from "react";
import ConfirmDeleteModal from "@/shared/components/ConfirmDeleteModal";
import { useProfile } from "../hooks/useProfile";

export default function DeleteAccountSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteUser } = useProfile();

  const handleDeleteAccount = () => {
    deleteUser();
  };

  return (
    <div className="flex flex-col py-6 gap-2">
      <h4>Supprimer mon compte</h4>
      <p className="text-sm text-text-700">
        Supprimer votre compte <strong>BADAM</strong> supprimera toutes vos
        données définitivement.
        <br />
        Cette action est irréversible. Veuillez confirmer avant de continuer.
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-error-100 text-error-700 px-4 py-2 w-max rounded text-sm bg-error-200 hover:bg-error-300 transition"
      >
        Supprimer le compte
      </button>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Supprimer le compte"
        message="Tu es sûr de vouloir supprimer ton compte ? Cette action est irréversible."
        confirmText="Supprimer"
      />
    </div>
  );
}
