import { useState, useEffect } from "react";
import api from "../api";
function Item() {
  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    price: "",
    unit: ""
  });

  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const fetchItems = async () => {
      const res = await api.get("/api/item");
    setItems(res.data);
  };

  const addItem = async () => {
    await api.post(
      "/api/item/add",
      form
    );

    setForm({
      itemName: "",
      quantity: "",
      price: "",
      unit: ""
    });

    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Item Ledger
      </h1>

      <input
        name="itemName"
        placeholder="Item Name"
        value={form.itemName}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="unit"
        placeholder="Unit (KG/PCS/LTR)"
        value={form.unit}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={addItem}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>

      <div className="mt-8">
        {items.map((item) => (
          <div key={item.id} className="p-4 border mb-3">
            <h3>{item.item_name}</h3>
            <p>Stock: {item.quantity}</p>
            <p>Price: ₹{item.price}</p>
            <p>Unit: {item.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Item;