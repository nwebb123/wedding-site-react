import React from 'react';

const Home = () => {
  return (
    <div className="bg-weddingPink min-h-screen flex items-center justify-center text-center">
      <div className="max-w-md">
        <img
          src="/imgs/propose_3.jpeg"
          alt="Wedding Couple"
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800">
          Our Wedding
        </h1>
        <p className="text-xl text-gray-600 mt-2">Date: June 15, 2025</p>
        <p className="text-xl text-gray-600 mt-1">Location: Beachside Venue</p>
      </div>
    </div>
  );
};

export default Home;
