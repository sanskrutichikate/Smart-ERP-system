import { useState, useEffect } from "react";
import api from "../api";

function Company() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
  });

  const [companies, setCompanies] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch companies
  const fetchCompanies = async () => {
    try {
         const res = await api.get("/api/company");
      console.log(res.data);
      setCompanies(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  // Add company
  const addCompany = async () => {
    try {
      await api.post(
        "/api/company/add",
        form
      );

      alert("Company added successfully");

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
      });

      // Refresh company list
      fetchCompanies();
    } catch (error) {
      console.log("Add Error:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Company Management
      </h1>

      {/* Add Company Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          Add New Company
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Company Email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number"
            value={form.gstNumber}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
        </div>

        <textarea
          name="address"
          placeholder="Company Address"
          value={form.address}
          onChange={handleChange}
          className="w-full mt-4 border p-3 rounded-lg"
          rows="4"
        ></textarea>

        <button
          onClick={addCompany}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Add Company
        </button>
      </div>

      {/* Company List */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Company List
        </h2>

        {companies.length === 0 ? (
          <p>No companies added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white shadow-md rounded-xl p-5"
              >
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {company.name}
                </h3>

                <p>
                  <strong>Email:</strong> {company.email}
                </p>

                <p>
                  <strong>Phone:</strong> {company.phone}
                </p>

                <p>
                  <strong>Address:</strong> {company.address}
                </p>

                <p>
                  <strong>GST:</strong> {company.gst_number}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Company;