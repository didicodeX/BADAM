import { useState } from "react";
import DropzoneUploader from "./DropzoneUploader"; // Ton composant uploader
import clsx from "clsx";

export default function ImageSelectorWithUpload({ initialImages = [], onImageSelect }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setUploadedImage(null); // reset upload si on sélectionne une image
    onImageSelect?.(img);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setSelectedImage(null); // désélectionner la grille
      onImageSelect?.(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setUploadedImage(null);
    onImageSelect?.(null);
  };

  return (
    <div className="space-y-4">
      {/* 🖼 Grille d’images */}
      {initialImages?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {initialImages.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => handleImageClick(img)}
              className={clsx(
                "cursor-pointer h-32 object-cover rounded border-2 transition-all",
                selectedImage === img
                  ? "border-cta-500 ring-2 ring-cta-300"
                  : "border-transparent"
              )}
              alt={`Choix ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* 🗂 Zone d’upload */}
      {!selectedImage && !uploadedImage && (
        <DropzoneUploader onUpload={handleImageUpload} />
      )}

      {/* ✅ Image sélectionnée ou uploadée */}
      {(selectedImage || uploadedImage) && (
        <div className="relative">
          <img
            src={selectedImage || uploadedImage}
            alt="Image sélectionnée"
            className="h-48 w-full object-cover rounded"
          />
          <button
            onClick={handleReset}
            className="absolute top-2 right-2 bg-white px-2 py-1 text-sm rounded shadow hover:bg-gray-100"
          >
            Changer
          </button>
        </div>
      )}
    </div>
  );
}