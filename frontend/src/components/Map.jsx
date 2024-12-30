import React, { useState, useCallback, useEffect } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { ClipLoader } from 'react-spinners';
import { useAddress } from '../context/AddressContext';

// Libraries needed for the Google Maps API
const libraries = ['marker'];

const Map = () => {
    const [map, setMap] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [geocoder, setGeocoder] = useState(null);
    const [isLocationModalVisible, setLocationModalVisible] = useState(true); 
    const [locationPermission, setLocationPermission] = useState(false);
    const { updateAddress, updateCoordinates } = useAddress();
    const { address, coordinates } = useAddress();
    
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    useEffect(() => {
        const handleFormSubmit = async (event) => {
            if (!geocoder || !map || !infoWindow) return;

            const submittedAddress = event.detail.address;

            geocoder.geocode({ address: submittedAddress }, async (results, status) => {
                if (status === 'OK' && results[0]) {
                    const position = results[0].geometry.location;
                    const pos = {
                        lat: position.lat(),
                        lng: position.lng(),
                    };

                    map.setCenter(pos);
                    map.setZoom(15);

                    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
                    new AdvancedMarkerElement({
                        map,
                        position: pos,
                        title: submittedAddress,
                        draggable: true
                    });

                    infoWindow.setPosition(pos);
                    infoWindow.setContent(`Address: ${submittedAddress}`);
                    infoWindow.open(map);

                    updateCoordinates(pos.lat, pos.lng);
                } else {
                    infoWindow.setPosition(map.getCenter());
                    infoWindow.setContent('Unable to find location for this address');
                    infoWindow.open(map);
                }
            });
        };

        window.addEventListener('formAddressSubmitted', handleFormSubmit);
        return () => window.removeEventListener('formAddressSubmitted', handleFormSubmit);
    }, [geocoder, map, infoWindow, updateCoordinates]);

    const handleLocationClick = useCallback(() => {
        // console.log("inside handleLocationClick")
        setLocationPermission(true);
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
                        title: "Your Location",
                    });

                    map.setCenter(pos);
                    map.setZoom(15);

                    geocoder.geocode({ location: pos }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            const address = results[0].formatted_address;
                            infoWindow.setPosition(pos);
                            infoWindow.setContent(`Address: ${address}`);
                            infoWindow.open(map);

                            updateAddress(address);
                            updateCoordinates(pos.lat, pos.lng);
                        } else {
                            infoWindow.setPosition(pos);
                            infoWindow.setContent('Unable to retrieve address');
                            infoWindow.open(map);
                        }
                    });
                },
                (error) => {
                    infoWindow.setPosition(map.getCenter());
                    infoWindow.setContent("Error: The Geolocation service failed. " + error.message);
                    infoWindow.open(map);
                    setLocationModalVisible(true); // Show modal if geolocation fails
                }
            );
        } else {
            infoWindow.setPosition(map.getCenter());
            infoWindow.setContent("Error: Your browser doesn't support geolocation.");
            infoWindow.open(map);
            setLocationModalVisible(true); // Show modal if geolocation is not supported
        }
    }, [map, infoWindow, geocoder, updateAddress, updateCoordinates]);

    // On map load event
    const onMapLoad = useCallback(async (mapInstance) => {
        setMap(mapInstance);
        setInfoWindow(new google.maps.InfoWindow());
        setGeocoder(new google.maps.Geocoder());

        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        new AdvancedMarkerElement({
            map: mapInstance,
            position: { lat: 19.0760, lng: 72.8777 },
            title: "Mumbai",
        });
    }, []);


    const enableLocation = () => {
        // console.log("object")
        setLocationModalVisible(false);
        handleLocationClick(); 
    };
    
    const searchManually = () => {
        setLocationModalVisible(false);
        alert("Redirecting to manual address search.");
    };

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
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/128/484/484149.png"
                    alt="Locate me"
                    style={{ width: '24px', height: '24px', marginRight: '8px' }}
                />
                Locate me
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
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                }}
            />

            {/* Modal for location permission error */}
            {isLocationModalVisible && (
                <div className="modal" style={{
                    position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: 1000
                }}>
                    <h3 style={{ marginBottom: '10px' }}>Location Permission </h3>
                    <p style={{ marginBottom: '20px' }}>Your browser is not able to access your location. You can either enable it or search for an address manually.</p>
                    <button onClick={enableLocation} style={{
                        padding: '10px 15px', marginRight: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
                    }}>
                        Enable Location
                    </button>
                    <button onClick={searchManually} style={{
                        padding: '10px 15px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
                    }}>
                        Search Manually
                    </button>
                </div>
            )}
        </div>
    );
};

export default Map;
