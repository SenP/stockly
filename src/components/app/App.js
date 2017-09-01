import React, { Component } from 'react';
import { number, object } from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ToastContainer } from 'react-toastify';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchQuotes } from '../../redux/actions/quotesActions';
import { loadWatchlists, selectWatchlist } from '../../redux/actions/watchlistsActions';
import selectQuotesInterval from '../../redux/selectors/selectQuotesInterval';
// components
import Sidebar from '../layout/Sidebar';
import Content from '../layout/Content';
import Watchlists from '../watchlists';
import DashboardButton from '../dashboard/DashboardButton';
import Config from '../Config';
// styles
import './App.css';
import { sidebarColStyle, sidebarSpacingStyle, contentColStyle } from './App.styles.js';
import 'react-toastify/dist/ReactToastify.min.css';

injectTapEventPlugin();

class App extends Component {
	static quotesTimer;
	static quotesRefInterval;

	static propTypes = {
		quotesRefInterval: number.isRequired,
		actions: object
	};

	componentDidMount() {
		this.props.actions.loadWatchlists();
		this.quotesRefInterval = this.props.quotesRefInterval;
		this.setQuotesTimer();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.quotesRefInterval !== this.props.quotesRefInterval) {
			clearTimeout(this.quotesTimer);
			this.quotesRefInterval = nextProps.quotesRefInterval;
			this.setQuotesTimer();
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillUnmount() {
		clearTimeout(this.quotesTimer);
	}

	updateQuotes = () => {
		this.props.actions.fetchQuotes();
		this.setQuotesTimer();
	};

	setQuotesTimer = () => {
		this.quotesTimer = setTimeout(this.updateQuotes, this.quotesRefInterval * 1000);
	};

	showDashboard = () => {
		this.props.actions.selectWatchlist(null);
	};

	render() {
		// let selectedWatchlist = this.state.selectedWatchlist;
		// let selectedWatchlistId;

		// if (selectedWatchlist) {
		// 	selectedWatchlist = selectedWatchlist.id
		// 		? this.props.watchlists.find(wl => wl.id === selectedWatchlist.id)
		// 		: this.props.watchlists[this.props.watchlists.length - 1];
		// 	selectedWatchlistId = selectedWatchlist.id;
		// } else {
		// 	selectedWatchlistId = null;
		// }
		return (
			<div>
				<Grid fluid>
					<Row className="app-container">
						<Col lg={2} md={4} className="hidden-sm hidden-xs" style={sidebarColStyle}>
							<Sidebar>
								<div style={sidebarSpacingStyle}>
									<DashboardButton onClick={this.showDashboard} />
								</div>
								<div style={sidebarSpacingStyle}>
									<Watchlists />
								</div>
								<div style={sidebarSpacingStyle}>
									<Config style={sidebarSpacingStyle} />
								</div>
							</Sidebar>
						</Col>
						<Col lg={10} md={8} style={contentColStyle}>
							<Content />
						</Col>
					</Row>
				</Grid>
				<ToastContainer />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		quotesRefInterval: selectQuotesInterval(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ fetchQuotes, loadWatchlists, selectWatchlist }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
