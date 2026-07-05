import { useNavigate } from "react-router-dom";

function DashboardMenu() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Masters */}
      <div className="border border-gray-200 rounded bg-white">
        <div className="bg-blue-400 text-white text-center font-bold py-2">
          MASTERS
        </div>

        <div
          onClick={() => navigate("/company")}
          className="px-4 py-3 border-b cursor-pointer hover:bg-blue-100"
        >
           Company Management
        </div>

        <div
          onClick={() => navigate("/customer")}
          className="px-4 py-3 border-b cursor-pointer hover:bg-blue-100"
        >
           Customer Ledger
        </div>

        <div
          onClick={() => navigate("/supplier")}
          className="px-4 py-3 border-b cursor-pointer hover:bg-blue-100"
        >
          Supplier Ledger
        </div>

        <div
          onClick={() => navigate("/inventory")}
          className="px-4 py-3 cursor-pointer hover:bg-blue-100"
        >
           Inventory
        </div>
      </div>

      {/* Transactions */}
      <div className="border border-gray-200 rounded bg-white">
        <div className="bg-green-400 text-white text-center font-bold py-2">
          TRANSACTIONS
        </div>

        <div
          onClick={() => navigate("/purchase")}
          className="px-4 py-3 border-b cursor-pointer hover:bg-green-100"
        >
           Purchase Voucher
        </div>

        <div
          onClick={() => navigate("/sales-voucher")}
          className="px-4 py-3 border-b cursor-pointer hover:bg-green-100"
        >
           Sales Voucher
        </div>

        <div
          onClick={() => navigate("/billing")}
          className="px-4 py-3 cursor-pointer hover:bg-green-100"
        >
           Billing System
        </div>
      </div>

      {/* Reports */}
      <div className="border border-gray-200 rounded bg-white">
        <div className="bg-purple-400 text-white text-center font-bold py-2">
          REPORTS
        </div>

        <div
          onClick={() => navigate("/sales-report")}
          className="px-4 py-3 border-b cursor-pointer hover:bg-purple-100"
        >
           Sales Report
        </div>

        <div
          onClick={() => navigate("/purchase-report")}
          className="px-4 py-3 border-b cursor-pointer hover:bg-purple-100"
        >
          Purchase Report
        </div>

        <div
          onClick={() => navigate("/stock-report")}
          className="px-4 py-3 border-b cursor-pointer hover:bg-purple-100"
        >
           Stock Report
        </div>

        <div
          onClick={() => navigate("/billing-report")}
          className="px-4 py-3 border-b cursor-pointer hover:bg-purple-100"
        >
           Billing Report
        </div>

        <div
          onClick={() => navigate("/profit-report")}
          className="px-4 py-3 cursor-pointer hover:bg-purple-100"
        >
           Profit Report
        </div>
      </div>

    </div>
  );
}

export default DashboardMenu;