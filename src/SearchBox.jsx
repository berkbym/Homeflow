import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { PropertyContext } from './App';

function SearchBox() {

  const {setFilter} = useContext(PropertyContext)

  const [search, setSearch] = useState('')

  useEffect(() => {
    setFilter(search)
  }, [search,setFilter])

  return (
    <div className="mt-5 relative">
      <input placeholder="Enter a search term" className="px-5 py-3 border-gray-400 border rounded w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
      <FaSearch className="absolute top-3.5 right-3.5 text-gray-400" size={20} />
    </div>
  );
};

export default SearchBox;
