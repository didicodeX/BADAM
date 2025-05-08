import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image, Video, Clapperboard, ImagePlus } from "lucide-react";

export default function MediaUploader({ onFilesAdded, accept = "both" }) {
  const onDrop = useCallback((acceptedFiles) => {
    onFilesAdded(acceptedFiles);
  }, [onFilesAdded]);

  // Types MIME dynamiques selon `accept`
  const acceptTypes =
    accept === "image"
      ? { "image/*": [] }
      : accept === "video"
      ? { "video/*": [] }
      : { "image/*": [], "video/*": [] };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptTypes,
    onDrop,
    multiple: true,
  });

  // Icônes conditionnelles
  const renderIcons = () => {
    if (accept === "image") return <ImagePlus className="w-6 h-6" />;
    if (accept === "video") return <Clapperboard className="w-6 h-6" />;
    return (
      <>
        <ImagePlus className="w-6 h-6" />
        <Clapperboard className="w-6 h-6" />
      </>
    );
  };

  return (
    <div
      {...getRootProps()}
      className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-cta-500 py-12"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Dépose ici tes fichiers...</p>
      ) : (
        <div className="flex flex-col items-center gap-2 text-text-600">
          {renderIcons()}
          <p className="text-sm">
            Glisse ici des fichiers {accept === "both" ? "images ou vidéos" : accept + "s"}, ou clique pour sélectionner
          </p>
        </div>
      )}
    </div>
  );
}
