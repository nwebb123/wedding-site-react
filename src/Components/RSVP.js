import React, { use, useState } from "react";

const RSVP = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plusOneFirstName, setPlusOneFirstName] = useState("");
  const [plusOneLastName, setPlusOneLastName] = useState("");
  const [hasSubmittedRSVPForm] = useState(null);
  const [showExistingUserForm, setShowExistingUserForm] = useState(false);
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [isAttending, setIsAttending] = useState(false);

  const SubmitName = async (e) => {
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
        `https://localhost:7148/api/user/search?firstName=${firstName}&lastName=${lastName}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json(); // ✅ read once
      console.log("Parsed JSON:", data);

      //Check if user has already submitted their form
      if (data.hasSubmittedRSVPForm) {
        alert("Error: This user has already submitted their RSVP");
      } else {
        setShowExistingUserForm(true);
      }
    } catch (error) {
      console.error(error);
      alert("Could not find user. Please check your name and try again.");
    }
  };
  const SubmitRSVP = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch(
      //   `https://localhost:7148/api/user/search?firstName=${firstName}&lastName=${lastName}`
      // );

      // if (!response.ok) {
      //   throw new Error("User not found");
      // }

      // const data = await response.json(); // ✅ read once
      // console.log("Parsed JSON:", data);

      alert("Show next part of form to submit");
    } catch (error) {
      console.error(error);
      alert("Could not find user. Please check your name and try again.");
    }
  };

  return (
    <div className="bg-weddingPeach min-h-screen p-4">
      <h2 className="text-2xl font-bold text-center mb-4">RSVP</h2>
      {/* Check Name form */}
      <form
        onSubmit={SubmitName}
        className="max-w-md mx-auto bg-white p-4 rounded shadow"
      >
        <label className="block mb-2">
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block mb-2">
          Last Name:
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

      {showExistingUserForm && (
        <form
          onSubmit={SubmitRSVP}
          className="max-w-md mx-auto bg-white p-4 rounded shadow mt-4"
        >
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <label className="block mb-2">
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <label className="block mb-2">
            Will you be attending?
            <input
              type="checkbox"
              checked={isAttending === "true"}
              onChange={(e) =>
                setIsAttending(e.target.checked ? "true" : "false")
              }
              className="ml-2"
            />
          </label>

          <label className="block mb-2">
            Bringing a plus one?
            <input
              type="checkbox"
              checked={hasPlusOne}
              onChange={(e) => setHasPlusOne(e.target.checked)}
              className="ml-2"
            />
          </label>

          {/* Plus One Form Fields */}
          {hasPlusOne && (
            <>
              <label className="block mb-2">
                Plus One First Name:
                <input
                  type="text"
                  value={plusOneFirstName}
                  onChange={(e) => setPlusOneFirstName(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                />
              </label>

              <label className="block mb-2">
                Plus One Last Name:
                <input
                  type="text"
                  value={plusOneLastName}
                  onChange={(e) => setPlusOneLastName(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                />
              </label>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-weddingPink text-white py-2 rounded hover:bg-pink-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default RSVP;
