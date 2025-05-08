import { CLOUD_NAME, UPLOAD_PRESET } from "@/shared/config/env";
import axios from "axios";

/**
 * Upload un fichier vers Cloudinary
 * @param {File} file - Fichier à uploader
 * @param {Object} options - Options supplémentaires
 * @param {string} [options.folder] - Dossier cible dans Cloudinary
 * @param {'image'|'video'|'raw'} [options.resourceType='auto'] - Type de ressource
 * @returns {Promise<string>} URL sécurisée du fichier uploadé
 */
export async function uploadToCloudinary(
  file,
  { folder = "", resourceType = "auto", setProgress } = {}
) {
  if (!file) throw new Error("Aucun fichier fourni");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  if (folder) formData.append("folder", folder);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;
  try {
    const res = await axios.post(url, formData, {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (typeof setProgress === "function") {
          setProgress(percent);
        }
      },
    });

    return res.data.secure_url;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}
