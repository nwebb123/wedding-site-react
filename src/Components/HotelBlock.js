import React from 'react';

const HotelBlock = () => {
  return (
    <div className="min-h-screen p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Hotel Block</h2>
      <ul className="max-w-md mx-auto bg-white p-4 rounded shadow">
        <li className="mb-4">
          <h3 className="font-bold">Hotel Name 1</h3>
          <p>Address: 123 Venue Lane</p>
          <p>Phone: (123) 456-7890</p>
        </li>
        <li className="mb-4">
          <h3 className="font-bold">Hotel Name 2</h3>
          <p>Address: 456 Celebration Blvd</p>
          <p>Phone: (987) 654-3210</p>
        </li>
      </ul>
    </div>
  );
};

export default HotelBlock;
