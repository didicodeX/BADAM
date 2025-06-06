import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import "@/shared/styles/style.css"
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
