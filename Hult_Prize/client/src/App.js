import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

function App() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Fetch markers from your server
    axios.get('/api/markers').then((response) => {
      setMarkers(response.data);
    });
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyByOgygXU2X3visJfwe_6oeo3opuqkWdys">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={8}
      >
        {markers.map((marker) => (
          <Marker key={marker._id} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default App;

