import React, { useContext, createContext, useState } from 'react';

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    const updateAddress = (newAddress) => {
        setAddress(newAddress);
    };

    const updateCoordinates = (lat, lng) => {
        setCoordinates({ lat, lng });
    };

    return (
        <AddressContext.Provider
            value={{
                address,
                coordinates,
                updateAddress,
                updateCoordinates,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    return useContext(AddressContext);
};

export default AddressProvider;
