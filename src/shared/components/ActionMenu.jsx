import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ActionMenu() {
  return (
    <div className="flex flex-col gap-y-6 rounded-[5px] px-5 py-5 w-[304px] h-fit text-text-900 ">
      {/* Groupe 1 */}
      <div className="flex flex-col gap-2  rounded-lg shadow px-4 py-2 w-fit">
        <ActionItem icon={<Plus className="w-4 h-4 text-success-500" />} text="Créer une session" />
        <ActionItem icon={<Pencil className="w-4 h-4 text-text-500" />} text="Modifier la formation" />
        <ActionItem icon={<Trash2 className="w-4 h-4 text-error-500" />} text="Supprimer la formation" />
      </div>

      {/* Groupe 2 */}
      <div className="flex flex-col gap-2  rounded-lg shadow px-4 py-2 w-fit">
        <ActionItem icon={<Pencil className="w-4 h-4 text-text-500" />} text="Modifier la session" />
        <ActionItem icon={<Trash2 className="w-4 h-4 text-error-500" />} text="Supprimer la session" />
      </div>
    </div>
  );
}

function ActionItem({ icon, text}) {
  return (
    <div className="flex items-center gap-y-2 text-sm text-text-900 cursor-pointer hover:bg-background-50 px-4 py-2 rounded">
      {icon}
      <span>{text}</span>
    </div>
  );
}