import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Home';
// import RSVP from './components/RSVP';
// import GiftRegistry from './components/GiftRegistry';
// import HotelBlock from './components/HotelBlock';

function App() {
  return (
    <Router>
      <nav className="bg-white shadow p-4 flex justify-center space-x-4">
        <Link to="/" className="text-weddingPink font-bold">Home</Link>
        {/* <Link to="/rsvp" className="text-weddingPink font-bold">RSVP</Link>
        <Link to="/registry" className="text-weddingPink font-bold">Gift Registry</Link>
        <Link to="/hotels" className="text-weddingPink font-bold">Hotel Block</Link> */}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/rsvp" element={<RSVP />} />
        <Route path="/registry" element={<GiftRegistry />} />
        <Route path="/hotels" element={<HotelBlock />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
