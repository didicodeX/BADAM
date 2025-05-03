import ActionMenu from "@/shared/components/ActionMenu";
import Footer from "@/shared/components/Footer";
import Formateur from "@/shared/components/Formateur";
import LocationPicker from "@/shared/components/LocationPicker";
import SessionCard from "@/shared/components/SessionCard";
import Statistique from "@/shared/components/Statistique";
import Status from "@/shared/components/Status";

export default function TestPage() {
  return (
    <div className="flex flex-col gap-5 px-24">
      <h1>Test</h1>
      <Status/>
<Statistique/>
<div className="flex flex-wrap gap-4 justify-center">
  <SessionCard />
  <SessionCard />
  <SessionCard />
</div>

      <LocationPicker />
      <ActionMenu/>
    </div>
  );
}
