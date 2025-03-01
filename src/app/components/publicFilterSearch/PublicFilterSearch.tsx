import React, { useState } from 'react';
import styles from './PublicFilterSearch.module.css'
import SearchBox, { SearchResult } from '../SearchForm/SearchForm';
export default function PublicFilterSearch() {
    const [loaction, setLocation] = useState<SearchResult>()
    const onSearchResults =(result: SearchResult)=>{
         setLocation(result);
    }

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchForm}>
            <SearchBox onSelect={onSearchResults}/>
            </div>
            <div className={styles.filterContainer}>
                
                <div className={styles.filterItem}>
                    <label>Property Type</label>
                    <select>
                        <option>Select Property Type</option>
                        <option value={'Any'}>Any</option>
                        <option value={'House'}>House</option>
                        <option value={'Apartment'}>Apartment</option>
                        <option value={'Townhouse'}>Townhouse</option>
                        <option value={'Vacant Land'}>Vacant Land</option>
                        <option value={'Farm'}>Farm</option>
                        <option value={'Commercial'}>Commercial</option>
                        <option value={'Industrial'}>Industrial</option>
                    </select>
                </div>
                <div className={styles.filterItem}>
                    <label>Minimum Price Range</label>
                    <select>
                        <option>Select Min Price Range</option>
                        <option value={'Any'}>Any</option>
                        <option value={'100000'}>R 100 000</option>
                        <option value={'500000'}>R 500 000</option>
                        <option value={'1000000'}>R 1 000 000</option>
                        <option value={'3000000'}>R 3 000 000</option>
                        <option value={'5000000'}>R 5 000 000</option>
                        <option value={'7000000'}>R 7 000 000</option>
                        <option value={'9000000'}>R 9 000 000</option>
                        <option value={'11000000'}>R 11 000 000</option>
                        <option value={'13000000'}>R 13 000 000</option>
                    </select>
                </div>
                <div className={styles.filterItem}>
                    <label>Maxmum Price Range</label>
                    <select>
                        <option>Select Max Price Range</option>
                        <option value={'Any'}>Any</option>
                        <option value={'500000'}>R 500 000</option>
                        <option value={'1000000'}>R 1 000 000</option>
                        <option value={'3000000'}>R 3 000 000</option>
                        <option value={'5000000'}>R 5 000 000</option>
                        <option value={'7000000'}>R 7 000 000</option>
                        <option value={'9000000'}>R 9 000 000</option>
                        <option value={'11000000'}>R 11 000 000</option>
                        <option value={'13000000'}>R 13 000 000</option>
                        <option value={'15000000'}>R 15 000 000</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
