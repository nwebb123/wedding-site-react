import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SanitizeText } from "../Utils/SanitizeText";

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
  const [plusOneDietaryRestrictions, setPlusOneDietaryRestrictions] =
    useState(null);

  const [loading, setLoading] = useState(false);

  // const [inputValue, setInputValue] = useState("");

  // const showSwal_TEMPLATE = () => {
  //   withReactContent(Swal).fire({
  //     title: <i>Input something</i>,
  //     input: "text",
  //     inputValue,
  //     preConfirm: () => {
  //       setInputValue(Swal.getInput()?.value || "");
  //     },
  //   });
  // };

  const showErrorMessage = () => {
    withReactContent(Swal).fire({
      icon: "question",
      title: (
        <h2>
          Hmm, having trouble finding you...
          <br /> Maybe try the full or shortened version of your first name?
        </h2>
      ),
    });
  };

  const showSuccessMessage = (titleParam) => {
    withReactContent(Swal).fire({
      icon: "success",
      title: <h1>{titleParam}</h1>,
    });
  };

  //Check with api to see if user is eligible to register
  const SubmitName = async (e) => {
    e.preventDefault();

    let sanitizedText = SanitizeText(firstName, lastName);
    console.log(sanitizedText);

    if (sanitizedText.firstName !== "" && sanitizedText.lastName !== "") {
      setLoading(true); // Start loading
      try {
        //put api url inside .env for security
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
          showSuccessMessage(
            "Your RSVP has already been received. If you have any questions please reach out to the bride or groom."
          );
          setHasSubmittedRSVPForm(true);
        } else {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setShowRSVPForm(true);
        }
      } catch (error) {
        console.error(error);
        showErrorMessage();
      } finally {
        setLoading(false); // Stop loading in both success and error cases
      }
    }
  };

  //Submit RSVP to api, which then updates DB through service class
  const SubmitRSVP = async (e) => {
    e.preventDefault();

    //TODO: Move this validation logic to a function
    if (isAttending == null) {
      withReactContent(Swal).fire({
        icon: "warning",
        title: "Please select whether you're attending or not",
        confirmButtonColor: "#d33",
      });
      return;
    } else if (
      hasPlusOne &&
      (plusOneFirstName.trim() === "" || plusOneLastName.trim() === "")
    ) {
      withReactContent(Swal).fire({
        icon: "warning",
        title: "Please enter a first and last name for your guest",
        confirmButtonColor: "#d33",
      });
      return;
    }

    //Set userDtos to contain a dto for the invited user. Condition below will also add an additional dto for a plus one
    const userDtos = [
      {
        firstName,
        lastName,
        isAttending,
        dietaryRestrictions,
        isPlusOne: false,
        hasPlusOne: true,
      },
    ];

    if (hasPlusOne) {
      userDtos.push({
        firstName: plusOneFirstName,
        lastName: plusOneLastName,
        isAttending: true,
        dietaryRestrictions: plusOneDietaryRestrictions,
        isPlusOne: true,
        hasPlusOne: false,
      });
    }

    const payload = {
      dtos: userDtos,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_RSVP_API_URL}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg);
      }

      showSuccessMessage("RSVP submitted successfully!");
      setHasSubmittedRSVPForm(true);
    } catch (error) {
      console.error(error);
      alert("Could not submit RSVP. " + error.message);
    }
  };

  return (
    <div className="bg-weddingPeach min-h-screen p-4">
      <h2 className="text-2xl font-bold text-center mb-4">RSVP</h2>

      {/* Check Name of user before allowing them to RSVP */}
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
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>

          {loading && (
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <div></div>
        </>
      )}

      {/* If user is recognized after inputting first and last name, display RSVP form*/}
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
                readOnly
                //onChange={(e) => setFirstName(e.target.value)}
                className="w-full mt-1 p-2 border-2 rounded"
              />
            </label>

            <label className="block mb-2">
              <h4 className="pl-1">Last Name:</h4>
              <input
                type="text"
                value={lastName}
                readOnly
                //onChange={(e) => setLastName(e.target.value)}
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

          {loading && (
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </form>
      )}

      {/* If user has already submitted their form, show hasSubmitted View */}
      {hasSubmittedRSVPForm && (
        <div className="text-center max-w-xl mx-auto p-4 sm:p-6 mt-6">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800">
            Thanks for RSVPing!
          </h2>
          <img
            className="mx-auto w-full max-w-md rounded-xl object-cover"
            src="/imgs/ai_proposal.png"
            alt="Nick and Emily proposal in the style of Studio Ghibli"
          />
        </div>
      )}
    </div>
  );
};

export default RSVP;
