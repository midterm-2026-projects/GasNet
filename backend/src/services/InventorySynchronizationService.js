//week3-day2
import updateStockRecords from "./StockUpdateService.js";
import validateInventoryConsistency from "./InventoryConsistencyValidator.js";

function synchronizeInventory(inventory) {
  const updated = updateStockRecords(inventory);

  const validated = validateInventoryConsistency(updated.inventory);

  return {
    updated,
    validated,
  };
}

export default synchronizeInventory;