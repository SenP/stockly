import getStockOps from "./getStockOps";
import getStockOp from "./getStockOp";

export default function selectStockOp(state, stock, watchlist, op) {
  return getStockOp(getStockOps(state),stock, watchlist, op);
}
