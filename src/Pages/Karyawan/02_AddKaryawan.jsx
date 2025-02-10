import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the hook
import useAuth from "../../lib/UseAuth";
const API_BASE_URL = import.meta.env.VITE_API_LOCAL_URL;

const AddKaryawanPage = () => {
  const [formData, setFormData] = useState({
    nama: "",
    gender: "",
    tingkat_gaji: "",
  });
  const [isKategory, setIsKategory] = useState([]);
  const navigate = useNavigate(); // Initialize the hook
  const { token, axiosJWT } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const fetchKategoriList = async () => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/kategori/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsKategory(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchKategoriList();
    }
  }, [token]); // Run only when token is updated

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosJWT.post(
        `${API_BASE_URL}/karyawan`,
        {
          fullname: formData.nama,
          gender: formData.gender,
          tingkat_gaji: parseInt(formData.tingkat_gaji),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Data submitted successfully!");
        console.log(response.data);

        // Navigate to the home page with state to indicate update
        navigate("/", { state: { dataUpdated: true } });
      } else {
        console.error("Error:", response.data);
        alert("Failed to submit data!");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred while submitting data!");
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto my-10" onSubmit={handleSubmit}>
        {/* Nama */}
        <label
          htmlFor="nama"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Masukan Nama
        </label>
        <input
          type="text"
          id="nama"
          value={formData.nama}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
          placeholder="John Doe"
        />

        {/* Gender */}
        <label
          htmlFor="gender"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3"
        >
          Pilih Gender
        </label>
        <select
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
        >
          <option value="" disabled selected>
            Pilih
          </option>
          <option value="Pria">Pria</option>
          <option value="Wanita">Wanita</option>
        </select>

        {/* Gaji */}
        <label
          htmlFor="tingkat_gaji"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3"
        >
          Tingkat Gaji
        </label>
        <select
          id="tingkat_gaji"
          value={formData.tingkat_gaji}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
        >
          <option value="" disabled selected>
            Pilih
          </option>
          {isKategory.map((gaji) => (
            <option key={gaji.id} value={gaji.id}>
              {`Rp ${gaji.harga_tingkat.toLocaleString()}`}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn btn-active mt-3 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          onClick={() => navigate("/", { state: { refresh: true } })}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddKaryawanPage;
