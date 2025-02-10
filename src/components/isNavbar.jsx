import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      <nav className="bg-gray-800 px-4 py-3 flex justify-between ml-64">
        <div className="flex items-center text-xl">
          <IoArrowBack
            className="text-white me-4 cursor-pointer"
            onClick={handleBack} // Call the back function when clicked
          />
          <span className="text-white font-semibold">ISI JUDUL NANTI</span>
        </div>
        <div className="flex items-center gap-x-5">
          {/* Optional content */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
