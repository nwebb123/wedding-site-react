import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo / Brand */}
        <Link to="/" className="block md:hidden text-xl font-bold text-black mx-auto">
          Emily & Nick 💕
        </Link>

        {/* Hamburger Menu Button (small screens only) */}
        <button
          className="md:hidden flex flex-col justify-center items-center space-y-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            // Hamburger icon
            <>
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </>
          ) : (
            // X icon
            <span className="text-2xl font-bold text-black">×</span>
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 mx-auto">
          <Link to="/" className="text-black font-bold hover:text-green-600">Home</Link>
          <Link to="/rsvp" className="text-black font-bold hover:text-green-600">RSVP</Link>
          <Link to="/registry" className="text-black font-bold hover:text-green-600">Gift Registry</Link>
          <Link to="/hotels" className="text-black font-bold hover:text-green-600">Hotel Block</Link>
          <Link to="/faq" className="text-black font-bold hover:text-green-600">FAQ</Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-linear ${
          isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="flex flex-col items-center mt-4 space-y-4">
          <Link
            to="/"
            className="text-black font-bold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/rsvp"
            className="text-black font-bold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            RSVP
          </Link>
          <Link
            to="/registry"
            className="text-black font-bold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            Gift Registry
          </Link>
          <Link
            to="/hotels"
            className="text-black font-bold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            Hotel Block
          </Link>
          <Link
            to="/faq"
            className="text-black font-bold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
