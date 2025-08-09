import React from "react";

const HotelBlock = () => {
  return (
    <div className="bg-weddingPeach min-h-screen p-4 text-center">
      <h2 className="text-2xl font-bold text-center mb-4">Hotel Block</h2>
      <ul className="max-w-md mx-auto bg-white p-4 rounded shadow">
        <a
          target="_blank"
          href="https://www.hiexpress.com/redirect?path=rates&brandCode=EX&localeCode=en&regionCode=1&hotelCode=DTTOM&checkInDate=19&checkInMonthYear=022026&checkOutDate=21&checkOutMonthYear=022026&_PMID=99801505&GPC=ENW&cn=no&viewfullsite=true"
          className="block group"
        >
          <li className="mb-4 border border-black p-3 m-1 shadow transform transition-all duration-300 group-hover:scale-105 group-hover:p-4">
            <h3 className="font-bold underline">
              Holiday Inn Express & Suites Troy
            </h3>
            <p>400 Stephenson Highway</p>
            <p>Troy, MI 48083</p>
            <p>(123) 456-7890</p>
          </li>
        </a>
        <a
          target="_blank"
          href="https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=DTTTRES&arrivalDate=2026-03-19&departureDate=2026-03-21&groupCode=CES90K&room1NumAdults=1&cid=OM%2CWW%2CHILTONLINK%2CEN%2CDirectLink"
          className="block group"
        >
          <li className="mb-4 border border-black p-3 m-1 shadow transform transition-all duration-300 group-hover:scale-105 group-hover:p-4">
            <h3 className="font-bold">Embassy Suites by Hilton</h3>
            <p>850 Tower Dr</p>
            <p>Troy, MI 48098</p>
            <p>(123) 456-7890</p>
          </li>
        </a>

        <h4 className="pb-3">
          The final day for guests to book at your discounted group rate is Feb
          26, 2026.
        </h4>
      </ul>
    </div>
  );
};

export default HotelBlock;
