//  import { useEffect, useState } from "react";

// export function useLoadGoogleMaps() {
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState(null);

//   // Injecter la balise <script> simplement une fois
//   useEffect(() => {
//     if (window.google?.maps) {
//       setLoaded(true);
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&libraries=places`;
//     script.async = true;
//     script.onload = () => setLoaded(true);
//     script.onerror = () => setError("Erreur de chargement de Google Maps");
//     document.head.appendChild(script);
//   }, []);

  
//   return { loaded, error };
// }
