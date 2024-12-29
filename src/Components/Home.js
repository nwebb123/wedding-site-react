import React from 'react';

const Home = () => {
  return (
    <div className="bg-weddingPink min-h-screen flex items-center justify-center text-center">
      {/*  */}
      <div className="max-w-md ">
        <img
          src="/imgs/propose_4.jpeg"
          alt="Wedding Couple"
          className="xs:size-10/12 xs:-mt-24 sm:-mt-20 shadow-lg mx-auto mb-4 rounded-xl"
        />
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          Emily & Nick
        </h1>
        <p className="text-xl text-gray-600 mt-2">Date: March 20, 2026</p>
        <p className="text-xl text-gray-600 mt-1">Location: San Marino Club</p>
      </div>
    </div>
  );
};

export default Home;
