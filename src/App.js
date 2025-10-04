import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import RSVP from "./Components/RSVP";
import GiftRegistry from "./Components/GiftRegistry";
import HotelBlock from "./Components/HotelBlock";
import Faq from "./Components/Faq";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/registry" element={<GiftRegistry />} />
        <Route path="/hotels" element={<HotelBlock />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </Router>
  );
}

export default App;
