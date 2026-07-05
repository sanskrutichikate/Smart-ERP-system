import { useState, useEffect } from "react";
import api from "../api";

function Customer() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const [customers, setCustomers] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const fetchCustomers = async () => {
      const res = await api.get("/api/customers");
    
    setCustomers(res.data);
  };

  const addCustomer = async () => {
    await api.post(
      "/api/customers/add",
      form
    );

    setForm({
      name: "",
      phone: "",
      email: "",
      address: ""
    });

    fetchCustomers();
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Customer Ledger
      </h1>

      <input
        name="name"
        placeholder="Customer Name"
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

      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={addCustomer}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Customer
      </button>

      <div className="mt-8">
        {customers.map((customer) => (
          <div key={customer.id} className="p-4 border mb-3">
            <h3>{customer.name}</h3>
            <p>{customer.phone}</p>
            <p>{customer.email}</p>
            <p>{customer.address}</p>
            <p>Balance: {customer.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customer;