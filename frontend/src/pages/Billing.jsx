import { useState, useEffect } from "react";
import axios from "axios";

function Billing() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);

  const [invoiceNo, setInvoiceNo] = useState("INV001");
  const [customerId, setCustomerId] = useState("");
  const [billDate, setBillDate] = useState("");
  const [gst, setGst] = useState(18);

  const [billItems, setBillItems] = useState([
    {
      item_id: "",
      qty: "",
      rate: "",
      amount: ""
    }
  ]);

  // Fetch customers
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
      const res = await axios.get("http://localhost:5000/api/item");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...billItems];

    updatedItems[index][field] = value;

    // Auto fill rate
    if (field === "item_id") {
      const selectedItem = items.find(
        (item) => item.id === parseInt(value)
      );

      if (selectedItem) {
        updatedItems[index].rate = selectedItem.price;
      }
    }

    // Auto calculate amount
    updatedItems[index].amount =
      updatedItems[index].qty * updatedItems[index].rate;

    setBillItems(updatedItems);
  };

  // Add new row
  const addItemRow = () => {
    setBillItems([
      ...billItems,
      {
        item_id: "",
        qty: "",
        rate: "",
        amount: ""
      }
    ]);
  };

  // Calculate subtotal
  const subtotal = billItems.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );

  const gstAmount = (subtotal * gst) / 100;
  const grandTotal = subtotal + gstAmount;

  // Save bill
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/billing/add", {
        invoice_no: invoiceNo,
        customer_id: customerId,
        subtotal,
        gst,
        grand_total: grandTotal,
        bill_date: billDate,
        items: billItems
      });

      alert("Bill Saved Successfully");
    } catch (error) {
      console.log(error);
      alert("Error saving bill");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-70 p-6">
      <div className="max-w-6xl mx-auto bg-white border-4 border-blue-500 shadow-lg">

        {/* Header */}
        <div className="bg-blue-500 text-white text-center text-2xl font-bold p-4">
          Billing System
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Bill Header */}
          <div className="grid grid-cols-3 gap-4 border-b pb-4">

            <div>
              <label className="font-semibold">Invoice No</label>
              <input
                type="text"
                value={invoiceNo}
                readOnly
                className="w-full border p-2 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold">Date</label>
              <input
                type="date"
                value={billDate}
                onChange={(e) => setBillDate(e.target.value)}
                className="w-full border p-2 mt-1"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Customer</label>
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

          </div>

          {/* Item Table */}
          <div>
            <h2 className="text-lg font-bold border-b pb-2 mb-4">
              Item Details
            </h2>

            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Rate</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>

              <tbody>
                {billItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      <select
                        value={item.item_id}
                        onChange={(e) =>
                          handleItemChange(index, "item_id", e.target.value)
                        }
                        className="w-full"
                        required
                      >
                        <option value="">Select Item</option>
                        {items.map((itm) => (
                          <option key={itm.id} value={itm.id}>
                            {itm.item_name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          handleItemChange(index, "qty", e.target.value)
                        }
                        className="w-full"
                        required
                      />
                    </td>

                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.rate}
                        readOnly
                        className="w-full bg-gray-100"
                      />
                    </td>

                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.amount}
                        readOnly
                        className="w-full bg-gray-100"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add Item Button */}
            <button
              type="button"
              onClick={addItemRow}
              className="mt-4 bg-green-400 text-white px-4 py-2 rounded"
            >
              + Add Item
            </button>
          </div>

          {/* Totals */}
          <div className="w-1/3 ml-auto border p-4 bg-gray-50 space-y-3">

            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>GST %:</span>
              <input
                type="number"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                className="border p-1 w-20"
              />
            </div>

            <div className="flex justify-between">
              <span>GST Amount:</span>
              <span>₹ {gstAmount}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Grand Total:</span>
              <span>₹ {grandTotal}</span>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">

            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-3 rounded"
            >
              Save Bill
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="bg-gray-500 text-white px-6 py-3 rounded"
            >
              Print Bill
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default Billing;