import React from "react";
import { Link } from "react-router-dom";
import { MdManageAccounts, MdMenu, MdClose } from "react-icons/md";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="lg:hidden fixed bottom-8 left-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 p-4 z-40 transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64`}
      >
        {/* Sidebar Header */}
        <div className="my-2 mb-4">
          <h1 className="text-2xl text-white font-bold">Dashboard Edward</h1>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-600" />

        {/* Sidebar Links */}
        <ul className="mt-3 text-white font-bold">
          <li className="mb-4 rounded hover:shadow hover:bg-blue-500 py-2 px-3">
            <Link to="/" className="flex items-center">
              <MdManageAccounts className="w-6 h-6 mr-2" />
              Manage Karyawan
            </Link>
          </li>
          <li className="mb-4 rounded hover:shadow hover:bg-blue-500 py-2 px-3">
            <Link to="/gajian" className="flex items-center">
              <FaMoneyBillWaveAlt className="w-6 h-6 mr-2" />
              Gajian
            </Link>
          </li>
          <li className="mb-4 rounded hover:shadow hover:bg-blue-500 py-2 px-3">
            <Link to="/kategori" className="flex items-center">
              <BiSolidCategory className="w-6 h-6 mr-2" />
              Kategori Gaji
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
