import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { IoCallOutline } from "react-icons/io5";
import { LiaStarSolid } from "react-icons/lia";
let selected = "Services";
const VendorDetails = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [ShowPlates, setShowPlates] = useState(true);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${vendor.phone_number}`, "_blank");
  };

  useEffect(() => {
    axios
      .get(
        `https://bookmycater.freewebhostmost.com/getVendorDetails.php?id=${id}`
      )
      .then((response) => setVendor(response.data))
      .catch((error) => console.error(error));
  }, [id]);
  // const { id2 } = useParams();

  const [reviews, setReviews] = useState([]);

  // Calculate rating counts and total reviews
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      // Ensuring valid ratings
      ratingCounts[review.rating] += 1;
    }
  });
  const totalReviews = Object.values(ratingCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // Calculate weighted sum for accurate average
  const weightedSum =
    5 * ratingCounts[5] +
    4 * ratingCounts[4] +
    3 * ratingCounts[3] +
    2 * ratingCounts[2] +
    1 * ratingCounts[1];
  const rawAverageRating = totalReviews ? weightedSum / totalReviews : 0;

  // Ensure averageRating does not exceed 5
  const averageRating = Math.min(parseFloat(rawAverageRating.toFixed(2)), 5);

  // Calculate filled and half stars for dynamic star display
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;

  const [visibleReviews, setVisibleReviews] = useState(3);
  const [showMore, setShowMore] = useState(false);

  // Sort reviews by rating (highest first)
  const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);

  const handleShowMore = () => {
    setVisibleReviews(sortedReviews.length); // Show all reviews
    setShowMore(true);
  };

  useEffect(() => {
    // Fetch reviews for the specific vendor
    fetch(
      `https://bookmycater.freewebhostmost.com/fetchreviews.php?vendor_id=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setReviews(data);
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id]);

  if (!vendor) return <p>Loading...</p>;

  return (
    <div className="w-full bg-gray-50 p-8 max-[450px]:p-0">
           
      <div className="detail flex flex-col lg:flex-row gap-9 lg:gap-9 items-start p-4 sm:p-6 lg:p-8 justify-between ">
                {/* Left Section */} 
        <div className="detail_Container w-full lg:w-3/4 flex flex-col items-center">
                    {/* Image container */}       
          <div className="detail_img w-full max-w-9xl h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg mb-4">
                       
            <img
              src={`https://bookmycater.freewebhostmost.com/${vendor.event_photos}`}
              alt="Catering Service"
              className="w-full h-full object-cover"
            />
                     
          </div>
                    {/* Content container */}         
          <div className="detail_content flex flex-row lg:flex-row max-[425px]:flex-col justify-between items-start w-full max-w-8xl bg-white text-black rounded-lg p-6 text-center shadow-lg max-[1020px]:bottom-0">
                       
            <div className="flex flex-col items-start">
                           
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                                {vendor.company_name}             
              </h4>
                            <p className="text-lg">{vendor.business_address}</p>
                           
              <a
                href={`tel:${vendor.phone_number}`}
                className="text-white bg-green-500 px-4 py-2 rounded-md mt-4 inline-block hover:bg-green-600 hover:text-white items-center gap-2 flex"
              >
                                <IoCallOutline /> Contact us              
              </a>
                         
            </div>
                       
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                           
              <div className="flex items-center gap-2">
                               
                <div className="Rating bg-black text-white w-[54px] p-3 rounded-full text-lg font-semibold">
                                    {averageRating}               
                </div>
                               
                <p className="text-sm sm:text-base"> {totalReviews} Reviews</p> 
                           
              </div>
                         
            </div>
                     
          </div>
                 
        </div>
                {/* Right Section */}       
        <div className="detail_price w-full h-full lg:w-1/2 xl:w-1/3 bg-white rounded-lg p-6 shadow-lg">
                    {/* Price Info */}       
          <p className="text-[30px] mb-3 font-bold">Estimate prices</p>  
          <div className="Starting_price flex flex-col sm:flex-row  sm:text-left mb-6">
                       
            <p className="text-lg font-medium text-gray-700 mr-2">
                            Plate Starting from            
            </p>
                       
            <h4 className="text-l font-bold text-gray-800 ml-3">
              Rs. {vendor.pricing_per_plate}
            </h4>
                     
          </div>
                   
          <div className="Starting_price flex flex-col sm:flex-row  sm:text-left mb-6">
                       
            <p className="text-lg font-medium text-gray-700 mr-2">
                            Event Starting from            
            </p>
                       
            <h4 className="text-l font-bold text-gray-800 ml-3">
              Rs. {vendor.pricing_per_event}
            </h4>
                     
          </div>
                    {/* Buttons */}         
          <div className="Buttons flex flex-col sm:flex-row gap-4 mb-6">
                       
            <button
              onClick={openWhatsApp}
              className="w-full sm:w-auto px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
            >
                            Send Message            
            </button>
                       
            <button className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 text-nowrap rounded-lg font-medium hover:bg-gray-400 transition">
                            View Contact            
            </button>
               
          </div>
                    {/* Form */}         
          <div className="detail_form">
                       
            <form className="flex flex-col gap-4">
                           
              <input
                type="text"
                placeholder="Name"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                           
              <input
                type="number"
                placeholder="Phone Number"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                           
              <input
                type="email"
                placeholder="Email"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                           
              <input
                type="date"
                placeholder="Function Date"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                           
              <textarea
                placeholder="Details about my wedding"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
                           
              <button className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-green-700 transition mt-4">
                                Submit              
              </button>
                         
            </form>
                     
          </div>
                 
        </div>
             
      </div>
            {/* Portfolio Section */}     
      <div className="portfolio flex flex-col bg-white text-black p-6 overflow-x-hidden  max-h-[900px] rounded-lg shadow-lg">
                {/* Top 20% section for buttons */}       
        <div className="flex flex-row items-center justify-evenly h-[10%] border-b-2 pb-3">
                   
          <button
            className="hover:text-blue-300"
             onClick={() => {
              selected = "portfolio";
              setShowImages(true);
              setShowPlates(false);
            }}
           
          >
                        Portfolio          
          </button>
                   
          <button
            className="hover:text-blue-300"
            onClick={() => {
              selected = "Services";
              setShowImages(false);
              setShowPlates(true);
            }}
          >
                        Type of Service          
          </button>
                   
         
                    
        </div>
                         {/* Main container occupying 80% height */}         
        <div className="main h-[80%] overflow-y-scroll w-full p-6 bg-gradient-to-br">
          {showImages && (
            <div className="flex flex-row flex-wrap max-[495px]:justify-center">
              {vendor.portfolio
                .split(",")
                .slice(0, 105)
                .map((fileName, index) => (
                  <img
                    key={index}
                    src={`https://bookmycater.freewebhostmost.com/${
                      vendor.folder_location
                    }/${fileName.trim()}`}
                    alt="Prev Event Images"
                    className="w-[160px] h-[160px] object-cover m-1 mb-0.5 mt-0.5"
                  />
                ))}
            </div>
          )}

          {ShowPlates && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Meal Box Card 1 */}

              <div className="p-8 bg-white rounded-lg shadow-md transition-all duration-300 transform flex flex-col items-center">
                <img
                  src="https://craftmyplate.com/wp-content/uploads/2024/03/Clip-path-group-1.png"
                  alt="Meal Box"
                  className="max-w-[80%] max-h-[80%] object-cover rounded-t-lg"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Meal Box
                  </h2>
                  <p className="text-gray-600">From 10 Guests onwards</p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Perfect for any event with a variety of meal options from
                    starters to mains and desserts.
                  </p>
                  <div className="mt-4 text-gray-700 font-semibold gap-2 flex flex-col items-center">
                    Available options:
                    {/* <select className="ml-2 px-2 py-1 rounded-md border border-gray-300 bg-gray-50 text-gray-700">
                      <option value="3"></option>
                      <option value="5">5</option>
                      <option value="8">8</option>
                    </select> */}
                    <img
                      src="https://craftmyplate.com/wp-content/uploads/2024/03/Frame-1000005335-1.png"
                      alt=""
                      className="w-[40%] h-[auto] max-[1025px]:w-[90%] object-cover m-auto p-auto"
                    />
                    <Link
                      to="/events"
                      className="max-w-[70%] bg-black hover:bg-gray-800 text-white py-2 mt-2 px-4 rounded-[20px]"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>

              {/* Meal Box Card 2 */}
              <div className="p-8 bg-white rounded-lg shadow-md  transition-all duration-300 transform  flex flex-col items-center">
                <img
                  src="https://craftmyplate.com/wp-content/uploads/2024/03/Frame-1000005361-1.png"
                  alt="Meal Box"
                  className="max-w-[80%] max-h-[80%] object-cover rounded-t-lg"
                />
                <div className="mt-4 text-center flex flex-col">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Delivery Box
                  </h2>
                  <p className="text-gray-600">From 10-120 Guests</p>
                  <div className="flex flex-col gap-3 items-center">
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Perfect for your farm-house parties, small gatherings, and
                      get-togethers! Explore a wide range of menu options at
                      unbeatable prices.
                    </p>

                    <Link
                      to="/events"
                      className="max-w-[70%] bg-black hover:bg-gray-800 text-white py-2 mt-2 px-4 rounded-[20px]"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>

              {/* Meal Box Card 3 */}
              <div className="p-8 bg-white rounded-lg shadow-md transition-all duration-300 transform  flex flex-col items-center">
                <img
                  src="https://craftmyplate.com/wp-content/uploads/2024/03/Clip-path-group-3.png"
                  alt="Meal Box"
                  className="max-w-[80%] max-h-[80%] object-cover rounded-t-lg"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Catering
                  </h2>
                  <p className="text-gray-600">From 10 Guests onwards</p>
                  <div className="flex flex-col gap-3 items-center">
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Best for your extravagant events like a wedding! Just
                      choose one of our catering menu, get creative and
                      customize it as you want. The choices are limitless and
                      the flavours.
                    </p>

                    <Link
                      to="/events"
                      className="max-w-[70%] bg-black hover:bg-gray-800 text-white py-2 mt-2 px-4 rounded-[20px]"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
               
      </div>
               {/* TextPart */}     
      <div className="detail_text w-full bg-white rounded-lg p-6 shadow-lg mt-8 mx-auto">
         
        <p className="text-lg font-medium text-gray-800 mb-4">
              About {vendor.company_name} Services - {vendor.business_address} 
        </p>
         
        <div className="text-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-12 ">
             
          <div>
                        
            <p>
                    <b>Areas covered:</b>     
              <ul className="list-disc ml-5">
                       
                {vendor.operating_regions.split(",").map((region, index) => (
                  <li key={index}>{region.trim()}</li>
                ))}
                     
              </ul>
                 
            </p>
                 
          </div>
             
          <div>
               
            <p>
                    <b>Dietary Options:</b>     
              <ul className="list-disc ml-5">
                       
                {vendor.dietary_accommodations
                  .split(",")
                  .map((option, index) => (
                    <li key={index}>{option.trim()}</li>
                  ))}
                     
              </ul>
                 
            </p>
                 
          </div>
             
          <div>
               
            <p>
                    <b>Services offered:</b>     
              <ul className="list-disc ml-5">
                       
                {vendor.services.split(",").map((service, index) => (
                  <li key={index}>{service.trim()}</li>
                ))}
                     
              </ul>
                 
            </p>
                 
          </div>
                
        </div>
      </div>
            {/* Stats Section */}     
{/*       <div className="stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-12 bg-white rounded-lg shadow-sm mt-8 ">
                        
        <div className="stat_VegPrice text-center">
                    <b>Veg price per plate</b>          <p>Rs. 2,000</p>       
        </div>
               
        <div className="stat_nonVegPrice text-center">
                    <b>Starting plate Non Veg</b>          <p>Rs. 4,000</p>     
           
        </div>
               
        <div className="stat_MaxCapacity text-center">
                    <b>Max Capacity</b>          <p>2000 pax</p>       
        </div>
               
        <div className="stat_MinCapacity text-center">
                    <b>Min Capacity</b>          <p>100 pax</p>       
        </div>
             
      </div> */}
            {/* reviews */}     
      <div className="review flex flex-col md:flex-row justify-between items-start mt-8">
        {/* Ratings Section */}
        <div className="reviews flex flex-col justify-center p-8 bg-white rounded-lg shadow-lg w-full lg:w-1/2 md:w-1/3 h-auto max-[425px]:h-auto">
          <h2 className="text-[40px]">
            <b>Customer reviews</b>
          </h2>

          {/* Display Dynamic Average Rating Stars */}
          <div className="flex items-center mb-2">
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, index) => (
              <svg
                key={index}
                className="w-6 h-6 text-yellow-300 me-1"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}

            {/* Half Star */}
            {hasHalfStar && (
              <svg
                className="w-6 h-6 text-yellow-300 me-1"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <defs>
                  <mask id="halfStar">
                    <rect x="0" y="0" width="11" height="20" fill="white" />
                  </mask>
                </defs>
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  fill="currentColor"
                  mask="url(#halfStar)"
                />
              </svg>
            )}

            <p className="ms-1 text-sm font-medium text-gray-700 text-nowrap">
              {averageRating} out of 5
            </p>
          </div>

          <p className="text-sm font-medium text-gray-600 ">
            {totalReviews} global ratings
          </p>

          {/* Display Progress Bars for Each Rating */}
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star];
            const percentage = totalReviews
              ? ((count / totalReviews) * 100).toFixed(0)
              : 0;
            return (
              <div key={star} className="flex items-center mt-4">
                <a
                  href="#"
                  className="text-sm font-medium text-black hover:underline text-nowrap"
                >
                  {star} star
                </a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                  <div
                    className="h-5 bg-yellow-300 rounded"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>

        {/* New Separate Div Below Ratings */}

        {/* Feedback Form Section */}
        <div className="p-6 bg-white rounded-lg shadow-lg w-full lg:w-1/2 md:w-2/3 mt-6 md:mt-0 ml-0 md:ml-4">
          <h3 className="text-lg font-medium mb-4">Leave Your Feedback</h3>
          <form
            id="feedbackForm"
            className="space-y-4"
            action="https://bookmycater.freewebhostmost.com/reviewsubmit.php"
            method="POST"
          >
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Your Name"
                required
                name="personname"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Your Email"
                required
                name="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center">
                    <label htmlFor={`rating-${value}`} className="mt-1 ml-2 ">
                      {value}
                    </label>
                    <input
                      type="radio"
                      id={`rating-${value}`} // Assign a unique id to each radio button
                      name="rating"
                      value={value}
                      required
                      className="ml-2 scale-125 mb-5"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="feedback"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  rows="4"
                  placeholder="Your feedback here..."
                  required
                  name="feedback"
                ></textarea>
              </div>
            </div>
            <input
              type="number"
              value={id}
              readOnly
              name="vendor_id"
              style={{ display: "none" }}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-black/80"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
            {/* COmments Section */}     
      <div className="max-w-[100%] mt-12 m-3 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-[40px] font-medium mb-4 p-4">What People Think</h3>
        {sortedReviews.slice(0, visibleReviews).map((review) => (
          <div
            key={review.id}
            className="mr-10 comment max-w-[100%] bg-white p-4 rounded-lg shadow-md mb-4"
          >
            <div className="user_info flex flex-row items-center space-x-4">
              <div className="pfp rounded-full w-12 h-12 overflow-hidden border border-gray-300 max-[375px]: hidden">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User Profile"
                  className="object-cover w-full h-full "
                />
              </div>
              <div className="names flex flex-col">
                <p className="name text-lg font-semibold">{review.name}</p>
                <p className="date text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <div className="user_ratings flex items-center mb-5 ml-auto">
                <span className="text-yellow-500 flex-row flex">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <LiaStarSolid key={index} />
                  ))}
                </span>
                <p className="text-sm ml-1">{review.rating}.0</p>
              </div>
            </div>
            <p className="comment_text mt-2 text-gray-700">{review.feedback}</p>
          </div>
        ))}

        {/* Display "View More" button if more than 3 reviews exist */}
        {!showMore && sortedReviews.length > 3 && (
          <button
            onClick={handleShowMore}
            className="text-blue-500 mt-4 hover:underline"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default VendorDetails;
