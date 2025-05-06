import { X } from "lucide-react";

export default function SingleImagePreview({ file, onRemove }) {
  if (!file) return null;

  const isString = typeof file === "string";
  const isFile = file instanceof File;

  let url = null;
  if (isString) {
    url = file;
  } else if (isFile) {
    try {
      url = URL.createObjectURL(file);
    } catch (err) {
      console.error("Invalid file for preview:", err);
      return null;
    }
  } else if (file.preview) {
    url = file.preview;
  }

  return (
    <div className="relative w-full sm:w-60 h-40 rounded overflow-hidden border">
      <img
        src={url}
        alt="preview"
        className="object-cover w-full h-full rounded"
      />
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
