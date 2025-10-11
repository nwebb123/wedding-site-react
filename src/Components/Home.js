import React, {useEffect} from 'react';

const Home = () => {
  
  useEffect(() => {
    const lastPing = localStorage.getItem("apiPingTime");
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;

    // Only ping if 15 minutes have passed or never pinged before
    if (!lastPing || now - lastPing > fifteenMinutes) {
      fetch(`${process.env.REACT_APP_API_URL}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("API warmed up:", data);
          localStorage.setItem("apiPingTime", now);
        })
        .catch((err) => console.error("Error warming API:", err));
    }
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/imgs/peter-bucks-hY4TcvzyPlw-unsplash.jpg')" }}
    >
      <div className="max-w-md bg-white bg-opacity-70 p-6 rounded-xl shadow-lg">
        <img
          src="/imgs/propose_4.jpeg"
          alt="Wedding Couple"
          className="xs:size-10/12 xs:-mt-24 sm:-mt-20 shadow-lg mx-auto mb-4 rounded-xl"
        />
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          Emily & Nick
        </h1>
        <p className="text-xl text-gray-600 mt-2"><span className="font-bold">Date: </span>March 20, 2026</p>
        <p className="text-xl text-gray-600 mt-1"><span className="font-bold">Location: </span>San Marino Club in Troy, MI</p>
      </div>
    </div>
  );
};

export default Home;
