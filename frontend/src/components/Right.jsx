import React, { useState, useEffect } from 'react';
import { useAddress } from '../context/AddressContext';
import Form from './Form'; // Import Form component
import SubmittedAddresses from './SubmittedAddresses'; // Import SubmittedAddresses component

const Right = () => {
  const [currentView, setCurrentView] = useState('form'); // Default view is 'form'
  
  // Switch view between 'form' and 'submittedAddresses'
  const toggleView = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header with the toggle buttons */}
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => toggleView('form')}
          className={`text-sm font-medium ${currentView === 'form' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          Form
        </button>
        <button
          onClick={() => toggleView('submittedAddresses')}
          className={`text-sm font-medium ${currentView === 'submittedAddresses' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          Submitted Addresses
        </button>
      </div>

      {/* Render Form or Submitted Addresses based on currentView */}
      {currentView === 'form' ? (
        <Form />
      ) : (
        <SubmittedAddresses />
      )}
    </div>
  );
};

export default Right;
