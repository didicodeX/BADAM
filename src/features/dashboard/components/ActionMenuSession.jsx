import { Pencil, Trash2 } from "lucide-react";
import ActionItem from "@/shared/components/ActionItem";
export default function ActionMenuSession() {
  return (
    <div>
      <div className="flex flex-col gap-y-6 rounded-[5px] px-5 py-5 w-[304px] h-fit text-text-900 ">
        {" "}
        <ActionItem
          icon={<Pencil className="w-4 h-4 text-text-500" />}
          text="Modifier la session"
        />
        <ActionItem
          icon={<Trash2 className="w-4 h-4 text-error-500" />}
          text="Supprimer la session"
        />
      </div>
    </div>
  );
}
