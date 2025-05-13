import { Loader } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-background-50">
      <Loader className="animate-spin w-6 h-6 text-text-500" />
    </div>
  );
}
