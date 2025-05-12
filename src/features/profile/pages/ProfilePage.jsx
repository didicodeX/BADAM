import { useAuthStore } from "@/features/auth/store/auth.store";
import ProfileNameField from "../components/ProfileNameField";
import ProfileEmailField from "../components/ProfileEmailField";
import ProfilePasswordField from "../components/ProfilePasswordField";
import ProfilePhoneField from "../components/ProfilePhoneField";
import ProfileBioField from "../components/ProfileBioField";
import ProfilePictureSection from "../components/ProfilePictureSection";
import DeleteAccountSection from "../components/DeleteAccountSection";

export default function ProfilePage() {
  const { user } = useAuthStore();
  return (
    <div className="padd-x padd-y flex flex-col gap-6 md:gap-10">
      <h2>Mon profil</h2>
      <div className="border-t border-t-background-100">
        <ProfilePictureSection user={user} />
        <ProfileNameField user={user} />
        <ProfileEmailField user={user} />
        <ProfilePasswordField user={user} />
        <ProfilePhoneField user={user} />
        <ProfileBioField user={user} />
        <DeleteAccountSection />
      </div>
    </div>
  );
}
