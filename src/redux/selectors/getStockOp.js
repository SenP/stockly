export default function getStockOp(state = [], stock, watchlist) {
  return state
    ? state.filter(
        stockOp =>
          stockOp.stock.code === stock.code &&
          stockOp.watchlist.id === watchlist.id
      )[0]
    : null;
}
