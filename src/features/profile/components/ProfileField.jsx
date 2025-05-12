// src/features/profile/components/ProfileField.jsx
import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

export default function ProfileField({ label, value, icon, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      <h4>{label}</h4>
      <p className="font-medium">Choisissez un nom visible par les autres</p>

      <div className="flex items-center border border-text-200 rounded px-3 py-2 bg-background-50">
        {icon && <span className="text-text-400 mr-2">{icon}</span>}

        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        ) : (
          <p className="flex-1 text-sm text-text-800">{value}</p>
        )}

        <div className="flex gap-2 ml-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="text-cta-500 hover:text-cta-700">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={handleCancel} className="text-error-500 hover:text-error-700">
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-text-400 hover:text-cta-500">
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
