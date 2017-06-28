export default function transformMap(
  inputMap,
  prop,
  itemsCount = inputMap.length,
  mode = "top"
) {
  let mapped = [],
    outputArr = [];
  if (!inputMap || inputMap.length === 0 || !prop) return [];

  // temporary array holds objects with position and sort-value
  inputMap.forEach(function(el, key) {
      mapped.push({ key, value: el[prop] });
  });
  
  // sorting the mapped array containing the reduced values
  mapped.sort(function(a, b) {
    return b.value - a.value;
  });

  // container for the resulting order
  outputArr = mapped.map(function(el) {
    return {key: el.key, ...inputMap.get(el.key)};
  });
  return mode === "top"
    ? outputArr.slice(0, itemsCount)
    : outputArr.slice(-itemsCount);
}
