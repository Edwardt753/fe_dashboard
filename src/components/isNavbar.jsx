import React from "react";
import { IoArrowBack, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ toggleSidebar, isSidebarOpen, isTitle, isToken }) => {
  const navigate = useNavigate();

  //must use delete http method
  const authLogout = async () => {
    try {
      await axios.delete("http://localhost:8080/logout", {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <nav
      className={`bg-gray-800 px-4 py-3 flex items-center justify-between transition-all duration-300
      ${isSidebarOpen ? "ml-64" : "ml-0"} `}
    >
      {/* Left Side: Back Button & Title */}
      <div className="flex items-center text-xl text-white">
        {/* Mobile Sidebar Toggle Button */}
        {/* <button onClick={toggleSidebar} className="lg:hidden text-white mr-4">
          <IoMenu size={24} />
        </button> */}

        {/* Back Button */}
        <IoArrowBack className="cursor-pointer" onClick={handleBack} />
        <span className="font-semibold ml-4">{`${isTitle}`}</span>
      </div>

      {/* Right Side: Optional Actions */}
      <div className="flex items-center gap-x-5">
        <button className="btn btn-error" onClick={authLogout}>
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
