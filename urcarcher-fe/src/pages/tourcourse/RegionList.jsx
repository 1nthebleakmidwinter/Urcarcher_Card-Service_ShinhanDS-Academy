import React from 'react';
import '../../assets/RegionList.css';

function RegionList({ regions, handleRegionClick, selectedRegion}) {
    return (
        <ul className="region-list">
            {regions.map((region, index) => (
                <li key={region} 
                    onClick={() => handleRegionClick(region)} 
                    className={`region-item ${selectedRegion === region || (index === 0 && !selectedRegion) ? 'active' : ''}`}
                >
                    {region}
                </li>
            ))}
        </ul>
    );
}

export default RegionList;
