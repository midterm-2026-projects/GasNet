//3-day2
function validateInventoryConsistency(inventory) {
  return inventory.every(
    (item) =>
      item.id &&
      item.productName &&
      item.stock >= 0
  );
}

export default validateInventoryConsistency;