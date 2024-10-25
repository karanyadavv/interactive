import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import StoreCard from './StoreCard.jsx';


const StoreLocator = ({ storeData }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    // Get states from cityStateMap
    const stateList = Object.keys(storeData.cityStateMap);
    setStates(stateList);
    
    if (stateList.length > 0) {
      if (stateList.includes('Delhi')) {
        setSelectedState('Delhi');
      } else {
        setSelectedState(stateList[0]);
      }
    }
  }, [storeData]);

  useEffect(() => {
    if (selectedState) {
      // Get cities for selected state
      const cityList = Object.keys(storeData.cityStateMap[selectedState] || {});
      setCities(cityList);
      
      if (cityList.length > 0) {
        if (selectedState === 'Delhi' && cityList.includes('New Delhi')) {
          setSelectedCity('New Delhi');
        } else {
          setSelectedCity(cityList[0]);
        }
      }
    }
  }, [selectedState, storeData]);

  useEffect(() => {
    if (selectedState && selectedCity) {
      // Get stores for selected city
      const storeList = storeData.cityStateMap[selectedState][selectedCity] || [];
      
      // Filter by type if selected
      const filteredStores = selectedType === 'all' 
        ? storeList 
        : storeList.filter(store => store.type === selectedType);
      
      setStores(filteredStores);
    }
  }, [selectedCity, selectedState, selectedType, storeData]);

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = stores.length > 0 ? {
    lat: parseFloat(stores[0].latitude),
    lng: parseFloat(stores[0].longitude)
  } : {
    lat: 20.5937,
    lng: 78.9629
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          <select 
            value={selectedState} 
            onChange={(e) => setSelectedState(e.target.value)} 
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-black"
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-black"
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-black"
          >
            <option value="all">All Locations</option>
            <option value="Sales">Sales Only</option>
            <option value="Service">Service Only</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {/* Store List */}
        <div className="md:col-span-1 space-y-4 h-[600px] overflow-y-auto">
          {stores.map((store) => (
            <StoreCard key={store.dealerId} store={store} />
          ))}
          {stores.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No stores found in this location
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <LoadScript googleMapsApiKey={import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
            >
              {stores.map((store) => (
                <Marker
                  key={store.dealerId}
                  position={{
                    lat: parseFloat(store.latitude),
                    lng: parseFloat(store.longitude)
                  }}
                  title={store.name}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};


export default StoreLocator;
