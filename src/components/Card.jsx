export const Card = ({
  name,
  harianData,
  gajiPersonal,
  gajiID,
  karyawanID,
  deleteDataGaji,
}) => (
  <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-1/4 m-4">
    <div className="p-6 text-center">
      {/* Display Name */}
      <h4 className="mb-1 text-xl font-semibold text-slate-800">{name}</h4>

      {/* Display Harian Data */}
      <div className="text-base text-slate-600 mt-4 font-light">
        <p>
          <strong>Senin:</strong> {harianData.senin} jam
        </p>
        <p>
          <strong>Selasa:</strong> {harianData.selasa} jam
        </p>
        <p>
          <strong>Rabu:</strong> {harianData.rabu} jam
        </p>
        <p>
          <strong>Kamis:</strong> {harianData.kamis} jam
        </p>
        <p>
          <strong>Jumat:</strong> {harianData.jumat} jam
        </p>
        <p>
          <strong>Sabtu:</strong> {harianData.sabtu} jam
        </p>
        <p>
          <strong>Minggu:</strong> {harianData.minggu} jam
        </p>
      </div>

      {/* Display Gaji Personal */}
      <p className="text-lg font-semibold text-slate-800 mt-4">
        Gaji Personal: Rp {gajiPersonal.toLocaleString()}
      </p>
    </div>

    <div className="flex justify-center p-6 pt-2 gap-7">
      <button
        className="btn btn-error"
        onClick={() => deleteDataGaji(gajiID, karyawanID)}
      >
        Delete
      </button>
    </div>
  </div>
);
