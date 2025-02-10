const FloatingBox = ({ gajiList, CalculateGaji, totalGaji }) => (
  <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-6 text-white mt-6">
    <h3 className="font-bold text-lg border-b border-gray-600 pb-2 mb-4">
      List of Gaji Personal
    </h3>
    <ul className="space-y-2">
      {gajiList.length > 0 ? (
        gajiList.map((gaji, index) => (
          <li key={index} className="flex justify-between text-gray-300">
            {/* <span>Employee {index + 1}</span> */}
            <span className="font-semibold">Rp {gaji.toLocaleString()}</span>
          </li>
        ))
      ) : (
        <p className="text-gray-400 text-center">No data available</p>
      )}
    </ul>
    <div className="border-t border-gray-600 mt-4 pt-4 flex justify-between text-xl font-bold">
      <span>Total:</span>
      <span>Rp {totalGaji.toLocaleString()}</span>
    </div>
    <div className="mt-4 flex justify-end">
      <button className="btn btn-warning btn-md px-6" onClick={CalculateGaji}>
        Calculate
      </button>
    </div>
  </div>
);

export default FloatingBox;
