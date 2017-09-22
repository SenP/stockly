import React from 'react';
import { instanceOf, func, number } from 'prop-types';
import { Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { Watchlist } from '../../services';
import StockRow from './StockRow';
import Colored from '../common/Colored';
import formatCash from '../../utils/formatCash';

const Dollar = <FontAwesome name="usd" />;
CashField.propTypes = { value: number };

function CashField({ value = '0' }) {
	return (
		<Colored
			value={formatCash(parseFloat(value, 10), {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			})}
			prefix={Dollar}
		/>
	);
}

StocksList.propTypes = {
	watchlist: instanceOf(Watchlist).isRequired,
	onSave: func.isRequired,
	onDelete: func.isRequired
};

function StocksList({ watchlist, onSave, onDelete }) {
	const stocks = Object.values(watchlist.stocksByCode);
	const headerRow = (
		<thead>
			<tr className="active">
				<th>Stock Code </th>
				<th className="number-field">Units Owned </th>
				<th className="number-field">Buy Price ({Dollar})</th>
				<th className="number-field">Last Traded Price ({Dollar})</th>
				<th className="number-field">Change ({Dollar})</th>
				<th className="number-field">Change (%) </th>
				<th className="number-field">Market Value ({Dollar})</th>
				<th className="number-field">Day Change ({Dollar})</th>
				<th className="number-field">Net P/L ({Dollar})</th>
				<th className="text-center"> Actions </th>
			</tr>
		</thead>
	);

	const totalsRow = stocks.length > 1 && (
		<tr className="active">
			<td>
				<strong>Totals </strong>
			</td>
			<td colSpan="5" />
			<td className="number-field">
				<strong>
					<CashField value={watchlist.totalMarketValue} />
				</strong>
			</td>
			<td className="number-field">
				<strong>
					<CashField value={watchlist.totalDayChange} />
				</strong>
			</td>
			<td className="number-field">
				<strong>
					<CashField value={watchlist.totalPnL} />
				</strong>
			</td>
			<td />
		</tr>
	);

	return (
		<Table bordered responsive>
			{headerRow}
			<tbody>
				{stocks.map(stock => (
					<StockRow
						key={watchlist.id + stock.code}
						stock={stock}
						watchlist={watchlist}
						onSave={onSave}
						onDelete={onDelete}
					/>
				))}
				{totalsRow}
			</tbody>
		</Table>
	);
}

export default StocksList;
