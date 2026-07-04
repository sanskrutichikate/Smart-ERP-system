import { useState, useEffect } from "react";
import axios from "axios";

function Inventory() {
  const [activeTab, setActiveTab] = useState("create");
  const [items, setItems] = useState([]);

  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [item_id, setItemId] = useState("");

  // Fetch items
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/item/items");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Create Item
  const handleCreateItem = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/item/items", {
        item_name,
        quantity,
        price,
        unit
      });

      setItemName("");
      setQuantity("");
      setPrice("");
      setUnit("");

      fetchItems();
      alert("Item created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Stock In
  const handleStockIn = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/stock/in", {
        item_id,
        quantity
      });

      setItemId("");
      setQuantity("");
      fetchItems();

      alert("Stock added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Stock Out
  const handleStockOut = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/stock/out", {
        item_id,
        quantity
      });

      setItemId("");
      setQuantity("");
      fetchItems();

      alert("Stock removed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200">

      {/* Left Menu */}
      <div className="w-1/4 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          Inventory Info
        </h2>

        <ul className="space-y-4">
          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => setActiveTab("create")}
          >
            Create Item
          </li>

          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => setActiveTab("stockin")}
          >
            Stock In
          </li>

          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => setActiveTab("stockout")}
          >
            Stock Out
          </li>

          <li
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => setActiveTab("summary")}
          >
            Stock Summary
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-8">

        {/* Create Item */}
        {activeTab === "create" && (
          <form onSubmit={handleCreateItem} className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Create Stock Item</h1>

            <input
              type="text"
              placeholder="Item Name"
              value={item_name}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Opening Stock"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Rate"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              Save Item
            </button>
          </form>
        )}

        {/* Stock In */}
        {activeTab === "stockin" && (
          <form onSubmit={handleStockIn} className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Stock In</h1>

            <select
              value={item_id}
              onChange={(e) => setItemId(e.target.value)}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.item_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <button className="bg-green-600 text-white px-6 py-2 rounded">
              Add Stock
            </button>
          </form>
        )}

        {/* Stock Out */}
        {activeTab === "stockout" && (
          <form onSubmit={handleStockOut} className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Stock Out</h1>

            <select
              value={item_id}
              onChange={(e) => setItemId(e.target.value)}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.item_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <button className="bg-red-600 text-white px-6 py-2 rounded">
              Remove Stock
            </button>
          </form>
        )}

        {/* Stock Summary */}
        {activeTab === "summary" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Stock Summary</h1>

            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border p-3">Item Name</th>
                  <th className="border p-3">Stock</th>
                  <th className="border p-3">Rate</th>
                  <th className="border p-3">Value</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="text-center bg-white">
                    <td className="border p-3">{item.item_name}</td>
                    <td className="border p-3">{item.quantity}</td>
                    <td className="border p-3">{item.price}</td>
                    <td className="border p-3">
                      {item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Inventory;