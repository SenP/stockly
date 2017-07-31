export default function getStockOpIndex(stockOps, stock, watchlist, op) {
  const filterOp = stockOp => {
    let cond = stockOp.watchlist.id === watchlist.id && stockOp.op === op;
    return op === "ADD" ? cond : cond && stockOp.stock.code === stock.code;
  };
  return stockOps ? stockOps.findIndex(filterOp) : -1;
}
