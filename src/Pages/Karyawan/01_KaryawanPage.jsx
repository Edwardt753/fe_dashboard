import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/isNavbar";
import Sidebar from "../../components/Sidebar";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const KaryawanPage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate(); // Initialize the hook
  const location = useLocation(); // Access the state
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        "https://api2.edwardver753.my.id/refreshtoken",
        {
          withCredentials: true,
        }
      );
      setToken(response.data.token);
      const decoded = jwtDecode(response.data.token);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          "https://api2.edwardver753.my.id/refreshtoken",
          {
            withCredentials: true,
          }
        );
        config.headers.Authorization = `Bearer ${response.data.token}`;
        setToken(response.data.token);
        const decoded = jwtDecode(response.data.token);

        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const fetchData = async () => {
    try {
      const response = await axiosJWT.get(
        "https://api2.edwardver753.my.id/karyawan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Replace with your API URL
      setEmployeeData(response.data.data); // Assuming the API response structure
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await axiosJWT.delete(
        `https://api2.edwardver753.my.id/karyawan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        fetchData();
        // Re-fetch data after successful deletion
      } else {
        console.error("Failed to delete the employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    refreshToken();
    // Fetch data initially or when dataUpdated is true
    if (!employeeData.length || location.state?.dataUpdated) {
      fetchData();
    }
  }, [location.state?.dataUpdated]); // Re-fetch when dataUpdated changes

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar className="w-1/4 min-w-[200px]" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Add Button and Table */}
        <div className="p-4 overflow-x-auto shadow-md sm:rounded-lg ml-64">
          <button
            className="btn mt-3 mb-3"
            onClick={() => navigate("/add")} // Navigate to /add page
          >
            Tambahkan Karyawan
          </button>

          {/* Table */}
          <table className="w-full max-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  Id
                </th>
                <th scope="col" className="px-2 py-3">
                  Nama Karyawan
                </th>
                <th scope="col" className="px-2 py-3">
                  Jenis Kelamin
                </th>
                <th scope="col" className="px-2 py-3">
                  Tingkat Gaji
                </th>
                <th scope="col" className="px-2 py-3">
                  Created At
                </th>
                <th scope="col" className="pl-12 py-3">
                  Action
                </th>
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
                    <td className="w-4 p-4">{index + 1}</td>{" "}
                    {/* Incrementing number */}
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
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
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
