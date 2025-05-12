import { useEffect, useRef, useState } from "react";

export default function LocationPicker({ value, onChange }) {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Load Google Maps script
  useEffect(() => {
    const existingScript = document.querySelector("script[src*='maps.googleapis.com']");

    if (existingScript) {
      if (window.google?.maps) {
        setLoaded(true);
      } else {
        existingScript.addEventListener("load", () => setLoaded(true));
        existingScript.addEventListener("error", () => setError("Erreur de chargement de Google Maps"));
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => setError("Erreur de chargement de Google Maps");
    document.head.appendChild(script);
  }, []);

  // Init map
  useEffect(() => {
    if (!loaded || !window.google || !mapRef.current) return;

    const initMap = (position) => {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 14,
      });

      const newMarker = new window.google.maps.Marker({
        position,
        map: newMap,
        draggable: true,
      });

      // Map click or drag => update address only
      const updateLocation = (loc) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: loc }, (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            onChange?.(address); // Envoie juste l’adresse
          }
        });
      };

      newMap.addListener("click", (e) => {
        const clicked = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        newMarker.setPosition(clicked);
        updateLocation(clicked);
      });

      newMarker.addListener("dragend", (e) => {
        const dragged = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        updateLocation(dragged);
      });

      setMap(newMap);
      setMarker(newMarker);
    };

    const defaultLoc = { lat: 45.5017, lng: -73.5673 };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => initMap({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => initMap(defaultLoc)
      );
    } else {
      initMap(defaultLoc);
    }
  }, [loaded, onChange]);

  // Autocomplete => sélection d'une adresse
  useEffect(() => {
    if (!loaded || !map || !marker || !searchInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const selected = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      map.panTo(selected);
      marker.setPosition(selected);
      onChange?.(place.formatted_address); // Envoie juste l’adresse
    });
  }, [loaded, map, marker, onChange]);

  if (!loaded) return <p>Chargement de la carte...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative flex flex-col gap-6">
      <label className="text-sm font-medium text-text-700 absolute -top-3 left-2 bg-background-50 px-2">Lieu</label>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Rechercher une adresse..."
        className="w-full p-2 border rounded bg-transparent"
        defaultValue={value || ""}
      />
      <div ref={mapRef} style={{ height: "400px", width: "100%" }} />
    </div>
  );
}
