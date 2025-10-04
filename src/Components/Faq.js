import React, { useState } from "react";
import faqData from "../FaqData.json";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-weddingPeach min-h-screen p-6">
      <h2 className="text-2xl font-bold text-center mb-4">FAQ</h2>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow divide-y divide-stone-200">
        {faqData.map((faq, index) => (
          <div key={faq.id} className="group">
            {/* Question row */}
           <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-5 rounded-lg flex items-center focus:outline-none"
                >
                {/* Centered question */}
                <span className="flex-1 text-center text-lg font-medium">
                    {faq.question}
                </span>

                {/* Arrow icon */}
                <svg
                    className={`h-5 w-5 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                >
                    <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
                </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 px-4 ${
                openIndex === index
                  ? "max-h-40 opacity-100 pb-5"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-stone-700 text-center m-2 p-3">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-6 text-stone-700 font-medium">
        The final day for guests to book at your discounted group rate is{" "}
        <span className="font-bold">Feb 26, 2026</span>.
      </p>
    </div>
  );
};

export default Faq;
