export default function getToast(state, key) {
  return state.toasts.filter(toast => toast.key === key);
}
