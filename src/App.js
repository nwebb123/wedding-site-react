import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Home';
import RSVP from './Components/RSVP';
import GiftRegistry from './Components/GiftRegistry';
import HotelBlock from './Components/HotelBlock';

function App() {
  return (
    <Router>
      <nav className="bg-white shadow p-4 flex justify-center space-x-4">
        <Link to="/" className="text-black font-bold">Home</Link>
        <Link to="/rsvp" className="text-black font-bold">RSVP</Link>
        <Link to="/registry" className="text-black font-bold">Gift Registry</Link>
        <Link to="/hotels" className="text-black font-bold">Hotel Block</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/registry" element={<GiftRegistry />} />
        <Route path="/hotels" element={<HotelBlock />} />
      </Routes>
    </Router>
  );
}

export default App;
