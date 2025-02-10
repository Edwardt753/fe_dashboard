import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 fixed h-full px-4 py-2">
      <div className="my-2 mb-4">
        <h1 className="text-2xl text-white font-bold">Dashboard Edward</h1>
      </div>
      {/* horizontal line */}
      <hr />
      <ul className="mt-3 text-white font-bold">
        <Link to="/">
          <li className="mb-4 rounded hover:shadow hover:bg-blue-500 py-2">
            <a className="px-3">
              <MdManageAccounts className="inline-block w-6 h-6 mr-2 -mt-2"></MdManageAccounts>
              Manage Karyawan
            </a>
          </li>
        </Link>
        <Link to="/gajian">
          <li className="mb-4 rounded hover:shadow hover:bg-blue-500 py-2">
            <a className="px-3">
              <FaMoneyBillWaveAlt className="inline-block w-6 h-6 mr-2 -mt-2"></FaMoneyBillWaveAlt>
              Gajian
            </a>
          </li>
        </Link>
        <Link to="/kategori">
          <li className="mb-4 rounded hover:shadow hover:bg-blue-500 py-2">
            <a href="" className="px-3">
              <BiSolidCategory className="inline-block w-6 h-6 mr-2 -mt-2"></BiSolidCategory>
              Kategori Gaji
            </a>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
