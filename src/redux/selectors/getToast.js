export default function getToast(state, stock, watchlist, op) {
  return state.toasts.filter(
    toast =>
      toast.stock.code === stock.code &&
      toast.watchlist.id === watchlist.id &&
      toast.op === op
  );
}
