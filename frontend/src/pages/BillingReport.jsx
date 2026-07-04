import { useEffect, useState } from "react";
import axios from "axios";

function BillingReport() {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reports/bills"
      );

      setBills(res.data);
      setFilteredBills(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load Billing Report");
    }
  };

  useEffect(() => {
    const filtered = bills.filter((bill) =>
      bill.invoice_no.toLowerCase().includes(search.toLowerCase()) ||
      bill.customer_name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredBills(filtered);
  }, [search, bills]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-purple-500 text-white p-5 rounded-lg shadow mb-6">
        <h1 className="text-3xl font-bold">
          Billing Report
        </h1>

        <p className="text-sm mt-1">
          View all customer invoices
        </p>
      </div>

      <div className="flex justify-between mb-5">

        <input
          type="text"
          placeholder="Search Invoice / Customer..."
          className="border rounded-lg p-2 w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Print Report
        </button>

      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-purple-500 text-white">

            <tr>
              <th className="p-3">Invoice</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">GST</th>
              <th className="p-3">Grand Total</th>
              <th className="p-3">Bill Date</th>
            </tr>

          </thead>

          <tbody>

            {filteredBills.length === 0 ? (

              <tr>
                <td colSpan="6" className="text-center p-6">
                  No Bills Found
                </td>
              </tr>

            ) : (

              filteredBills.map((bill) => (

                <tr
                  key={bill.id}
                  className="border-b hover:bg-gray-100"
                >

                  <td className="p-3">{bill.invoice_no}</td>

                  <td className="p-3">{bill.customer_name}</td>

                  <td className="p-3">₹ {bill.subtotal}</td>

                  <td className="p-3">₹ {bill.gst}</td>

                  <td className="p-3 font-semibold text-green-700">
                    ₹ {bill.grand_total}
                  </td>

                  <td className="p-3">{bill.bill_date}</td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <div className="mt-5 text-right font-semibold">

        Total Bills : {filteredBills.length}

      </div>

    </div>
  );
}

export default BillingReport;