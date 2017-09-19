import React, { PureComponent } from 'react';
import { instanceOf, object, arrayOf } from 'prop-types';
import { Panel } from 'react-bootstrap';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectWatchlists from '../../redux/selectors/selectWatchlists';
import selectSelectedWatchlist from '../../redux/selectors/selectSelectedWatchlist';
import selectOps from '../../redux/selectors/selectOps';
import * as watchlistsActions from '../../redux/actions/watchlistsActions';
import * as opsActions from '../../redux/actions/opsActions';
import * as scopes from '../../redux/actions/scopes';
// deps
import { Watchlist, WatchlistService } from '../../services';
import WatchlistForm from './WatchlistForm';
import DeleteWatchlistForm from './DeleteWatchlistForm';
import Header from './WatchlistsHeader';
import Watchlists from './Watchlists';

class WatchlistsContainer extends PureComponent {
	static propTypes = {
		watchlists: arrayOf(instanceOf(Watchlist)),
		selected: instanceOf(Watchlist),
		opState: object
	};

	static defaultProps = {
		watchlists: [],
		selected: null,
		opState: {
			editedWatchlist: null,
			adding: false,
			editing: false,
			deleting: false,
			saving: false,
			error: null
		}
	};

	componentWillReceiveProps(newProps) {
		// console.log('watchlists changed? ', newProps.watchlists !== this.props.watchlists);
		// console.log('selected changed? ', newProps.selected !== this.props.selected);
		// console.log('opstate changed? ', newProps.opState !== this.props.opState);
	}

	onChangeSelection = wl => {
		this.props.actions.selectWatchlist(wl);
	};

	onAddClick = () => {
		this.props.actions.initOp(scopes.WATCHLIST, { watchlist: new Watchlist(), op: 'CREATE' });
	};

	onEditClick = () => {
		let editedWatchlist = Object.assign(new Watchlist(), this.props.selected);
		this.props.actions.initOp(scopes.WATCHLIST, { watchlist: editedWatchlist, op: 'EDIT' });
	};

	onDeleteClick = () => {
		this.props.actions.initOp(scopes.WATCHLIST, { watchlist: this.props.selected, op: 'DELETE' });
	};

	onSave = watchlist => {
		let valid = WatchlistService.validateWatchlist(watchlist);
		if (valid.status === 'error') {
			return valid.msg;
		}
		this.props.opState.adding
			? this.props.actions.createWatchlist(watchlist)
			: this.props.actions.editWatchlist(watchlist);
	};

	onDelete = () => {
		this.props.actions.deleteWatchlist(this.props.opState.editedWatchlist);
	};

	onCancel = () => {
		let { removeOp } = this.props.actions;
		let watchlist = this.props.opState.editedWatchlist;
		removeOp(scopes.WATCHLIST, { op: 'CREATE' });
		removeOp(scopes.WATCHLIST, { watchlist, op: 'EDIT' });
		removeOp(scopes.WATCHLIST, { watchlist, op: 'DELETE' });
	};

	render() {
		let { editedWatchlist, adding, editing, deleting, saving, error } = this.props.opState;
		let watchlists = this.props.watchlists;
		let isViewState = !adding && !editing && !deleting;
		let Title = (
			<Header
				showAdd={isViewState}
				showEdit={!!this.props.selected && isViewState}
				onAdd={this.onAddClick}
				onEdit={this.onEditClick}
				onDelete={this.onDeleteClick}
			/>
		);
		let emptylistMsg = (
			<div
				style={{
					background: '#222230',
					border: '0px',
					padding: '5px'
				}}
			>
				<h5> No Watchlists available! </h5>
			</div>
		);
		return (
			<Panel header={Title} bsStyle="primary" className="panel-watchlists">
				{watchlists.length === 0 && isViewState && emptylistMsg}

				{isViewState && (
					<Watchlists
						watchlists={watchlists}
						selected={this.props.selected}
						onClick={this.onChangeSelection}
					/>
				)}

				{(adding || editing) && (
					<WatchlistForm
						watchlist={editedWatchlist}
						saving={saving}
						error={error}
						onSave={this.onSave}
						onClose={this.onCancel}
					/>
				)}

				{deleting && (
					<DeleteWatchlistForm
						watchlist={editedWatchlist}
						saving={saving}
						error={error}
						onDelete={this.onDelete}
						onClose={this.onCancel}
					/>
				)}
			</Panel>
		);
	}
}

function mapStateToProps(state) {
	let selected = selectSelectedWatchlist(state);
	let watchlistOp = selectOps(state, 'watchlist');
	let opState;
	if (watchlistOp) {
		let { op, status, error, watchlist: editedWatchlist } = watchlistOp;
		opState = {
			editedWatchlist,
			adding: op === 'CREATE',
			editing: op === 'EDIT',
			deleting: op === 'DELETE',
			saving: status === 'pending' ? true : false,
			error
		};
	}
	return {
		watchlists: selectWatchlists(state),
		selected,
		opState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...watchlistsActions, ...opsActions }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistsContainer);
