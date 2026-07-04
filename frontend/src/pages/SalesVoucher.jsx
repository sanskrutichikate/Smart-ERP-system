import { useState, useEffect } from "react";
import axios from "axios";

function SalesVoucher() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);

  const [voucherNo, setVoucherNo] = useState("SV001");
  const [customerId, setCustomerId] = useState("");
  const [itemId, setItemId] = useState("");
  const [qty, setQty] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [saleDate, setSaleDate] = useState("");

  // Fetch customers and items
  useEffect(() => {
    fetchCustomers();
    fetchItems();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Auto set price when item selected
  const handleItemChange = (e) => {
    const selectedItemId = e.target.value;
    setItemId(selectedItemId);

    const selectedItem = items.find(
      (item) => item.id === parseInt(selectedItemId)
    );

    if (selectedItem) {
      setRate(selectedItem.price);
    }
  };

  // Auto calculate amount
  useEffect(() => {
    if (qty && rate) {
      setAmount(qty * rate);
    }
  }, [qty, rate]);

  // Save Sales Voucher
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/sales/add", {
        voucher_no: voucherNo,
        customer_id: customerId,
        item_id: itemId,
        qty,
        rate,
        amount,
        sale_date: saleDate,
      });

      alert("Sales Voucher Saved Successfully");

      // Reset form
      setCustomerId("");
      setItemId("");
      setQty("");
      setRate("");
      setAmount("");
      setSaleDate("");

    } catch (error) {
      console.log(error);
      alert("Error saving sales voucher");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <div className="max-w-4xl mx-auto border-4 border-blue-700 bg-white shadow-lg">

        {/* Header */}
        <div className="bg-blue-800 text-white p-4 text-center text-2xl font-bold">
          Sales Voucher
        </div>

        {/* Voucher Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Voucher Details */}
          <div className="grid grid-cols-2 gap-6 border-b pb-4">
            <div>
              <label className="font-semibold">Voucher No</label>
              <input
                type="text"
                value={voucherNo}
                readOnly
                className="w-full border p-2 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold">Date</label>
              <input
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="w-full border p-2 mt-1"
                required
              />
            </div>
          </div>

          {/* Customer */}
          <div>
            <label className="font-semibold">Customer Name</label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full border p-2 mt-1"
              required
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Item Details */}
          <div className="border p-4 bg-gray-50">
            <h2 className="font-bold text-lg mb-4 border-b pb-2">
              Item Details
            </h2>

            <div className="grid grid-cols-4 gap-4">

              <div>
                <label>Item</label>
                <select
                  value={itemId}
                  onChange={handleItemChange}
                  className="w-full border p-2 mt-1"
                  required
                >
                  <option value="">Select Item</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.item_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Qty</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full border p-2 mt-1"
                  required
                />
              </div>

              <div>
                <label>Rate</label>
                <input
                  type="number"
                  value={rate}
                  readOnly
                  className="w-full border p-2 mt-1 bg-gray-100"
                />
              </div>

              <div>
                <label>Amount</label>
                <input
                  type="number"
                  value={amount}
                  readOnly
                  className="w-full border p-2 mt-1 bg-gray-100"
                />
              </div>

            </div>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-800 text-white px-8 py-3 rounded hover:bg-blue-700"
            >
              Save Voucher
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SalesVoucher;