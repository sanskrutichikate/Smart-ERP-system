import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardMenu from "../components/DashboardMenu";
import ShortcutPanel from "../components/ShortcutPanel";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-200">

      {/* TOP HEADER (Tally style) */}
      <div className="bg-blue-500 text-white flex justify-between items-center px-6 py-3 shadow">
        <h1 className="text-xl font-bold">SMART ERP SYSTEM</h1>

       
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        
      </div>

      {/* MAIN CONTENT */}
      <div className="p-6">

        {/* MENU SECTION (Masters / Transactions / Reports) */}
        <DashboardMenu />

        {/* SHORTCUT PANEL */}
        <ShortcutPanel />

      </div>
    </div>
  );
}

export default Dashboard;