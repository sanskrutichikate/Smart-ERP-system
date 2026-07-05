function ShortcutPanel() {
  return (
    <div className="mt-8 bg-white border border-gray-200 rounded shadow">

      {/* Header */}
      <div className="bg-gray-800 text-white text-center font-bold py-2">
        KEYBOARD SHORTCUTS
      </div>

      {/* Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 text-sm">

        <div>
          <p><strong>F1</strong> - Company</p>
          <p><strong>F8</strong> - Sales Voucher</p>
          <p><strong>F9</strong> - Purchase Voucher</p>
          <p><strong>Esc</strong> - Previous Screen</p>
        </div>

        <div>
          <p><strong>Ctrl + H</strong> - Dashboard</p>
          <p><strong>Ctrl + Q</strong> - Logout</p>
          <p><strong>Ctrl + C</strong> - Customer</p>
        </div>

        <div>
          <p><strong>Ctrl + S</strong> - Supplier</p>
          <p><strong>Ctrl + I</strong> - Inventory</p>
          <p><strong>Ctrl + B</strong> - Billing</p>
        </div>

      </div>

    </div>
  );
}

export default ShortcutPanel;