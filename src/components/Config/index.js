import React, { Component } from 'react';
import { number, func } from 'prop-types';
import ConfigInterval from './ConfigInterval';
// redux
import { connect } from 'react-redux';
import { setQuotesInterval } from '../../redux/actions/quotesActions';

const refFreqs = [
	[10, '10 sec'],
	[30, '30 sec'],
	[60, '1 min'],
	[300, '5 min'],
	[600, '10 min'],
	[900, '15 min'],
	[1200, '20 min'],
	[1800, '30 min'],
	[3600, '60 min']
];

class ConfigContainer extends Component {
	static propTypes = {
		quotesRefInterval: number.isRequired,
		dispatch: func.isRequired
	};

	changeRefInterval = interval => {
		this.props.dispatch(setQuotesInterval(interval));
	};

	render() {
		return (
			<ConfigInterval
				intervals={refFreqs}
				interval={this.props.quotesRefInterval}
				onChange={this.changeRefInterval}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		quotesRefInterval: state.quotesRefInterval
	};
}

export default connect(mapStateToProps, null)(ConfigContainer);
