import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the hook
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddKaryawanPage = () => {
  const [formData, setFormData] = useState({
    nama: "",
    gender: "",
    tingkat_gaji: "",
  });
  const [isKategory, setIsKategory] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate(); // Initialize the hook

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const fetchKategoriList = async () => {
    try {
      const response = await axiosJWT.get(
        "https://api2.edwardver753.my.id/kategori/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsKategory(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []); // Run only once on mount

  useEffect(() => {
    if (token) {
      fetchKategoriList();
    }
  }, [token]); // Run only when token is updated

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosJWT.post(
        "https://api2.edwardver753.my.id/karyawan",
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
