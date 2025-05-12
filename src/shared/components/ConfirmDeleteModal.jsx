import { Dialog } from "@headlessui/react";
import { X, Trash } from "lucide-react";
import Button from "./Button";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Supprimer l'élément",
  message = "Cette action est irréversible. Veux-tu continuer ?",
  confirmText = "Supprimer",
}) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 ">
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <div className="bg-background-50 w-full max-w-md rounded shadow-lg p-6 relative ">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trash className="text-cta-500 w-5 h-5" />
              <h4>{title}</h4>
            </div>
            <button
              onClick={onClose}
              className="text-text-500 hover:text-cta-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message */}
          <p className="text-sm mb-6">{message}</p>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline"
              onClick={() => {       
                onClose(); // Appeler correctement onClose
              }}
              className="px-4 py-2 text-sm rounded hover:bg-cta-100 text-orange-700"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirm(); // Appeler correctement onConfirm
              }}
              className="px-4 py-2 text-sm rounded bg-cta-700/90 text-white hover:bg-cta-700"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
