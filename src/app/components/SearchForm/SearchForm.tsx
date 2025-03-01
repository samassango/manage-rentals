import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";

import styles from './SearchForm.module.css'
import { FaSearch } from "react-icons/fa";

export interface SearchResult {
  lat: number;
  lon: number;
  display_name: string;
}

const SearchBox = ({ onSelect }: { onSelect: (result: SearchResult) => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false)
useEffect(()=>{
  setIsOpen(true)
},[results])
  const handleSearch = async () => {
    if (!query) return;

    try {
      const data = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      setResults(await data.json());
    } catch (error) {
      console.error("Error fetching location data", error);
    }
  };

  return (
    <div className={styles.SearchFormContainer}>
      <div className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
         <FaSearch /> Search 
        </button>
      </div>
      {results.length && isOpen ?
      <ul className={styles.dropdownList}>
        {results.map((result, index) => (
          <li key={index} className={styles.dropdownItem} onClick={() =>{
            setIsOpen(false);
            setQuery(result.display_name)
            onSelect(result)
          } }>
            {result.display_name}
          </li>
        ))}
      </ul>
      :null
      }
    </div>
  );
};


export default SearchBox;
