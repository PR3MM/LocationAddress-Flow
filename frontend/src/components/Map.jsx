import React, { useState, useCallback } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { ClipLoader } from 'react-spinners';

const libraries = ['marker'];

const Map = () => {
    const [map, setMap] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const handleLocationClick = useCallback(() => {
        if (!map || !infoWindow) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
                    new AdvancedMarkerElement({
                        map,
                        position: pos,
                        title: "Your Location"
                    });

                    map.setCenter(pos);
                    map.setZoom(15);

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Your order will be delivered here");
                    infoWindow.open(map);
                },
                (error) => {
                    infoWindow.setPosition(map.getCenter());
                    infoWindow.setContent(
                        "Error: The Geolocation service failed. " + error.message
                    );
                    infoWindow.open(map);
                }
            );
        } else {
            infoWindow.setPosition(map.getCenter());
            infoWindow.setContent("Error: Your browser doesn't support geolocation.");
            infoWindow.open(map);
        }
    }, [map, infoWindow]);

    const onMapLoad = useCallback(async (mapInstance) => {
        setMap(mapInstance);
        
        const infoWindowInstance = new google.maps.InfoWindow();
        setInfoWindow(infoWindowInstance);

        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        new AdvancedMarkerElement({
            map: mapInstance,
            position: { lat: 19.0760, lng: 72.8777 },
            title: "Mumbai"
        });
    }, []);

    const renderLocationButton = useCallback(() => {
        if (!map) return null;

        return (
            <button
                className="custom-map-control-button"
                onClick={handleLocationClick}
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    backgroundColor: '#fff',
                    border: '0',
                    borderRadius: '2px',
                    boxShadow: '0 1px 4px -1px rgba(0, 0, 0, 0.3)',
                    margin: '10px',
                    padding: '0 0.5em',
                    font: '400 18px Roboto, Arial, sans-serif',
                    overflow: 'hidden',
                    height: '40px',
                    cursor: 'pointer',
                }}
            >
                Pan to Current Location
            </button>
        );
    }, [map, handleLocationClick]);

    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#3498db" loading={true} size={50} />
            </div>
        );
    }

    return (
        <div id="map-container" style={{ height: '500px', width: '100%', position: 'relative' }}>
            {renderLocationButton()}
            <GoogleMap
                center={{ lat: 19.0760, lng: 72.8777 }}
                zoom={13}
                mapContainerStyle={{ height: '100%', width: '100%' }}
                onLoad={onMapLoad}
                options={{
                    mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    rotateControl: true,
                    fullscreenControl: true
                }}
            >
            </GoogleMap>
        </div>
    );
};

export default Map;