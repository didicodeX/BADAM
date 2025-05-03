import { useState,useEffect } from "react";
import { getWishlist } from "../../api/favorites.api";
import DropzoneUploader from "../../components/DropzoneUploader";
export default function DashboardHomePage() {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (file) => {
    // 1. Réinitialiser l’image sélectionnée dans la grille (si besoin)
    setSelectedImage(null);

    // 2. Uploader vers Cloudinary ou autre service ici...
    // simulate async upload:
    const reader = new FileReader();
    reader.onloadend = () => {
      const uploadedImageUrl = reader.result;
      setSelectedImage(uploadedImageUrl); // pour preview si tu veux
    };
    reader.readAsDataURL(file);
  };


  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getWishlist();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWishlist();
  });
  return (
    <>
      <h1>DashboardHome</h1>
      <DropzoneUploader onUpload={handleImageUpload} />
      {/* Preview */}
      {selectedImage && (
        <div className="mt-4">
          <p className="text-sm text-text-500">Image uploadée :</p>
          <img src={selectedImage} alt="uploaded" className="w-48 h-32 object-cover rounded" />
        </div>
      )}
      </>
  );
}
