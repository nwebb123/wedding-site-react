import React from 'react';

const GiftRegistry = () => {
  return (
    <div className="bg-weddingPeach min-h-screen p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Gift Registry</h2>
      <div className="max-w-md mx-auto">
        <h5 className="text-center mb-4">
          View our registry:
        </h5>
        <a
          href="https://www.amazon.com/wedding/registry/1L70VWN7ZOF7P"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-pink-600 text-white py-2 rounded shadow hover:bg-pink-500"
        >
          Amazon Wishlist
        </a>
      </div>
    </div>
  );
};

export default GiftRegistry;
