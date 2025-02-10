import React, { useEffect, useState } from "react";
import Navbar from "../../components/isNavbar";
import Sidebar from "../../components/Sidebar";
import Dialog from "../../components/Dialog";
import useAuth from "../../lib/UseAuth";

const Kategory_List = () => {
  const [isData, setData] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { token, axiosJWT } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axiosJWT.get(
        "https://api2.edwardver753.my.id/kategori/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (kategori_id) => {
    try {
      const response = await axiosJWT.delete(
        `https://api2.edwardver753.my.id/kategori/delete/${kategori_id}`,
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
      ? `https://api2.edwardver753.my.id/kategori/edit/${selectedId}`
      : "https://api2.edwardver753.my.id/kategori/add";
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
      <Sidebar className="w-1/4 min-w-[200px]" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4 shadow-md sm:rounded-lg ml-64">
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

          <div className="w-full max-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <table className="w-full max-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nomor
                  </th>
                  <th scope="col" className="pl-80 py-3">
                    Nominal Tingkat Gaji
                  </th>
                  <th scope="col" className="px-12 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isData.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4 pl-8">{index + 1}</td>
                    <th className="pl-[360px] py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {data.harga_tingkat}
                    </th>
                    <td className="flex items-center pl-8 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          setSelectedId(data.id); // Store ID for editing
                          setSelectedNumber(data.harga_tingkat); // Load existing value
                          setEdit(true); // Set edit mode
                          setDialogOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
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
    </div>
  );
};

export default Kategory_List;
