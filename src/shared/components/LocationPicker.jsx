import { useEffect, useRef, useState } from "react";

export default function LocationPicker() {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Injecter la balise <script> une seule fois
  useEffect(() => {
    const existingScript = document.querySelector("script[src*='maps.googleapis.com/maps/api/js']");

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

  // Initialiser la carte quand c'est chargé
  useEffect(() => {
    if (!loaded || !window.google || !mapRef.current) return;

    const initMap = (position) => {
      const mapElement = mapRef.current;
      if (!mapElement) return;

      const newMap = new window.google.maps.Map(mapElement, {
        center: position,
        zoom: 14,
      });

      const newMarker = new window.google.maps.Marker({
        position,
        map: newMap,
        draggable: true,
      });

      newMap.addListener("click", (e) => {
        const clickedLocation = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        newMarker.setPosition(clickedLocation);
        setLocation(clickedLocation);
        fetchAddress(clickedLocation);
      });

      setMap(newMap);
      setMarker(newMarker);
    };

    const defaultLocation = { lat: 45.5017, lng: -73.5673 };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          initMap(userLocation);
        },
        () => {
          setLocation(defaultLocation);
          initMap(defaultLocation);
        }
      );
    } else {
      setLocation(defaultLocation);
      initMap(defaultLocation);
    }
  }, [loaded]);

  // Charger l'autocomplete sur l'input
  useEffect(() => {
    if (!loaded || !map || !marker || !window.google || !searchInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      const selectedLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setLocation(selectedLocation);
      map.panTo(selectedLocation);
      marker.setPosition(selectedLocation);
      setAddress(place.formatted_address);
    });
  }, [loaded, map, marker]);

  const fetchAddress = (loc) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: loc }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

  if (!loaded) return <p>Chargement de la carte...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Rechercher une adresse..."
        className="w-full p-2 border rounded"
      />
      <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>

      <div className="p-2 border rounded mt-4">
        <p><strong>Adresse :</strong> {address || "-"}</p>
        <p><strong>Latitude :</strong> {location.lat}</p>
        <p><strong>Longitude :</strong> {location.lng}</p>
      </div>
    </div>
  );
}
