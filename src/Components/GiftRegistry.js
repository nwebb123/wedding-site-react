import React from 'react';

const GiftRegistry = () => {
  return (
    <div className="min-h-screen p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Gift Registry</h2>
      <div className="max-w-md mx-auto">
        <p className="text-center mb-4">
          View our registry:
        </p>
        <a
          href="https://www.amazon.com/your-registry-link"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-weddingPink text-white py-2 rounded shadow hover:bg-pink-600"
        >
          Amazon Wishlist
        </a>
        <p className="text-center mt-4">or</p>
        <p className="text-center mt-2">Donate to our Venmo: @your-venmo</p>
      </div>
    </div>
  );
};

export default GiftRegistry;
