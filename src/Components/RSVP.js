import React, { useState } from "react";

const RSVP = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Sanitize input before sending request to api
    //function SanitizeText(string text){
    //
    //}

    try {
      //const response = await fetch(`${process.env.RSVP_API_URL}`);
      //const response = await fetch(`${process.env.REACT_APP_API_URL}/search?${firstName}`);
      // const response = await fetch(
      //   `${process.env.RSVP_API_URL}/search?firstName=${firstName}&lastName=${lastName}`
      // );
      const response = await fetch(
        `https://localhost:7148/api/user/search?firstName=Alex&lastName=Webb`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json(); // ✅ read once   
      console.log("Parsed JSON:", data);

    } catch (error) {
      console.error(error);
      alert("Could not find user. Please check your name and try again.");
    }

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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block mb-2">
          Your Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
