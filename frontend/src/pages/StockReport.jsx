import { useEffect, useState } from "react";
import api from "../api";

function StockReport() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const res =await api.get(
        "/api/reports/stock"
      );

      setStocks(res.data);
      setFilteredStocks(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load Stock Report");
    }
  };

  useEffect(() => {
    const filtered = stocks.filter((item) =>
      item.item_name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredStocks(filtered);
  }, [search, stocks]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-green-500 text-white p-5 rounded-lg shadow mb-6">
        <h1 className="text-3xl font-bold">
          Stock Report
        </h1>

        <p className="text-sm mt-1">
          View Current Stock Availability
        </p>
      </div>

      {/* Search + Print */}
      <div className="flex justify-between items-center mb-5">

        <input
          type="text"
          placeholder="Search Item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 w-80"
        />

        <button
          onClick={() => window.print()}
          className="bg-green-500 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Print Report
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-500 text-white">

            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Item Name</th>
              <th className="p-3">Available Qty</th>
              <th className="p-3">Price</th>
              <th className="p-3">Unit</th>
              <th className="p-3">Stock Status</th>
            </tr>

          </thead>

          <tbody>

            {filteredStocks.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No Stock Available
                </td>
              </tr>

            ) : (

              filteredStocks.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-100"
                >

                  <td className="p-3">{item.id}</td>

                  <td className="p-3 font-medium">
                    {item.item_name}
                  </td>

                  <td className="p-3">
                    {item.quantity}
                  </td>

                  <td className="p-3">
                    ₹ {item.price}
                  </td>

                  <td className="p-3">
                    {item.unit}
                  </td>

                  <td className="p-3">
                    {item.quantity > 10 ? (
                      <span className="bg-green-100 text-green-500 px-3 py-1 rounded-full text-sm">
                        In Stock
                      </span>
                    ) : item.quantity > 0 ? (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Low Stock
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Out of Stock
                      </span>
                    )}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex justify-between mt-5">

        <h3 className="font-semibold">
          Total Items : {filteredStocks.length}
        </h3>

        <h3 className="font-semibold">
          Smart ERP System
        </h3>

      </div>

    </div>
  );
}

export default StockReport;