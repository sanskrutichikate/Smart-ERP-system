import { useNavigate } from "react-router-dom";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";

function KeyboardShortcuts() {
  const navigate = useNavigate();

  useKeyboardShortcuts((event) => {

    // -------------------------------
    // Function Keys
    // -------------------------------

    // F1 = Company Management
    if (event.key === "F1") {
      event.preventDefault();
      navigate("/company");
    }

    // F8 = Sales Voucher
    if (event.key === "F8") {
      event.preventDefault();
      navigate("/sales-voucher");
    }

    // F9 = Purchase Voucher
    if (event.key === "F9") {
      event.preventDefault();
      navigate("/purchase");
    }

    // -------------------------------
    // CTRL Shortcuts
    // -------------------------------

    // Ctrl + H = Dashboard
    if (event.ctrlKey && event.key.toLowerCase() === "h") {
      event.preventDefault();
      navigate("/dashboard");
    }

    // Ctrl + Q = Logout
    if (event.ctrlKey && event.key.toLowerCase() === "q") {
      event.preventDefault();

      localStorage.removeItem("token");
      navigate("/");
    }

    // Ctrl + C = Customer
    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      navigate("/customer");
    }

    // Ctrl + S = Supplier
    if (event.ctrlKey && event.key.toLowerCase() === "s") {
      event.preventDefault();
      navigate("/supplier");
    }

    // Ctrl + I = Inventory
    if (event.ctrlKey && event.key.toLowerCase() === "i") {
      event.preventDefault();
      navigate("/inventory");
    }

    // Ctrl + B = Billing
    if (event.ctrlKey && event.key.toLowerCase() === "b") {
      event.preventDefault();
      navigate("/billing");
    }

    // -------------------------------
    // ESC = Previous Screen
    // -------------------------------

    if (event.key === "Escape") {
      event.preventDefault();
      navigate(-1);
    }

  });

  return null;
}

export default KeyboardShortcuts;