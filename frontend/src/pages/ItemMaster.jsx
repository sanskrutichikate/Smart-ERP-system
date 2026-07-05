import { useState, useEffect } from "react";
import api from "../api";

function ItemMaster() {
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [items, setItems] = useState([]);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
         const res = await api.get("/api/item/items");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add new item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/item/items", {
        item_name,
        quantity,
        price,
        unit,
      });

      // Clear form
      setItemName("");
      setQuantity("");
      setPrice("");
      setUnit("");

      // Refresh item list
      fetchItems();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Item Master
      </h1>

      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Item Name"
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            placeholder="Unit (pcs/kg)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-400 text-white py-3 rounded hover:bg-blue-700"
          >
            Add Item
          </button>

        </form>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Item List
        </h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3">ID</th>
              <th className="border p-3">Item Name</th>
              <th className="border p-3">Quantity</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Unit</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="text-center hover:bg-gray-100">
                <td className="border p-3">{item.id}</td>
                <td className="border p-3">{item.item_name}</td>
                <td className="border p-3">{item.quantity}</td>
                <td className="border p-3">{item.price}</td>
                <td className="border p-3">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ItemMaster;