export default function StockLevelChanges() {
  const stockItems = [
    {
      id: 1,
      productName: "LPG 11kg",
      previousStock: 50,
      currentStock: 45,
    },
    {
      id: 2,
      productName: "LPG 22kg",
      previousStock: 20,
      currentStock: 25,
    },
    {
      id: 3,
      productName: "Regulator",
      previousStock: 15,
      currentStock: 15,
    },
  ];

  return (
    <div>
      <h1>Stock Level Changes</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Previous Stock</th>
            <th>Current Stock</th>
            <th>Stock Change</th>
          </tr>
        </thead>

        <tbody>
          {stockItems.map((item) => {
            const stockChange = item.currentStock - item.previousStock;

            return (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.previousStock}</td>
                <td>{item.currentStock}</td>
                <td>{stockChange}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}