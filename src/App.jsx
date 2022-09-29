import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import PropertyCard from './PropertyCard';

export const PropertyContext = React.createContext();

function App() {
  const [properties, setProperties] = useState([]);

  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState([]);

  // use this state to filter properties object by description
  const [filter, setFilter] = useState('');

  // use this state to set rule to display all properties or saved properties
  const [display, setDisplay] = useState('all')

  const filteredProperties = properties.filter(property => {
    return property.short_description.includes(filter)
  });

  /**
   * @description Adds a new property to the savedProperties list.
   * @param {*} property 
   */
  function addSaved(property) {
    const newSaved = [...savedProperties, property]
    setSavedProperties(newSaved)
  }

  /**
   * @desciption Removes the property from savedProperties list.
   * @param {*} property 
   */
  function removeSaved(property) {
    const newSaved = savedProperties.filter(element => element !== property)
    setSavedProperties(newSaved)
  }

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
        <div className='flex justify-around'>
          <button>All Properties</button>
          <button>Saved Properties</button>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!!filteredProperties && filteredProperties.map((property) => 
            <PropertyCard 
              key = {property.property_id} 
              property = {property} 
              savedProperties = {savedProperties}
              addSaved = {addSaved}
              removeSaved = {removeSaved}
            />)}
        </div>
      </div>
    </PropertyContext.Provider>
  );
}

export default App;
