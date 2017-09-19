import React, { PureComponent } from 'react';
import { arrayOf, instanceOf } from 'prop-types';
import { Row, Col } from 'react-bootstrap';
// redux
import { connect } from 'react-redux';
import selectWatchlists from '../../redux/selectors/selectWatchlists';
import selectSelectedWatchlist from '../../redux/selectors/selectSelectedWatchlist';
// deps
import { Watchlist } from '../../services';
import Charts from './ChartsComponent';
import StocksTable from './StocksTable';
import Summary from './Summary';

import './styles.css';

class DashboardContainer extends PureComponent {
	static propTypes = {
		watchlists: arrayOf(instanceOf(Watchlist)),
		selectedWatchlist: instanceOf(Watchlist)
	};

	getDashboardData = () => {
		let portfolioDaychange, portfolioPnL, portfolioValue;
		let stocksMap = new Map();
		portfolioDaychange = portfolioPnL = portfolioValue = 0;
		Object.values(this.props.watchlists).forEach(wl => {
			//update portfolio values
			portfolioValue += wl.totalMarketValue;
			portfolioPnL += wl.totalPnL;
			portfolioDaychange += wl.totalDayChange;
			// update all stocks map
			Object.values(wl.stocksByCode).forEach(stock => {
				let stockMap = stocksMap.get(stock.code);
				if (stockMap) {
					stockMap.marketValue += stock.marketValue;
					stockMap.netPnL += stock.netPnL;
					stockMap.dayChange += stock.dayChange;
				} else {
					stocksMap.set(stock.code, {
						marketValue: stock.marketValue,
						netPnL: stock.netPnL,
						dayChange: stock.dayChange
					});
				}
			});
		});
		return {
			summary: {
				portfolioValue,
				portfolioPnL,
				portfolioDaychange
			},
			stocksMap
		};
	};

	getChartsData = () => {
		let chartData = {
			dataLabels: [],
			marketValues: [],
			pnlValues: [],
			daychangeValues: []
		};
		let { watchlists } = this.props;
		Object.values(watchlists).forEach(wl => {
			chartData.dataLabels.push(wl.name);
			chartData.marketValues.push([wl.name, wl.totalMarketValue]);
			chartData.pnlValues.push(wl.totalPnL);
			chartData.daychangeValues.push(wl.totalDayChange);
		});
		return chartData;
	};

	render() {
		if (this.props.selectedWatchlist) return null;

		let { summary, stocksMap } = this.getDashboardData();

		return (
			<div>
				<Summary {...summary} />

				<Charts chartData={this.getChartsData()} />

				<Row>
					<Col md={4}>
						<StocksTable stocks={stocksMap} title="Stocks by Market Value" orderBy="marketValue" />
					</Col>
					<Col md={4}>
						<StocksTable stocks={stocksMap} title="Stocks by Net P/L" orderBy="netPnL" />
					</Col>
					<Col md={4}>
						<StocksTable stocks={stocksMap} title="Stocks by Day Change" orderBy="dayChange" />
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		watchlists: selectWatchlists(state),
		selectedWatchlist: selectSelectedWatchlist(state)
	};
}

export default connect(mapStateToProps, null)(DashboardContainer);
