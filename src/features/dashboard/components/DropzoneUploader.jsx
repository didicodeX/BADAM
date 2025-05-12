import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

export default function DropzoneUploader({ onUpload }) {
  const { getRootProps, getInputProps,isDragActive  } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]); // ✅ Important
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md px-4 py-8 text-center cursor-pointer transition ${
        isDragActive ? "border-cta-500 bg-cta-50" : "border-text-200"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-6 h-6 mx-auto mb-2" />
      <p className="text-sm">Déposer une image<br />ou<br /><span className="text-cta-500 underline">Télécharger une image</span></p>
    </div>
  );
}
