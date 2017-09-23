import React from 'react';

function getColor(txt) {
	if (!txt) return 'black';

	let numarr = txt.match(/[\d.\-eE+]/g);
	if (!numarr) return 'black'; //no numbers in text

	let val = parseFloat(numarr.join(''));
	if (isNaN(val) || val === 0) return 'black';

	return val < 0 ? 'red' : 'green';
}

export default function Colored({ value, prefix }) {
	return (
		<span style={{ color: getColor(value) }}>
			{prefix}
			{value}
		</span>
	);
}
