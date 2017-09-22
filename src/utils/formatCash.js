export default function formatCash(num = 0, options = {}) {
	return num.toLocaleString('en-US', options);
}
