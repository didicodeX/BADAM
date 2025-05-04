import { X } from "lucide-react";

export default function MediaPreviewList({ files = [], onRemove }) {
  if (files.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {files.map((file, index) => {
        const url = typeof file === "string" ? file : URL.createObjectURL(file);
        const isVideo = typeof file === "string"
          ? file.endsWith(".mp4")
          : file.type.startsWith("video/");

        return (
          <div key={index} className="relative group rounded overflow-hidden">
            {isVideo ? (
              <video
                src={url}
                controls
                className="w-full h-32 object-cover"
              />
            ) : (
              <img
                src={url}
                alt={`media-${index}`}
                className="w-full h-32 object-cover"
              />
            )}
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded p-1 text-xs opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
