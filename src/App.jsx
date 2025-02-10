import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Karyawan/01_KaryawanPage";
import GajianPage from "./Pages/Gajian/01_Gajian";
import AddKaryawanPage from "./Pages/Karyawan/02_AddKaryawan";
import EditKaryawanPage from "./Pages/Karyawan/03_EditKaryawan";
import GajianDetails from "./Pages/Gajian/02_GajianDetails";
import Kategory_List from "./Pages/Kategori/01_Kategory_List";
import LoginPage from "./Pages/Auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gajian" element={<GajianPage />} />
        <Route path="/add" element={<AddKaryawanPage />} />
        <Route path="/edit/:id" element={<EditKaryawanPage />} />
        <Route path="/details/:id" element={<GajianDetails />} />
        <Route path="/kategori" element={<Kategory_List />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
