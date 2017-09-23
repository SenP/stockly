import React, { PureComponent } from 'react';
import { arrayOf, instanceOf, object } from 'prop-types';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// redux
import * as opsActions from '../../redux/actions/opsActions';
import * as watchlistsActions from '../../redux/actions/watchlistsActions';
import selectOps from '../../redux/selectors/selectOps';
import selectSelectedWatchlist from '../../redux/selectors/selectSelectedWatchlist';
import selectWatchlists from '../../redux/selectors/selectWatchlists';
import { WATCHLIST } from '../../redux/actions/scopes';
// deps
import { Watchlist, WatchlistService } from '../../services';
import DeleteWatchlistForm from './DeleteWatchlistForm';
import WatchlistForm from './WatchlistForm';
import Watchlists from './Watchlists';
import Header from './WatchlistsHeader';

class WatchlistsContainer extends PureComponent {
	static propTypes = {
		watchlists: arrayOf(instanceOf(Watchlist)),
		selected: instanceOf(Watchlist),
		opState: object,
		actions: object
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

	onChangeSelection = wl => {
		this.props.actions.selectWatchlist(wl);
	};

	onAddClick = () => {
		this.props.actions.initOp(WATCHLIST, { watchlist: new Watchlist(), op: 'CREATE' });
	};

	onEditClick = () => {
		const editedWatchlist = Object.assign(new Watchlist(), this.props.selected);
		this.props.actions.initOp(WATCHLIST, { watchlist: editedWatchlist, op: 'EDIT' });
	};

	onDeleteClick = () => {
		this.props.actions.initOp(WATCHLIST, { watchlist: this.props.selected, op: 'DELETE' });
	};

	onSave = watchlist => {
		const valid = WatchlistService.validateWatchlist(watchlist);
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
		const { removeOp } = this.props.actions;
		const watchlist = this.props.opState.editedWatchlist;
		removeOp(WATCHLIST, { op: 'CREATE' });
		removeOp(WATCHLIST, { watchlist, op: 'EDIT' });
		removeOp(WATCHLIST, { watchlist, op: 'DELETE' });
	};

	render() {
		const { editedWatchlist, adding, editing, deleting, saving, error } = this.props.opState;
		const watchlists = this.props.watchlists;
		const isViewState = !adding && !editing && !deleting;
		const Title = (
			<Header
				showAdd={isViewState}
				showEdit={!!this.props.selected && isViewState}
				onAdd={this.onAddClick}
				onEdit={this.onEditClick}
				onDelete={this.onDeleteClick}
			/>
		);
		const emptylistMsg = (
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
	const selected = selectSelectedWatchlist(state);
	const watchlistOp = selectOps(state, WATCHLIST);
	let opState;
	if (watchlistOp) {
		const { op, status, error, watchlist: editedWatchlist } = watchlistOp;
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
