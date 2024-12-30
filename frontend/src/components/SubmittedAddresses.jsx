import React from 'react';
import { useAddress } from '../context/AddressContext';

const SubmittedAddresses = () => {
  const { localaddress } = useAddress();

  return (
    <>
    <div className="mb-6 p-3 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Saved Address</h2>
      <p className="text-gray-600">{localaddress || 'No saved address available'}</p>
      </div>

    <button
      onClick={() => {
          localStorage.removeItem('address');
          localStorage.removeItem('addressType');
          window.location.reload();
        }}
        className="text-sm font-semibold text-red-500"
        >
        Clear saved address
        </button
        >
          </>

        
  );
};

export default SubmittedAddresses;
