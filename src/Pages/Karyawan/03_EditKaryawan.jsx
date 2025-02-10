import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../lib/UseAuth";
const API_BASE_URL = import.meta.env.VITE_API_LOCAL_URL;

const EditKaryawanPage = () => {
  const [formData, setFormData] = useState({
    nama: "",
    gender: "",
    tingkat_gaji: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isKategory, setIsKategory] = useState([]);
  const { token, axiosJWT } = useAuth();

  const fetchData = async (id) => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/karyawan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;

      setFormData({
        nama: data.fullname || "",
        gender: data.gender || "",
        tingkat_gaji: data.tingkat_gaji?.toString() || "", // Convert to string for dropdown compatibility
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch existing data for the selected item
  useEffect(() => {
    if (token && id) {
      fetchKategoriList();
      fetchData(id); // Pass ID explicitly
    }
  }, [token, id]);

  // Handle form field changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosJWT.put(
        `${API_BASE_URL}/karyawan/${id}`,
        {
          fullname: formData.nama,
          gender: formData.gender,
          tingkat_gaji: parseInt(formData.tingkat_gaji),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure the request is authenticated
          },
        }
      );

      alert("Data updated successfully!");
      navigate("/", { state: { dataUpdated: true } }); // Navigate back
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to update data!");
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
          <option value="">Pilih</option>
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
          <option value="">Pilih</option>
          {isKategory.map((gaji) => (
            <option key={gaji.id} value={gaji.id}>
              {`Rp ${gaji.harga_tingkat.toLocaleString()}`}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn btn-active mt-3 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default EditKaryawanPage;
