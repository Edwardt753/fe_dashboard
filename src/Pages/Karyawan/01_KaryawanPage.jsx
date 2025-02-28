import React, { useEffect, useState } from "react";
import Navbar from "../../components/isNavbar";
import Sidebar from "../../components/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../lib/UseAuth";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const KaryawanPage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token, axiosJWT } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/karyawan`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployeeData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await axiosJWT.delete(`${API_BASE_URL}/karyawan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        fetchData();
      } else {
        console.error("Failed to delete the employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    if (!employeeData.length || location.state?.dataUpdated) {
      fetchData();
    }
  }, [location.state?.dataUpdated]);

  return (
    <div className="flex h-screen">
      {/* Sidebar with Mobile Toggle */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0 lg:ml-64"
        }`}
      >
        <Navbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isTitle="Halaman Karyawan"
        />

        {/* Content Container */}
        <div className="p-4 overflow-x-auto shadow-md sm:rounded-lg">
          <button className="btn mt-3 mb-3" onClick={() => navigate("/add")}>
            Tambahkan Karyawan
          </button>

          {/* Table */}
          <table className="w-full max-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="p-4">Id</th>
                <th className="px-2 py-3">Nama Karyawan</th>
                <th className="px-2 py-3">Jenis Kelamin</th>
                <th className="px-2 py-3">Tingkat Gaji</th>
                <th className="px-2 py-3">Created At</th>
                <th className="pl-12 py-3">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {employeeData.length > 0 ? (
                employeeData.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">{index + 1}</td>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {employee.fullname}
                    </th>
                    <td className="px-6 py-4">{employee.gender}</td>
                    <td className="px-8 py-4">{employee.tingkat_gaji}</td>
                    <td className="px-2 py-4">
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </td>
                    <td className="flex items-center pl-8 py-4">
                      <button
                        onClick={() => navigate(`/edit/${employee.id}`)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3"
                        onClick={() => handleRemove(employee.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Tidak ada data karyawan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KaryawanPage;
