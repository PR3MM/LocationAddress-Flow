import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { ClipLoader } from 'react-spinners';

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#3498db" loading={true} size={50} />
            </div>
        );
    }

    return (
        <div id="map-container" style={{ height: '500px', width: '100%' }}>
            <GoogleMap
                center={{ lat: 19.0760, lng: 72.8777 }}
                zoom={13}
                mapContainerStyle={{ height: '100%', width: '100%' }}
            >
                <Marker position={{ lat: 19.0760, lng: 72.8777 }} />
            </GoogleMap>
        </div>
    );
};

export default Map;
