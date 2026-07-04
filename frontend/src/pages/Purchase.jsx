import { useState, useEffect } from "react";
import axios from "axios";

function Purchase() {
    const [formData, setFormData] = useState({
        supplier_name: "",
        invoice_no: "",
        item_name: "",
        quantity: "",
        rate: "",
        amount: "",
        payment_type: "Cash",
        date: "",
    });

    useEffect(() => {
        const qty = Number(formData.quantity) || 0;
        const rate = Number(formData.rate) || 0;

        setFormData((prev) => ({
            ...prev,
            amount: qty * rate,
        }));
    }, [formData.quantity, formData.rate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting:", formData);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/purchase/add",
                formData
            );

            console.log(res.data);
            alert("Purchase Voucher Saved");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-yello-50 flex justify-center items-center p-6">
            <div className="w-full max-w-5xl bg-white shadow-lg border-4 ">

                {/* Header */}
                <div className="bg-blue-700 text-white p-4 text-center text-2xl font-bold border-b-4 ">
                    Purchase Voucher
                </div>

                <form onSubmit={handleSubmit} className="p-6">

                    {/* Top Section */}
                    <div className="grid grid-cols-2 gap-6 border-b pb-6">

                        <div>
                            <label className="font-bold block mb-2">Supplier Name</label>
                            <input
                                type="text"
                                name="supplier_name"
                                value={formData.supplier_name}
                                onChange={handleChange}
                                className="w-full border p-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border p-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Invoice No</label>
                            <input
                                type="text"
                                name="invoice_no"
                                value={formData.invoice_no}
                                onChange={handleChange}
                                className="w-full border p-2"
                                required
                            />
                        </div>
                    </div>

                    {/* Item Section */}
                    <div className="mt-6">
                        <h2 className="bg-yellow-400 text-black font-bold p-2">
                            Stock Item Allocation
                        </h2>

                        <div className="grid grid-cols-4 gap-4 mt-4">

                            <div>
                                <label className="font-bold">Item Name</label>
                                <input
                                    type="text"
                                    name="item_name"
                                    value={formData.item_name}
                                    onChange={handleChange}
                                    className="w-full border p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-bold">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="w-full border p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-bold">Rate</label>
                                <input
                                    type="number"
                                    name="rate"
                                    value={formData.rate}
                                    onChange={handleChange}
                                    className="w-full border p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-bold">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    readOnly
                                    className="w-full border p-2 bg-gray-100"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="mt-8 border-t pt-6 grid grid-cols-2 gap-6">

                        <div>
                            <label className="font-bold block mb-2">Payment Type</label>
                            <select
                                name="payment_type"
                                value={formData.payment_type}
                                onChange={handleChange}
                                className="w-full border p-2"
                            >
                                <option>Cash</option>
                                <option>Credit</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Total Amount</label>
                            <input
                                type="number"
                                value={formData.amount}
                                readOnly
                                className="w-full border p-2 bg-yellow-100 font-bold"
                            />
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            type="reset"
                            className="bg-red-500 text-white px-6 py-2 font-bold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 font-bold"
                        >
                            Save Voucher
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Purchase;