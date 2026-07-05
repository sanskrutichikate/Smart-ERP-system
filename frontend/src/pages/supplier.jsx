import { useState, useEffect } from "react";
import api from "../api";

function Supplier() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gstNumber: ""
  });

  const [suppliers, setSuppliers] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

 const fetchSuppliers = async () => {
  try {
    const res = await api.get("/api/supplier");
    setSuppliers(res.data);
  } catch (error) {
    console.error(error);
  }
};
  const addSupplier = async () => {
    await api.post(
      "/api/supplier/add",
      form
    );

    setForm({
      name: "",
      phone: "",
      email: "",
      address: "",
      gstNumber: ""
    });

    fetchSuppliers();
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Supplier Ledger
      </h1>

      <input
        name="name"
        placeholder="Supplier Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="gstNumber"
        placeholder="GST Number"
        value={form.gstNumber}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={addSupplier}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Supplier
      </button>

      <div className="mt-8">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="p-4 border mb-3">
            <h3>{supplier.name}</h3>
            <p>{supplier.phone}</p>
            <p>{supplier.email}</p>
            <p>{supplier.gst_number}</p>
            <p>{supplier.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Supplier;