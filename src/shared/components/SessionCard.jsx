import { MoreHorizontal } from "lucide-react";
import Status from "./Status";

export default function SessionCard() {
  return (
    <div className="flex-grow flex-shrink min-w-[300px] basis-[300px] max-w-[400px] w-full flex flex-col">
      <img
        src="https://danse.ch/wp-content/uploads/2017/10/CN7A8360-e1509386620544.jpg" // Remplace avec l’URL de ton image
        alt="Dance with bibi"
        className="h-[147px] object-cover rounded-lg"
      />

      <div className="flex justify-between">
        <h4>Dance with bibi</h4>
        <MoreHorizontal className="w-5 h-5 text-text-900 cursor-pointer" />
      </div>
      <small>521, Barbie street, apt 3</small>
      <sub>
        April 19 to April 22, 8:00 PM to 9:00 PM ADT
      </sub>
      <div className="py-2"><Status/></div>
    </div>
  );
}