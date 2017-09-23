import React, { PureComponent } from 'react';
import { instanceOf, object, func } from 'prop-types';
import { Button } from 'react-bootstrap';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as opsActions from '../../../redux/actions/opsActions';
import selectOps from '../../../redux/selectors/selectOps';
import { STOCK } from '../../../redux/actions/scopes';
// deps
import { Stock, Watchlist } from '../../../services';
import AddStockForm from './AddStockForm';

class AddStockPanel extends PureComponent {
	static propTypes = {
		watchlist: instanceOf(Watchlist).isRequired,
		onSave: func.isRequired,
		opState: object,
		actions: object
	};

	static defaultProps = {
		opState: {
			newStock: new Stock(),
			adding: false,
			saving: false,
			error: null
		}
	};

	onAddClick = () => {
		const { watchlist, actions } = this.props;
		actions.initOp(STOCK, { watchlist, newStock: new Stock(), op: 'ADD' });
	};

	onChange = newStock => {
		const { watchlist, actions } = this.props;
		actions.updateOp(STOCK, { watchlist, newStock, op: 'ADD' });
	};

	submitForm = newStock => {
		return this.props.onSave(newStock, true);
	};

	onCancel = () => {
		const { removeOp } = this.props.actions;
		const { watchlist } = this.props;
		removeOp(STOCK, { watchlist, op: 'ADD' });
	};

	render = () => {
		const { adding, saving, error, newStock } = this.props.opState;
		const AddButton = (
			<div className="text-right">
				<Button bsStyle="success" onClick={this.onAddClick} style={{ marginBottom: '10px' }}>
					Add Stock
				</Button>
			</div>
		);

		return (
			<div>
				{!adding && AddButton}
				{adding && (
					<AddStockForm
						stock={newStock}
						saving={saving}
						error={error}
						onChange={this.onChange}
						onSave={this.submitForm}
						onClose={this.onCancel}
					/>
				)}
			</div>
		);
	};
}

function mapStateToProps(state, ownProps) {
	const { watchlist } = ownProps;
	const stockOp = selectOps(state, STOCK, { watchlist, op: 'ADD' });
	let opState;
	if (stockOp) {
		const { status, error, newStock } = stockOp;
		opState = {
			newStock,
			adding: true,
			saving: status === 'pending' ? true : false,
			error
		};
	}
	return {
		opState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(opsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStockPanel);
