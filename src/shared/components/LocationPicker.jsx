import { useEffect, useRef, useState } from "react";

export default function LocationPicker() {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");

  // Obtenir la position utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);
        initMap(userLocation);
      });
    } else {
      // Fallback si la géolocalisation échoue (ex: Montréal)
      const defaultLocation = { lat: 45.5017, lng: -73.5673 };
      setLocation(defaultLocation);
      initMap(defaultLocation);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialiser la carte
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

    // Clic sur la map pour déplacer le marker
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

  // Charger l'autocomplete sur l'input
  useEffect(() => {
    if (searchInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        const selectedLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setLocation(selectedLocation);
        if (map) {
          map.panTo(selectedLocation);
          marker.setPosition(selectedLocation);
        }
        setAddress(place.formatted_address);
      });
    }
  }, [map, marker]);

  // Fonction pour trouver l'adresse depuis lat/lng
  const fetchAddress = (loc) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: loc }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

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

      {/* Ici tu peux ajouter un bouton pour envoyer vers ton backend */}
    </div>
  );
}
