export default function InventoryMonitoringInterface() {
  const inventoryData = [
    {
      id: 1,
      productName: "LPG 11kg",
      updateStatus: "Updated",
      previousStock: 50,
      currentStock: 45,
      syncStatus: "Synced",
      deviceConnection: "Online",
      lastSynced: "June 23, 2026 11:30 AM",
    },
    {
      id: 2,
      productName: "LPG 22kg",
      updateStatus: "Pending",
      previousStock: 20,
      currentStock: 25,
      syncStatus: "Synced",
      deviceConnection: "Online",
      lastSynced: "June 23, 2026 11:30 AM",
    },
    {
      id: 3,
      productName: "Regulator",
      updateStatus: "Failed",
      previousStock: 15,
      currentStock: 15,
      syncStatus: "Synced",
      deviceConnection: "Online",
      lastSynced: "June 23, 2026 11:30 AM",
    },
  ];

  return (
    <div>
      <h1>Inventory Synchronization Monitoring Interface</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Update Status</th>
            <th>Previous Stock</th>
            <th>Current Stock</th>
            <th>Stock Change</th>
            <th>Sync Status</th>
            <th>Device Connection</th>
            <th>Last Synced</th>
          </tr>
        </thead>

        <tbody>
          {inventoryData.map((item) => {
            const stockChange = item.currentStock - item.previousStock;

            return (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.updateStatus}</td>
                <td>{item.previousStock}</td>
                <td>{item.currentStock}</td>
                <td>{stockChange}</td>
                <td>{item.syncStatus}</td>
                <td>{item.deviceConnection}</td>
                <td>{item.lastSynced}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}