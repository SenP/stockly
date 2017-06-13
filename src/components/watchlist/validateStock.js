export default function validateStock(watchlist, stock, mode = "add") {
  let result = { status: "success", msg: "success" };
  // validate length
  if (stock.code.length < 3 || stock.code.length > 12) {
    result.status = "error";
    result.msg = "Stock code should be between 3 to 12 characters";
    return result;
  }
  // check duplicates
  if (
    mode === "add" &&
    watchlist.stocks.findIndex(stk => stk.code === stock.code) !== -1
  ) {
    result.status = "error";
    result.msg = "'" + stock.code + "' already exists in this watchlist";
    return result;
  }
  // validate quantity
  if (isNaN(stock.unitsOwned)) {
    result.status = "error";
    result.msg = "'Units owned' should be a number";
    return result;
  }
  if (stock.unitsOwned < 1 || stock.unitsOwned > 999999999) {
    result.status = "error";
    result.msg = "'Units owned' should be between 1 to 1 billion";
    return result;
  }
  // validate avg price
  if (isNaN(stock.avgPrice)) {
    result.status = "error";
    result.msg = "'Buy price' should be a number";
    return result;
  }
  if (stock.avgPrice <= 0 || stock.avgPrice >= 10000) {
    result.status = "error";
    result.msg = "'Buy price' should be more than 0 and less than 10000";
    return result;
  }
  return result;
}
