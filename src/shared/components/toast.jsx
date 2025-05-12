import { toast } from "sonner";
import { Check, X, CircleAlert, TriangleAlert } from "lucide-react";

const toastBaseStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "32px",
  letterSpacing: "0",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
};

// SUCCESS
export function toastSuccess(message) {
  toast(message, {
    style: {
      ...toastBaseStyle,
      backgroundColor: "#C8DEB8",
      color: "#3F5B30",
    },
    icon: <Check size={22} className="text-success-700" />,
  });
}

// ERROR
export function toastError(message) {
  toast(message, {
    style: {
      ...toastBaseStyle,
      backgroundColor: "#FAD2CE",
      color: "#C0392B",
    },
    icon: <X size={22} className="text-error-700" />,
  });
}

// INFO
export function toastInfo(message) {
  toast(message, {
    style: {
      ...toastBaseStyle,
      backgroundColor: "#CFDCE8",
      color: "#474F5D",
    },
    icon: <CircleAlert size={22} className="text-text-700" />,
  });
}

// WARNING
export function toastWarning(message) {
  toast(message, {
    style: {
      ...toastBaseStyle,
      backgroundColor: "#FDD8AB",
      color: "#C1440E",
    },
    icon: <TriangleAlert size={22} className="text-orange-500" />,
  });
}
