//week3-day1
import mockInventoryData from "../data/mockInventoryData.js";
import synchronizeInventory from "../services/InventorySynchronizationService.js";

export function synchronizeInventoryController(req, res) {
  const result = synchronizeInventory(mockInventoryData);
  
  res.json(result);
}