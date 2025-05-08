import { useState } from "react";
import { Camera } from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import Button from "@/shared/components/Button";
import { getInitials } from "@/shared/utils/getInitials";
import { uploadToCloudinary } from "@/shared/utils/uploadToCloudinary";

export default function ProfilePictureSection({ user }) {
  const [avatar, setAvatar] = useState(user.avatar);
  const { updateProfile } = useProfile();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const url = await uploadToCloudinary(file, "projects/BADAM/avatars");
    if (url) {
      setAvatar(url);
      updateProfile({ avatar: url });
    }
  };
  
  return (
    <div className="flex flex-col py-6 border-b border-b-background-100">
      <h4>Photo de profil</h4>

      <div className=" flex flex-col  gap-6 mt-2">
        <label
          htmlFor="avatar"
          className="relative group w-20 h-20 cursor-pointer"
        >
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover transition-all border border-cta-200 hover:border-cta-500"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-cta-100 text-cta-700 flex items-center justify-center transition-all border border-cta-200 hover:border-cta-500  text-xl font-medium">
              {getInitials(user.name)}
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
        </label>
        {avatar && (
          <Button
            type="button"
            onClick={() => {
              setAvatar(null);
              updateProfile({ avatar: null });
            }}
          >
            Supprimer la photo
          </Button>
        )}

        <input
          type="file"
          accept="image/*"
          id="avatar"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}
