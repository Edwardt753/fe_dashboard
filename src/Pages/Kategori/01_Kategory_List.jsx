import React, { useEffect, useState } from "react";
import Navbar from "../../components/isNavbar";
import Sidebar from "../../components/Sidebar";
import Dialog from "../../components/Dialog";
import useAuth from "../../lib/UseAuth";
const API_BASE_URL = import.meta.env.VITE_API_LOCAL_URL;

const Kategory_List = () => {
  const [isData, setData] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { token, axiosJWT } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/kategori/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (kategori_id) => {
    try {
      const response = await axiosJWT.delete(
        `${API_BASE_URL}/kategori/delete/${kategori_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        fetchData();
        alert(`${response.data.message}`);
      } else {
        alert("Failed to submit dataaaa!");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while submitting data!");
    }
  };

  const handleSubmit = async () => {
    const url = isEdit
      ? `${API_BASE_URL}/kategori/edit/${selectedId}`
      : `${API_BASE_URL}/kategori/add`;
    const method = isEdit ? "put" : "post";

    try {
      const response = await axiosJWT({
        method,
        url,
        data: { nominal: Number(selectedNumber) },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(
        response.data.success ? response.data.message : "Failed to submit data!"
      );
      if (response.data.success) fetchData();
    } catch (error) {
      alert("An error occurred while processing data!");
    } finally {
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0 lg:ml-64"
        }`}
      >
        <Navbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isTitle="Halaman Kategori Gaji"
          isToken={token}
        />
        <div className="p-4 overflow-x-auto shadow-md sm:rounded-lg">
          <button
            className="btn mt-3 mb-3"
            onClick={() => {
              setSelectedNumber("");
              setEdit(false);
              setDialogOpen(true);
            }}
          >
            Buat Data Baru
          </button>

          {/* Reusable Dialog */}
          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            title={
              isEdit
                ? "Edit Nominal Tingkat Gaji"
                : "Masukan Nominal Tingkat Gaji"
            }
            onSubmit={handleSubmit}
          >
            <label className="block text-sm font-medium text-gray-700">
              Nominal Gaji:
            </label>
            <input
              type="number"
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(e.target.value)}
              className="input input-bordered w-full my-2"
              required
            />
          </Dialog>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {/* Table Header */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3 text-center md:text-left">
                  Nomor
                </th>
                <th scope="col" className="px-4 py-3 text-center md:text-left">
                  Nominal Tingkat Gaji
                </th>
                <th scope="col" className="px-4 py-3 text-center md:text-left">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {isData.map((data, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 text-center md:text-left">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900 dark:text-white text-center md:text-left">
                    {data.harga_tingkat}
                  </td>
                  <td className="px-4 py-4 flex justify-center md:justify-start gap-3">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setSelectedId(data.id);
                        setSelectedNumber(data.harga_tingkat);
                        setEdit(true);
                        setDialogOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => deleteData(data.id)}
                    >
                      Hapus
                    </button>
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

export default Kategory_List;
