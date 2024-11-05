import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const HomePage = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations"); // Default to 'All'
  const [locations, setLocations] = useState([]); // State for locations

  useEffect(() => {
    // Fetch all vendors on component mount
    axios
      .get("https://bookmycater.freewebhostmost.com/getVendors.php")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : []; // Ensure it's an array
        setVendors(data);

        // Extract unique locations from the vendors data
        const uniqueLocations = Array.from(
          new Set(data.map((vendor) => vendor.operating_regions))
        );
        setLocations(["All Locations", ...uniqueLocations]); // Add 'All' option
      })
      .catch((error) => console.error(error));
  }, []);

  // Filter vendors based on search term and selected location
  const filteredVendors = Array.isArray(vendors)
    ? vendors.filter((vendor) => {
        const matchesName = vendor.company_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesLocation =
          selectedLocation === "All Locations" ||
          vendor.operating_regions
            .split(",")
            .map((loc) => loc.trim())
            .includes(selectedLocation);
        return matchesName && matchesLocation;
      })
    : [];

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to Our Catering Service
      </h1>

      {/* Search and Location Container */}
      {/* Search and Location Container */}
      <div className="flex justify-start mb-4" style={{ alignItems: "center" }}>
        {/* Search Input */}
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="Search by vendor ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px 8px 8px 32px", // padding-left for icon space
              width: "50%", // Full width to utilize the space
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#888",
              fontSize: "16px",
            }}
          >
            🔍
          </span>
          <select
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            style={{
              marginLeft: "8px",
              border: "1px solid #d1d5db", // Light gray border
              borderRadius: "8px",
              padding: "8px 16px", // Extra padding for a spacious look
              backgroundColor: "#f9fafb", // Light background for contrast
              color: "#333", // Dark text for readability
              fontWeight: "500", // Slightly bolder text
              appearance: "none", // Hides default dropdown arrow
              backgroundImage:
                "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE2IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYgMi41TDkgNUw2IDcuNSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==)",
              backgroundPosition: "right 12px center", // Positions custom arrow
              backgroundRepeat: "no-repeat",
              cursor: "pointer",
              transition: "all 0.3s ease", // Smooth hover effect
              width: "30%", // Width as a string
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")} // Indigo border on focus
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} // Gray border on blur
          >
            {[
              ...new Set(
                locations
                  .flatMap((location) => location.split(","))
                  .map((loc) => loc.trim())
              ),
            ].map((uniqueLocation) => (
              <option key={uniqueLocation} value={uniqueLocation}>
                {uniqueLocation}
              </option>
            ))}
          </select>
        </div>

        {/* Location Dropdown */}
      </div>

      {/* Vendor Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <Link
              to={`/vendor/${vendor.id}`}
              key={vendor.id}
              className="shadow-md p-4 bg-white rounded-md flex flex-col overflow-hidden transition-transform duration-200 transform hover:shadow-lg"
            >
              <div className="h-48">
                <img
                  src={`https://bookmycater.freewebhostmost.com/${vendor.event_photos}`}
                  alt={vendor.company_name}
                  className="w-full h-full object-cover rounded-t-md"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-lg font-semibold">{vendor.company_name}</h2>
                <button className="flex items-center bg-green-800 text-white px-2 py-1 rounded-md text-sm">
                  <span className="mr-1" style={{ fontSize: 18 }}>
                    <FaStar />
                  </span>

                  {vendor.average_rating}
                </button>
              </div>
              <div className="pt-3 bg-white flex-grow">
{/*                 <p
                  className="text-gray-700 flex items-center"
                  style={{ fontSize: "1rem", fontWeight: "500" }}
                >
                  <FaLocationDot className="mr-1" /> {vendor.business_address}
                </p> */}

                <h2 className="text-lg text-black font-semibold">
                  Starting from: ₹{vendor.pricing_per_event}
                </h2>
                <div
                  className="text-white-600 flex items-center"
                  >
                <p 
                  style={{ backgroundColor:"grey", margin:"10px" , color:"white", padding:"5px 10px", borderRadius: "15px", fontSize:"12px" }}>
                  Min:{vendor.min_people}</p>
                <p style={{ backgroundColor:"grey", color:"white" ,padding:"5px 10px" , borderRadius: "15px", fontSize:"12px"}} >
                  Max:{vendor.max_people}</p>
                  </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">
            No vendors found for the selected criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
