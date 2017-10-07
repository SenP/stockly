import React, { Component } from 'react';
import { arrayOf, instanceOf, object, bool, string } from 'prop-types';
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

class WatchlistsContainer extends Component {
	static propTypes = {
		watchlists: arrayOf(instanceOf(Watchlist)),
		selected: instanceOf(Watchlist),
		actions: object,
		editedWatchlist: instanceOf(Watchlist),
		adding: false,
		editing: bool,
		deleting: bool,
		saving: bool,
		error: string
	};

	static defaultProps = {
		watchlists: [],
		selected: null,
		editedWatchlist: null,
		adding: false,
		editing: false,
		deleting: false,
		saving: false,
		error: null
	};

	state = {
		editedWatchlist: this.props.editedWatchlist,
		adding: this.props.adding,
		editing: this.props.editing,
		deleting: this.props.deleting,
		saving: this.props.saving,
		error: this.props.error
	};

	onAddClick = () => this.props.actions.initOp(WATCHLIST, { watchlist: new Watchlist(), op: 'CREATE' });

	onEditClick = () => {
		const editedWatchlist = Object.assign(new Watchlist(), this.props.selected);
		this.props.actions.initOp(WATCHLIST, { watchlist: editedWatchlist, op: 'EDIT' });
	};

	onDeleteClick = () => this.props.actions.initOp(WATCHLIST, { watchlist: this.props.selected, op: 'DELETE' });

	onChange = ({ target }) =>
		this.setState(prevState => ({
			watchlist: Object.assign(new Watchlist(), prevState.watchlist, {
				[target.name]: target.value.trim()
			})
		}));

	isFormValid = () => this.state.watchlist.name.trim() !== '';

	onSave = watchlist => {
		this.setState({ error: '' });
		const valid = WatchlistService.validateWatchlist(watchlist);
		if (valid.status === 'error') {
			return this.setState({ error: valid.msg });
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
		const watchlist = this.props.selected;
		this.setState({			
			editedWatchlist: null,
			adding: false,
			editing: false,
			deleting: false,
			saving: false,
			error: null
		});
		removeOp(WATCHLIST, { op: 'CREATE' });
		removeOp(WATCHLIST, { watchlist, op: 'EDIT' });
		removeOp(WATCHLIST, { watchlist, op: 'DELETE' });
	};

	render() {
		const { editedWatchlist, adding, editing, deleting, saving, error } = this.props;
		const { selected, watchlists } = this.props;
		const isViewState = !adding && !editing && !deleting;
		const Title = (
			<Header
				showAdd={isViewState}
				showEdit={!!selected && isViewState}
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
						selected={selected}
						onClick={this.props.actions.selectWatchlist}
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
	const watchlistOp = selectOps(state, WATCHLIST);
	let opState = {};
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
		selected: selectSelectedWatchlist(state),
		...opState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...watchlistsActions, ...opsActions }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistsContainer);
