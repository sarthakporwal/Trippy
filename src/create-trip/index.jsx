import React, { useState } from 'react';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';



function CreateTrip() {
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const geocodingClient = mbxGeocoding({
    accessToken: import.meta.env.VITE_MAP_BOX_API_KEY,
   });
   const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await geocodingClient
        .forwardGeocode({
          query,
          autocomplete: true,
          limit: 5, // Limits the number of suggestions
        })
        .send();

      if (response && response.body && response.body.features) {
        setSuggestions(response.body.features);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  // const handleInputChange = (e) => {
  //   const value = e.target.valuee;
  //   const name=e.target.name;
    
  //   setDestination(value);
  //   fetchSuggestions(value);
  // };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    fetchSuggestions(value);
  };

  // Handle selection of a suggestion
  const handleSuggestionSelect = (place) => {
    setDestination(place.place_name);
    setSuggestions([]);
  };
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will 
generate a customized itinerary based on our preferences.</p>

    <div className='mt-20'>
      <div>
        <h2 className='text-xl my-3 font-medium'>What is your destination of choice ?</h2>
        <input
            type='text'
            value={destination}
            onChange={handleInputChange}
            className='border border-gray-300 rounded px-3 py-2 w-full'
            placeholder='Enter a destination'
          />

          {/* Displaying autocomplete suggestions */}
          {suggestions.length > 0 && (
            <ul className='border border-gray-300 mt-2 rounded'>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className='px-3 py-2 cursor-pointer hover:bg-gray-200'
                >
                  {suggestion.place_name}
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
    </div>
  )
}

export default CreateTrip