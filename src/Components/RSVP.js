import React, { useState } from 'react';

const RSVP = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for RSVPing, ${name}!`);
  };

  return (
    <div className="bg-weddingPeach min-h-screen p-4">
      <h2 className="text-2xl font-bold text-center mb-4">RSVP</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-4 rounded shadow"
      >
        <label className="block mb-2">
          Your Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Number of Guests:
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-weddingPink text-white py-2 rounded hover:bg-pink-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RSVP;
