export default function InventoryStatus() {
  const inventoryItems = [
    { id: 1, productName: "LPG 11kg", updateStatus: "Updated" },
    { id: 2, productName: "LPG 22kg", updateStatus: "Pending" },
    { id: 3, productName: "Regulator", updateStatus: "Failed" },
  ];

  return (
    <div>
      <h1>Inventory Update Status</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.updateStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}