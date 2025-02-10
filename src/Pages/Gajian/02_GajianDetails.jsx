import { useParams, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FloatingBox from "../../components/FloatingBox";
import { Card } from "../../components/Card";
import Navbar from "../../components/isNavbar";
import Sidebar from "../../components/Sidebar";
import useAuth from "../../lib/UseAuth";

const GajianDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const [cardsData, setCardsData] = useState([]);
  const [listKaryawan, setListKaryawan] = useState([]);
  const [selectedKaryawan, SetSelectedKaryawan] = useState("");
  const [totalGaji, setTotalGaji] = useState([]);
  const { token, axiosJWT } = useAuth();

  const CalculateGaji = async () => {
    try {
      const response = await axiosJWT.post(
        `https://api2.edwardver753.my.id/calculate/${id}`,
        {
          gajiList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setTotalGaji(response.data.data);
        alert("Data submitted successfully!");
      } else {
        alert("Failed to submit data!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data!");
    }
  };

  const deleteDataGaji = async (id, k_id) => {
    try {
      const response = await axiosJWT.delete(
        `https://api2.edwardver753.my.id/gaji/delete/${id}/${k_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        fetchData();
      } else {
        console.error("Failed to delete data:", response.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const fetchKaryawan = async () => {
    try {
      const response = await axiosJWT.get(
        "https://api2.edwardver753.my.id/karyawan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Replace with your API URL
      setListKaryawan(response.data.data); // Assuming the API response structure
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosJWT.get(
        `https://api2.edwardver753.my.id/gaji/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCardsData(response.data.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchKaryawan();
    fetchData();
  }, [location.state?.dataUpdated]);

  const gajiList = cardsData.map((card) => card.gaji_personal);

  const HandleFormSubmmit = async (e, id, fetchData) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.post(
        `https://api2.edwardver753.my.id/gaji/${id}`,
        //
        {
          karyawan_id: parseInt(e.target.karyawan_id.value, 10),
          harian_data: {
            minggu: parseFloat(e.target.Minggu.value),
            senin: parseFloat(e.target.Senin.value),
            selasa: parseFloat(e.target.Selasa.value),
            rabu: parseFloat(e.target.Rabu.value),
            kamis: parseFloat(e.target.Kamis.value),
            jumat: parseFloat(e.target.Jumat.value),
            sabtu: parseFloat(e.target.Sabtu.value),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Data berhasil ditambahkan!");
        document.getElementById("my_modal_1").close();
        fetchData(); // Refresh data after submission
      } else {
        alert(`${response.message}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Gagal mengirim data. Silakan coba lagi.", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar className="w-1/4 min-w-[200px]" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4 overflow-x-auto ml-64">
          <button
            className="btn btn-info btn-md w-28 mt-4 ml-4"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Tambah Karyawan
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Tambah Karyawan</h3>
              <form onSubmit={(e) => HandleFormSubmmit(e, id, fetchData)}>
                <div className="py-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Karyawan ID:
                  </label>
                  <select
                    name="karyawan_id"
                    className="input input-bordered w-full"
                    value={selectedKaryawan}
                    onChange={(event) =>
                      SetSelectedKaryawan(event.target.value)
                    } // Inline the function
                    required
                  >
                    <option value="" disabled>
                      Select Karyawan
                    </option>
                    {listKaryawan.map((karyawan) => (
                      <option key={karyawan.id} value={karyawan.id}>
                        {karyawan.fullname}
                      </option>
                    ))}
                  </select>
                  {[
                    "Minggu",
                    "Senin",
                    "Selasa",
                    "Rabu",
                    "Kamis",
                    "Jumat",
                    "Sabtu",
                  ].map((day) => (
                    <div key={day} className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {day}
                      </label>
                      <input
                        type="number"
                        name={day}
                        step="0.5"
                        min="0"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-action">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
          <div className="flex flex-wrap gap-4">
            {cardsData.map((card, index) => (
              <Card
                key={index + 1}
                name={
                  card.karyawan ? card.karyawan.fullname : "Unknown Employee"
                }
                harianData={card.harian_data}
                gajiPersonal={card.gaji_personal}
                gajiID={id}
                karyawanID={card.karyawan_id}
                deleteDataGaji={deleteDataGaji}
              />
            ))}
          </div>
        </div>
        {/* Floating Box */}
        <FloatingBox
          gajiList={gajiList}
          CalculateGaji={CalculateGaji}
          totalGaji={totalGaji}
        />
      </div>
    </div>
  );
};

export default GajianDetails;
