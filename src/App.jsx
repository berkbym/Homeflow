import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import PropertyCard from './PropertyCard';

export const PropertyContext = React.createContext();

function App() {
  const [properties, setProperties] = useState([]);

  // use this state to filter properties object by description
  const [filter, setFilter] = useState('');

  const filteredProperties = properties.filter(property => {
    return property.short_description.includes(filter)
  });

  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const fetchPropertyData = async () => {
      const response = await fetch('/property-data.json');
      const json = await response.json();

      setProperties(json.result.properties.elements);
    };

    fetchPropertyData();
  }, []);

  return (
    <PropertyContext.Provider value={{setFilter}}>
      <div className="container mx-auto my-5">
        <Header />
        <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!!filteredProperties && filteredProperties.map((property) => 
            <PropertyCard 
              key={property.property_id} 
              property={property} 
            />)}
        </div>
      </div>
    </PropertyContext.Provider>
  );
}

export default App;
