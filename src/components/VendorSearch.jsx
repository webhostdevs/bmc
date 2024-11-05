import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VendorSearch = () => {
    const [vendors, setVendors] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await axios.get('`https://bookmycater.freewebhostmost.com/vendor_locations.php'); // Adjust this endpoint to get locations
            setLocations(response.data);
        };

        fetchLocations();
    }, []);

    const handleSearch = async () => {
        const response = await axios.get('`https://bookmycater.freewebhostmost.com/vendor_search.php', {
            params: {
                locations: selectedLocations.join(','), // Comma-separated for query
                vendorName: searchTerm
            }
        });
        setVendors(response.data);
    };

    const toggleLocation = (location) => {
        setSelectedLocations((prev) => 
            prev.includes(location) ? prev.filter(loc => loc !== location) : [...prev, location]
        );
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by vendor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 mb-4"
            />
            <div>
                {locations.map(location => (
                    <div key={location.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedLocations.includes(location.name)}
                                onChange={() => toggleLocation(location.name)}
                            />
                            {location.name}
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2 mt-4">
                Search
            </button>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map(vendor => (
                    <Link
                        to={`/vendor/${vendor.id}`}
                        key={vendor.id}
                        className="shadow-lg p-4 bg-white rounded-md flex flex-col overflow-hidden transition-transform duration-200 transform hover:scale-105"
                    >
                        <div className="h-48">
                            <img
                                src={vendor.event_photos}
                                alt={vendor.company_name}
                                className="w-full h-full object-cover rounded-t-md"
                            />
                        </div>
                        <div className="p-4 bg-gray-100 flex-grow">
                            <h2 className="text-lg font-semibold">{vendor.company_name}</h2>
                            <p className="mt-1">Per Plate: ${vendor.pricing_per_plate}</p>
                            <p>Per Event: ${vendor.pricing_per_event}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default VendorSearch;
