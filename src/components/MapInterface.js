import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import axios from "axios";
import PinPopup from "./PinPopup";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MapInterface({ pins, onAddPin, selectedPin }) {
  const mapRef = useRef();
  const [newPin, setNewPin] = useState(null);

  useEffect(() => {
    if (selectedPin && mapRef.current) {
      const map = mapRef.current;
      map.setView([selectedPin.lat, selectedPin.lng], 15);
    }
  }, [selectedPin]);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      return response.data.display_name;
    } catch (error) {
      console.error("Address fetch error:", error);
      return "Address not found";
    }
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    const address = await fetchAddress(lat, lng);
    setNewPin({ lat, lng, address });
  };

  const savePin = (remark) => {
    onAddPin({ ...newPin, remark });
    setNewPin(null);
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      className="map-container"
      ref={mapRef}
      style={{ flex: 1 }} // Makes map take remaining space
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {pins.map((pin, index) => (
        <Marker key={index} position={[pin.lat, pin.lng]} icon={icon}>
          <Popup>
            <strong>{pin.remark}</strong>
            <p>{pin.address}</p>
          </Popup>
        </Marker>
      ))}

      {newPin && (
        <Marker position={[newPin.lat, newPin.lng]} icon={icon}>
          <Popup>
            <PinPopup onSave={savePin} onCancel={() => setNewPin(null)} />
          </Popup>
        </Marker>
      )}

      <MapClickHandler onMapClick={handleMapClick} />
    </MapContainer>
  );
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: onMapClick,
  });
  return null;
}

export default MapInterface;
