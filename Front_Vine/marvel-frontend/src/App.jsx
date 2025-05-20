import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import CreateCharacter from './pages/CreateCharacter';
import EditCharacter from './pages/EditCharacter';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/create" element={<CreateCharacter />} />
          <Route path="/edit/:id" element={<EditCharacter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
