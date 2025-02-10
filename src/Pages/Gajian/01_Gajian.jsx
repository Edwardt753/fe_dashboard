import React, { useEffect, useState } from "react";
import Navbar from "../../components/isNavbar";
import Sidebar from "../../components/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import Dialog from "../../components/Dialog";
import useAuth from "../../lib/UseAuth";
const API_BASE_URL = import.meta.env.VITE_API_LOCAL_URL;

const GajianPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [gajiData, setGajiData] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { token, axiosJWT } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/master/gaji`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setGajiData(response.data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRemoveGaji = async (id) => {
    try {
      const response = await axiosJWT.put(
        `${API_BASE_URL}/master/gaji/delete/${id}`
      );
      if (response.status === 200) {
        fetchData();
        alert(`${response.data.message}`);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleAddGaji = async () => {
    if (!selectedDate) {
      setAlertMessage("Pilih Data Tanggal Terlebih Dahulu!");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
      return;
    }

    try {
      const response = await axiosJWT.post(
        `${API_BASE_URL}/master/gaji/add`,
        { date: selectedDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        fetchData();
        setDialogOpen(false); // Close dialog after successful submission
      }
    } catch (error) {
      if (error.response) {
        setAlertMessage(error.response.data.message || "Terjadi kesalahan.");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
      } else {
        console.error("Error adding data:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.state?.dataUpdated]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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
        {/* Navbar */}
        <Navbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isTitle="Halaman Gaji"
        />
        <div className="p-4 overflow-x-auto shadow-md sm:rounded-lg">
          {/* Custom Alert */}
          {alertVisible && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{alertMessage}</span>
            </div>
          )}

          <button className="btn mt-3 mb-3" onClick={() => setDialogOpen(true)}>
            Buat Data Baru
          </button>
          {/* conditional rendering */}
          {isDialogOpen && (
            <Dialog
              isOpen={isDialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Pilih Tanggal"
              onSubmit={handleAddGaji}
            >
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </Dialog>
          )}
          {/* Table */}
          <table className="w-full max-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Gajian
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Gajian
                </th>
                <th scope="col" className="px-12 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {gajiData.map((gaji, index) => (
                <tr
                  key={gaji.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {new Date(gaji.tanggal_gajian).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {gaji.total_gaji || "Belum dihitung"}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => navigate(`/details/${gaji.id}`)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    >
                      Details
                    </a>
                    <a
                      onClick={() => handleRemoveGaji(gaji.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4 cursor-pointer"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GajianPage;
