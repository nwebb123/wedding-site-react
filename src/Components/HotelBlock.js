import React from "react";
import hotelData from "../hotels.json";

const HotelBlock = () => {
  return (
    <div className="bg-weddingPeach min-h-screen p-4 text-center">
      <h2 className="text-2xl font-bold text-center mb-4">Hotel Block</h2>
      <ul className="max-w-md mx-auto bg-white p-4 rounded shadow">
        {hotelData.map((hotel) => (
          <div
            key={hotel.id}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <li
              className="mb-4 border border-black p-3 m-1 shadow rounded-lg 
                         transition-all duration-300 ease-in-out 
                         hover:bg-gray-100 hover:shadow-lg cursor-pointer"
            >
              <h3 className="font-bold group-hover:underline">{hotel.name}</h3>
              <p>{hotel.address}</p>
              <p>{hotel.city}</p>
              <p>{hotel.phone}</p>
              
              {hotel["group_code"] && (
                <>
                  <p>Group Code: {hotel.group_code}</p>
                </>
              )}

              <a 
                target="_blank"
                rel="noopener noreferrer"
                href={hotel.url}
              >
                <button              
                  className="w-3/5 m-2 py-2  bg-pink-600 text-white rounded hover:bg-pink-600"
                >
                  Book
                </button>
              </a>
            </li>
          </div>
        ))}

        <h4 className="pb-3">
          The final day for guests to book at the discounted group rate is February
          26, 2026.
        </h4>
      </ul>
    </div>
  );
};

export default HotelBlock;
