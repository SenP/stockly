import React, { PureComponent } from 'react';
import { instanceOf, string } from 'prop-types';
import { Panel, Table, FormControl, FormGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
// deps
import transformMap from '../../utils/transformMap';
import Colored from '../common/Colored';
import formatCash from '../../utils/formatCash';

const ITEMS_TO_SHOW_OPTIONS = [5, 10, 15, 20];

export default class StocksTable extends PureComponent {
	static propTypes = {
		stocks: instanceOf(Map),
		title: string,
		orderBy: string.isRequired
	};

	static defaultProps = {
		stocks: new Map(),
		title: '',
		orderBy: 'marketValue'
	};

	state = {
		filteredStocks: [],
		numItems: 5,
		sliceMode: 'top'
	};

	componentWillMount() {
		this.filterStocks();
	}
	componentWillReceiveProps(nextProps) {
		this.filterStocks();
	}

	filterStocks = () => {
		let { stocks, orderBy } = this.props;
		let { numItems, sliceMode } = this.state;
		let filteredStocks = transformMap(stocks, orderBy, numItems, sliceMode);
		this.setState({ filteredStocks });
	};

	onChange = evt => {
		let target = evt.target;
		this.setState(
			() => ({
				[target.name]: target.value
			}),
			this.filterStocks
		);
	};

	render() {
		let { sliceMode, numItems, filteredStocks } = this.state;
		let { title, orderBy } = this.props;
		let Header = (
			<div fill className="topstocks-title">
				<div className="topstocks-input">
					<FormGroup>
						<FormControl
							componentClass="select"
							name="sliceMode"
							bsSize="small"
							value={sliceMode}
							onChange={this.onChange}
						>
							<option value="top">Best</option>
							<option value="bottom">Worst</option>
						</FormControl>
					</FormGroup>
					<FormGroup>
						<FormControl
							componentClass="select"
							name="numItems"
							bsSize="small"
							value={numItems}
							onChange={this.onChange}
						>
							{ITEMS_TO_SHOW_OPTIONS.map(itemsToShowOption => (
								<option key={itemsToShowOption} value={itemsToShowOption}>
									{itemsToShowOption}
								</option>
							))}
						</FormControl>
					</FormGroup>
				</div>
				<div className="topstocks-title-text">
					<strong> {title} </strong>
				</div>
			</div>
		);
		let mapStockRow = stock => {
			let value = parseFloat(stock[orderBy].toFixed(2), 10);
			return (
				<tr key={stock.key}>
					<td> {stock.key} </td>
					<td className="number-field">
						<Colored
							value={formatCash(value, { maximumFractionDigits: 0 })}
							prefix={<FontAwesome name="usd" />}
						/>
					</td>
				</tr>
			);
		};
		return (
			<Panel>
				{Header}
				<Table bordered responsive fill striped className="topstocks-table">
					{filteredStocks.length > 0 && <tbody>{filteredStocks.map(mapStockRow)}</tbody>}
				</Table>
			</Panel>
		);
	}
}
