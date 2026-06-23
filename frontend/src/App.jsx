import InventoryStatus from "./components/InventoryStatus";
import StockLevelChanges from "./components/StockLevelChanges";
import SynchronizationIndicators from "./components/SynchronizationIndicators";

export default function App() {
  return (
  <>
  <InventoryStatus />,
  <StockLevelChanges />,
  <SynchronizationIndicators/>
  </>);
}

