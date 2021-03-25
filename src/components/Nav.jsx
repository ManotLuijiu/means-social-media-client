import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  // const { pathname } = window.location;
  // const path = pathname === '/' ? 'home' : pathname.substr(1);
  // const [activeItem, setActiveItem] = useState(path);

  // const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
            viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">MooCoding</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {/* <Link to="/login" className="mr-5 hover:text-gray-900">
            Login
          </Link> */}
        </nav>
        <button
          type="button"
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          <Link to="/login">Login</Link>
        </button>
        <button
          type="button"
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </header>
  );
}
