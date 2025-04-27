import React, { use, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const RSVP = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plusOneFirstName, setPlusOneFirstName] = useState("");
  const [plusOneLastName, setPlusOneLastName] = useState("");
  const [hasSubmittedRSVPForm, setHasSubmittedRSVPForm] = useState(false);
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [hasPlusOne, setHasPlusOne] = useState(null);
  const [isAttending, setIsAttending] = useState(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(null);
  const [plusOneDietaryRestrictions, setPlusOneDietaryRestrictions] = useState(null);

  const [inputValue, setInputValue] = useState('')
  const showSwal_TEMPLATE = () => {
    withReactContent(Swal).fire({
      title: <i>Input something</i>,
      input: 'text',
      inputValue,
      preConfirm: () => {
        setInputValue(Swal.getInput()?.value || '')
      },
    })
  }

  const showErrorMessage = () => {
    withReactContent(Swal).fire({
      title: <h2>Hmm, having trouble finding you...<br/> Maybe try the full or shortened version of your first name?</h2>
    })
  }

  const showSuccessMessage = (titleParam) => {
    withReactContent(Swal).fire({
      title: <h1>{titleParam}</h1>
    })
  }


  const SubmitName = async (e) => {
    e.preventDefault();

    //TODO:Sanitize input before sending request to api
    //function SanitizeText(string text){
    //
    //}

    try {   
      //TODO: Move to env variable
      const response = await fetch(
        `${process.env.REACT_APP_RSVP_API_URL}/search?firstName=${firstName}&lastName=${lastName}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      console.log("Parsed JSON:", data);

      //Check if user has already submitted their form
      if (data.hasSubmittedRSVPForm) {
        //alert("Error: This user has already submitted their RSVP");
        //display a message and picture to user thanking them for their RSVP
        showSuccessMessage("Your RSVP has already been received. If you have any questions please reach out to the gride or groom.");
        setHasSubmittedRSVPForm(true)
      } else {
        setShowRSVPForm(true);
      }
    } catch (error) {
      console.error(error);
      //alert("Could not find user. Please check your name and try again.");
      //Show error component on screen
      showErrorMessage();
    }
  };

  const SubmitRSVP = async (e) => {
    e.preventDefault();

    const userDtos = [
      {
        firstName,
        lastName,
        isAttending,
        dietaryRestrictions,
        isPlusOne: false,
        hasPlusOne: true
      },
    ];

    if (hasPlusOne) {
      userDtos.push({
        firstName: plusOneFirstName,
        lastName: plusOneLastName,
        isAttending: true,
        dietaryRestrictions: plusOneDietaryRestrictions,
        isPlusOne: true,
        hasPlusOne: false
      });
    }

    const payload = {
      dtos: userDtos,
    };

    try {  
      const response = await fetch(`${process.env.REACT_APP_RSVP_API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg);
      }

      //alert("RSVP submitted successfully!");
      showSuccessMessage("RSVP submitted successfully!");
      setHasSubmittedRSVPForm(true)
      // Optionally reset the form or redirect
    } catch (error) {
      console.error(error);
      alert("Could not submit RSVP. " + error.message);
    }
  };

  return (

    <div className="bg-weddingPeach min-h-screen p-4">
      <h2 className="text-2xl font-bold text-center mb-4">RSVP</h2>
      {/* Check Name form */}
      {!showRSVPForm && !hasSubmittedRSVPForm && (

        <>   
        <form
          onSubmit={SubmitName}
          className="max-w-md mx-auto bg-white p-4 rounded shadow"
        >
          <label className="block mb-2">
            <h4 className="pl-1">First Name:</h4>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-1 p-2 border-2 rounded"
            />
          </label>

          <label className="block mb-2">
            <h4 className="pl-1">Last Name:</h4>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 p-2 border-2 rounded"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-600"
          >
            Submit
          </button>
        </form>

        <div></div>
        </>
     
      )}




      {showRSVPForm && !hasSubmittedRSVPForm && (
        <form
          id="existingUserForm"
          onSubmit={SubmitRSVP}
          className="max-w-md mx-auto bg-white p-4 rounded shadow mt-4"
        >
          <div className="p-2">
            <h3 className="text-xl font-bold mb-4 text-center">
              Thanks for RSVP'ing {firstName}!
            </h3>
            <label className="block mb-2">
              <h4 className="pl-1">First Name:</h4>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full mt-1 p-2 border-2 rounded"
              />
            </label>

            <label className="block mb-2">
              <h4 className="pl-1">Last Name:</h4>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full mt-1 p-2 border-2 rounded"
              />
            </label>

            <div className="border-2 my-2">
              <label className="block mb-2">
                <h4 className="block pl-1 py-2">Will you be attending?</h4>

                <input
                  type="checkbox"
                  checked={isAttending === true}
                  onChange={(e) => setIsAttending(true)}
                  className="ml-2 "
                />
                <span className="pl-2">You betcha!</span>

                <input
                  type="checkbox"
                  checked={isAttending === false}
                  onChange={(e) => setIsAttending(false)}
                  className="ml-2"
                />
                <span className="pl-2">Unfortunately not</span>
              </label>
            </div>

            {/* Dietary Restrictions Input */}
            <label className="block my-2">
              <h4 className="pl-1">
                Any dietary restrictions we should know about?
              </h4>
              <textarea
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                row={4}
                className="w-full mt-1 p-2 border-2 rounded"
              />
            </label>

            {/* Plus One Checkbox Inputs */}
            <div className="border-2">
              <label className="block mb-2">
                <h4 className="block pl-1 py-2">
                  Will you be bringing a plus one?
                </h4>
                <input
                  type="checkbox"
                  checked={hasPlusOne === true}
                  onChange={(e) => setHasPlusOne(true)}
                  className="ml-2"
                />
                <span className="pl-2">Yes</span>
                <input
                  type="checkbox"
                  checked={hasPlusOne === false}
                  onChange={(e) => setHasPlusOne(false)}
                  className="ml-2"
                />
                <span className="pl-2">No</span>
              </label>
            </div>

            {/* Plus One Form Fields */}
            {hasPlusOne && (
              <>
                <label className="block my-2">
                  <h4 className="pl-1">Plus One First Name:</h4>
                  <input
                    type="text"
                    value={plusOneFirstName}
                    onChange={(e) => setPlusOneFirstName(e.target.value)}
                    className="w-full mt-1 p-2 border-2 rounded"
                  />
                </label>

                <label className="block mb-2">
                  <h4 className="pl-1">Plus One Last Name:</h4>
                  <input
                    type="text"
                    value={plusOneLastName}
                    onChange={(e) => setPlusOneLastName(e.target.value)}
                    className="w-full mt-1 p-2 border-2 rounded"
                  />
                </label>

                {/* Dietary Restrictions Input */}
                <label className="block my-2">
                  <h4 className="pl-1">
                    Any dietary restrictions we should know about for{" "}
                    {plusOneFirstName == null || plusOneFirstName === ""
                      ? "your plus one"
                      : plusOneFirstName}
                    ?
                  </h4>
                  <textarea
                    type="text"
                    value={plusOneDietaryRestrictions}
                    onChange={(e) =>
                      setPlusOneDietaryRestrictions(e.target.value)
                    }
                    row={4}
                    className="w-full mt-1 p-2 border-2 rounded"
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              className="mx-auto p-2 mt-4 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-600"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {hasSubmittedRSVPForm && (

        <div className="border-2 border-black text-center">
          <h2 className="m-2 p-2 text-2xl">Thanks for RSVPing!</h2>
          <img className='mx-auto size-1/2' src='/imgs/ai_proposal.png' alt="Nick and Emily proposal photo in the style of Studio Ghibli" />
        </div>

      )}


      
    </div>
  );
};

export default RSVP;
