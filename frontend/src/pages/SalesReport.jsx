import { useEffect, useState } from "react";
import axios from "axios";

function SalesReport() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reports/sales"
      );

      setSales(res.data);
      setFilteredSales(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load Sales Report");
    }
  };

  useEffect(() => {
    const result = sales.filter((sale) =>
      sale.voucher_no.toLowerCase().includes(search.toLowerCase()) ||
      sale.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      sale.item_name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredSales(result);
  }, [search, sales]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-blue-700 text-white p-5 rounded-lg shadow mb-6">
        <h1 className="text-3xl font-bold">
          Sales Report
        </h1>

        <p className="text-sm mt-1">
          View all sales transactions
        </p>
      </div>

      {/* Search + Print */}
      <div className="flex justify-between items-center mb-5">

        <input
          type="text"
          placeholder="Search by Voucher, Customer or Item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 w-96"
        />

        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Print Report
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3">Voucher No</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Item</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Rate</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>

          </thead>

          <tbody>

            {filteredSales.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500"
                >
                  No Sales Found
                </td>
              </tr>

            ) : (

              filteredSales.map((sale) => (

                <tr
                  key={sale.id}
                  className="border-b hover:bg-gray-100"
                >

                  <td className="p-3">{sale.voucher_no}</td>

                  <td className="p-3">
                    {sale.customer_name}
                  </td>

                  <td className="p-3">
                    {sale.item_name}
                  </td>

                  <td className="p-3">
                    {sale.qty}
                  </td>

                  <td className="p-3">
                    ₹ {sale.rate}
                  </td>

                  <td className="p-3 font-semibold">
                    ₹ {sale.amount}
                  </td>

                  <td className="p-3">
                    {sale.sale_date}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Total Records */}

      <div className="mt-5 text-right font-semibold">

        Total Records : {filteredSales.length}

      </div>

    </div>
  );
}

export default SalesReport;