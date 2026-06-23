export default function SynchronizationIndicators() {
  const syncData = {
    overallSyncStatus: "Synced",
    deviceConnection: "Online",
    lastSynced: "June 23, 2026 11:30 AM",
  };

  return (
    <div>
      <h1>Synchronization Indicators</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Overall Sync Status</td>
            <td>{syncData.overallSyncStatus}</td>
          </tr>
          <tr>
            <td>Device Connection</td>
            <td>{syncData.deviceConnection}</td>
          </tr>
          <tr>
            <td>Last Synced</td>
            <td>{syncData.lastSynced}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}