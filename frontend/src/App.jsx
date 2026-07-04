import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Company from "./pages/Company";
import Supplier from "./pages/Supplier";
import Customer from "./pages/Customer";
import Item from "./pages/Item";
import ItemMaster from "./pages/ItemMaster";
import Inventory from "./pages/Inventory";
import Purchase from "./pages/Purchase";
import SalesVoucher from "./pages/SalesVoucher";
import Billing from "./pages/Billing";
import SalesReport from "./pages/SalesReport";
import PurchaseReport from "./pages/PurchaseReport";
import StockReport from "./pages/StockReport";
import BillingReport from "./pages/BillingReport";
import ProfitReport from "./pages/ProfitReport";
import KeyboardShortcuts from "./components/KeyboardShortcuts";






function App() {
  return (
    <BrowserRouter>

  <KeyboardShortcuts />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/customer" element={<Customer />} />
        {/* <Route path="/item" element={<Item />} /> */}
        {/* <Route path="/items" element={<ItemMaster />} /> */}
        <Route path="/inventory" element={<Inventory />} />

        <Route path="/purchase" element={<Purchase />} />
        <Route path="/sales-voucher" element={<SalesVoucher />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/purchase-report" element={<PurchaseReport />} />

        <Route path="/stock-report" element={<StockReport />} />
        <Route path="/billing-report"element={<BillingReport />}/>
        <Route path="/profit-report"element={<ProfitReport/>}
/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
