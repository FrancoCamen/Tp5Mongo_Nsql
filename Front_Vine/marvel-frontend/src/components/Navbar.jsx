import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500">Marvel Heroes</Link>
        <Link to="/create" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Add Hero</Link>
      </div>
    </nav>
  );
}

export default Navbar;