export default function getStockOpIndex(state = [], stock, watchlist, op) {
  return state.findIndex(
    stockOp =>
      stockOp.stock.code === stock.code &&
      stockOp.watchlist.id === watchlist.id &&
      stockOp.op === op
  );
}
