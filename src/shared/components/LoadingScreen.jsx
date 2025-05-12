import { Loader } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Loader className="animate-spin w-6 h-6 text-text-500" />
    </div>
  );
}
