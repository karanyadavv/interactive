import React from 'react';
import { useParams } from 'react-router-dom';

const StorePage = ({ storeData }) => {
  const { id } = useParams();
  
  const findStore = () => {
    for (const state in storeData.cityStateMap) {
      for (const city in storeData.cityStateMap[state]) {
        const store = storeData.cityStateMap[state][city].find(
          store => store.dealerId === id
        );
        if (store) return store;
      }
    }
    return null;
  };

  const store = findStore();

  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Store not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
      </div>
    </div>
  );
};

export default StorePage;