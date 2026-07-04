import { useEffect, useState } from "react";
import axios from "axios";

function PurchaseReport() {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reports/purchase"
      );

      setPurchases(res.data);
      setFilteredPurchases(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load Purchase Report");
    }
  };

  useEffect(() => {
    const result = purchases.filter((purchase) =>
      purchase.supplier_name.toLowerCase().includes(search.toLowerCase()) ||
      purchase.item_name.toLowerCase().includes(search.toLowerCase()) ||
      purchase.invoice_no.toString().includes(search)
    );

    setFilteredPurchases(result);
  }, [search, purchases]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-indigo-700 text-white p-5 rounded-lg shadow mb-6">
        <h1 className="text-3xl font-bold">Purchase Report</h1>
        <p className="text-sm mt-1">View all purchase transactions</p>
      </div>

      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Search Supplier / Item / Invoice..."
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

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3">Invoice</th>
              <th className="p-3">Supplier</th>
              <th className="p-3">Item</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Rate</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredPurchases.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-500">
                  No Purchase Records Found
                </td>
              </tr>
            ) : (
              filteredPurchases.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-3">{purchase.invoice_no}</td>
                  <td className="p-3">{purchase.supplier_name}</td>
                  <td className="p-3">{purchase.item_name}</td>
                  <td className="p-3">{purchase.quantity}</td>
                  <td className="p-3">₹ {purchase.rate}</td>
                  <td className="p-3 font-semibold">₹ {purchase.amount}</td>
                  <td className="p-3">{purchase.payment_type}</td>
                  <td className="p-3">{purchase.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 text-right font-semibold">
        Total Records: {filteredPurchases.length}
      </div>
    </div>
  );
}

export default PurchaseReport;