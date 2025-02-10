const FloatingBox = ({ gajiList, CalculateGaji, totalGaji }) => (
  <div className="fixed bottom-4 left-4 bg-teal-400 border border-slate-600 shadow-lg rounded-lg p-4 text-slate-800">
    <p className="font-semibold text-lg mb-2">List of Gaji Personal</p>
    <ul className="list-disc pl-5">
      {gajiList.map((gaji, index) => (
        <div key={index}> Rp {gaji.toLocaleString()}</div>
      ))}
    </ul>
    <div>Total : {totalGaji}</div>
    <div className="ml-12">
      <button className="btn btn-warning btn-sm" onClick={CalculateGaji}>
        Calculate
      </button>
    </div>
  </div>
);

export default FloatingBox;
