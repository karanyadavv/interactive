import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { storeLocations } from '../src/data/storeLocation.js';
import StoreCard from './StoreCard.jsx';


const StoreLocator = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Get unique states from store locations
    const stateList = [...new Set(storeLocations.map(item => item.state))];
    setStates(stateList);
    
   
    if (stateList.length > 0) {
      setSelectedState(stateList[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedState) {
      // Get cities for selected state
      const cityList = [...new Set(storeLocations
        .filter(item => item.state === selectedState)
        .map(item => item.city))];
      setCities(cityList);
      
      // Set initial city
      if (cityList.length > 0) {
        setSelectedCity(cityList[0]);
      }
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity) {
      // Get stores for selected city
      const storeList = storeLocations.filter(item => item.city === selectedCity);
      setStores(storeList);
    }
  }, [selectedCity]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedCity('');
    setStores([]);
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = stores.length > 0 ? {
    lat: parseFloat(stores[0].latitude),
    lng: parseFloat(stores[0].longitude)
  } : {
    lat: 20.5937,
    lng: 78.9629
  };

  return (
    <div className="">
      <div className="flex w-1/3 p-4 bg-gray-100">
        <select 
          value={selectedState} 
          onChange={handleStateChange} 
          className="w-full mb-4 p-2 border rounded bg-black text-white"
        >
          <option value="">Select a state</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select 
          value={selectedCity} 
          onChange={handleCityChange} 
          className="w-full mb-4 p-2 border rounded bg-black text-white"
          disabled={!selectedState}
        >
          <option value="">Select a city</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className="">
        <div className="">
          {stores.map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      
        <div className="">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={8}
            >
              {stores.map(store => (
                <Marker
                  key={store.id}
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