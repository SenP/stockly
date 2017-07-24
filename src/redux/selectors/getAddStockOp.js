export default function getAddStockOp(state = [], watchlist) {
  return state
    ? state.filter(
        stockOp =>
          stockOp.watchlist.id === watchlist.id &&
          stockOp.op === "ADD"
      )[0]
    : null;
}
