// src/components/LocationPickerMap.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issues with Leaflet in Webpack environments
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

// Helper function to calculate distance between two points (Haversine formula)
// Returns distance in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in km
};

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });
  return null;
};

const LocationPickerMap = ({ userLocation, onLocationSelect, onClose }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [distance, setDistance] = useState(null);
  const [address, setAddress] = useState("Fetching address...");
  const mapRef = useRef();

  // Effect to update map center if userLocation changes initially
  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [userLocation]);

  // Function to perform reverse geocoding
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
        return data.display_name;
      } else {
        const fallbackAddress = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} (Address not found)`;
        setAddress(fallbackAddress);
        return fallbackAddress;
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      const fallbackAddress = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} (Error fetching address)`;
      setAddress(fallbackAddress);
      return fallbackAddress;
    }
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setSelectedPosition([lat, lng]);

    if (userLocation) {
      const dist = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
      setDistance(dist);
    }

    const fetchedAddress = await getAddressFromCoordinates(lat, lng);
    onLocationSelect({ lat, lng, address: fetchedAddress });
  };

  // Determine message for distance validation (0-5km range)
  const getDistanceMessage = () => {
    if (distance === null) return null;
    const fixedDistance = distance.toFixed(2);
    if (distance >= 0 && distance <= 5) { // <--- CHANGED: Logic for 0-5km
      return <p className="text-green-400 font-semibold">Distance: {fixedDistance} km (Within 0-5km range)</p>;
    } else { // distance > 5
      return <p className="text-red-400 font-semibold">Distance: {fixedDistance} km (Too far, must be within 5km)</p>;
    }
  };

  // Check if selected location is valid (within 0-5km)
  const isLocationValid = distance !== null && distance >= 0 && distance <= 5; // <--- CHANGED: Logic for 0-5km

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl h-[90vh] flex flex-col overflow-hidden text-white border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold">Select Issue Location</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl" aria-label="Close map">
            &times;
          </button>
        </div>

        {userLocation ? (
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ flexGrow: 1 }}
            whenCreated={mapInstance => { mapRef.current = mapInstance; }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onMapClick={handleMapClick} />

            {/* User's current location marker */}
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>Your Current Location</Popup>
            </Marker>
            {/* Circle for 5km radius only */}
            <Circle center={[userLocation.lat, userLocation.lng]} radius={5000} pathOptions={{ color: 'red', fillOpacity: 0.05, dashArray: '5, 5' }} /> {/* <--- CHANGED: Only 5km circle */}

            {/* Selected issue location marker */}
            {selectedPosition && (
              <Marker position={selectedPosition}>
                <Popup>
                  Issue Location: <br />
                  {address}
                  {getDistanceMessage()}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        ) : (
          <div className="flex-grow flex items-center justify-center text-lg text-gray-400">
            Fetching your current location... Please enable location services.
          </div>
        )}

        <div className="p-4 border-t border-gray-700 text-center">
          {selectedPosition ? (
            <>
              <p className="text-lg text-gray-300 mb-2">Selected: <span className="font-semibold text-white">{address}</span></p>
              {getDistanceMessage()}
              <button
                onClick={onClose}
                disabled={!isLocationValid} // <--- CHANGED: Use isLocationValid
                className={`mt-4 px-6 py-2 rounded-md font-semibold transition duration-200 ease-in-out
                  ${isLocationValid ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`
                }
              >
                Confirm Location
              </button>
            </>
          ) : (
            <p className="text-gray-400">Click on the map to select the issue's location.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPickerMap;