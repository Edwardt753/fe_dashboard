export const Card = ({
  name,
  harianData,
  gajiPersonal,
  gajiID,
  karyawanID,
  deleteDataGaji,
}) => (
  <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg p-4 max-w-xs w-full">
    <div className="p-4 text-center">
      {/* Display Name */}
      <h4 className="mb-1 text-xl font-semibold text-slate-800">{name}</h4>

      {/* Display Harian Data */}
      <div className="text-base text-slate-600 mt-4 font-light">
        {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map(
          (day) => (
            <p key={day}>
              <strong>{day}:</strong> {harianData[day.toLowerCase()]}
            </p>
          )
        )}
        {harianData.kasbon ? (
          <p key="kasbon">
            <strong>Kasbon :</strong> -
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(Math.abs(harianData.kasbon))}
          </p>
        ) : null}
      </div>

      {/* Display Gaji Personal */}
      <p className="text-lg font-semibold text-slate-800 mt-4">
        Gaji Personal: Rp {gajiPersonal.toLocaleString()}
      </p>
    </div>

    <div className="flex justify-center p-4 pt-2">
      <button
        className="btn btn-error"
        onClick={() => deleteDataGaji(gajiID, karyawanID)}
      >
        Delete
      </button>
    </div>
  </div>
);
