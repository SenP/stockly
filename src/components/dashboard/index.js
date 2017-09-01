import React, { Component } from 'react';
import { objectOf, instanceOf } from 'prop-types';
import { Row, Col } from 'react-bootstrap';
// redux
import { connect } from 'react-redux';
import selectWatchlists from '../../redux/selectors/selectWatchlists';

import { Watchlist } from '../../services';
import Charts from './ChartsComponent';
import StocksTable from './StocksTable';
import Summary from './Summary';

import './styles.css';

class DashboardContainer extends Component {
	static propTypes = {
		watchlists: objectOf(instanceOf(Watchlist))
	};

	static defaultProps = {
		watchlists: {}
	};

	state = {
		watchlists: this.props.watchlists,
		portfolioValue: 0,
		portfolioPnL: 0,
		portfolioDaychange: 0,
		stocksMap: null,
		chartData: {
			dataLabels: [],
			marketValues: [],
			pnlValues: [],
			daychangeValues: []
		}
	};

	componentDidMount() {
		this.updateDashboard();
	}

	componentWillReceiveProps(nextProps) {
		this.setState(() => ({ watchlists: nextProps.watchlists }), this.updateDashboard);
	}

	updateDashboard = () => {
		let portfolioDaychange, portfolioPnL, portfolioValue;
		let stocksMap = new Map();
		portfolioDaychange = portfolioPnL = portfolioValue = 0;
		Object.values(this.state.watchlists).forEach(wl => {
			//update portfolio values
			portfolioValue += wl.totalMarketValue;
			portfolioPnL += wl.totalPnL;
			portfolioDaychange += wl.totalDayChange;
			// update all stocks map
			Object.values(wl.stocks).forEach(stock => {
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
		this.setState(() => ({
			portfolioValue,
			portfolioPnL,
			portfolioDaychange,
			stocksMap
		}));
		this.updateCharts();
	};

	updateCharts = () => {
		let chartData = {
			dataLabels: [],
			marketValues: [],
			pnlValues: [],
			daychangeValues: []
		};

		Object.values(this.state.watchlists).forEach(wl => {
			chartData.dataLabels.push(wl.name);

			chartData.marketValues.push([wl.name, wl.totalMarketValue]);
			chartData.pnlValues.push(wl.totalPnL);
			chartData.daychangeValues.push(wl.totalDayChange);
		});
		this.setState({ chartData });
	};

	render() {
		return (
			<div>
				<Summary {...this.state} />

				<Charts chartData={this.state.chartData} />

				<Row>
					<Col md={4}>
						<StocksTable
							stocks={this.state.stocksMap}
							title="Stocks by Market Value"
							orderBy="marketValue"
						/>
					</Col>
					<Col md={4}>
						<StocksTable stocks={this.state.stocksMap} title="Stocks by Net P/L" orderBy="netPnL" />
					</Col>
					<Col md={4}>
						<StocksTable stocks={this.state.stocksMap} title="Stocks by Day Change" orderBy="dayChange" />
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		watchlists: selectWatchlists(state) || {}
	};
}

export default connect(mapStateToProps, null)(DashboardContainer);
