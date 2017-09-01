import React, { Component } from 'react';
import { func, instanceOf, object, objectOf } from 'prop-types';
import { Panel } from 'react-bootstrap';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectWatchlists from '../../redux/selectors/selectWatchlists';
import selectWatchlistOp from '../../redux/selectors/selectWatchlistOp';
// deps
import { Watchlist } from '../../services';
import * as watchlistsActions from '../../redux/actions/watchlistsActions';
import WatchlistForm from './WatchlistForm';
import DeleteWatchlistForm from './DeleteWatchlistForm';
import Header from './WatchlistsHeader';
import Watchlists from './Watchlists';
import Message from '../common/Message';

class WatchlistsContainer extends Component {
	static propTypes = {
		watchlists: objectOf(instanceOf(Watchlist)),
		selected: instanceOf(Watchlist),
		onChangeSelection: func,
		asyncOp: object
	};

	static defaultProps = {
		watchlists: {},
		selected: null,
		onChangeSelection: () => {},
		asyncOp: null
	};

	state = {
		editedWatchlist: null,
		editing: false,
		adding: false,
		deleting: false,
		saving: false,
		error: null
	};

	componentDidMount() {
		this.setCompState(this.props);
	}

	componentWillReceiveProps(newProps) {
		this.setCompState(newProps);
	}

	setCompState = props => {
		let { asyncOp, selected } = props;
		if (asyncOp) {
			let { op, status, error } = asyncOp;
			let editedWatchlist = asyncOp.watchlist;
			let saving = status === 'pending' ? true : false;
			this.setState(() => ({
				editedWatchlist,
				adding: op === 'CREATE',
				editing: op === 'EDIT',
				deleting: op === 'DELETE',
				saving,
				error
			}));
		} else {
			this.setState(prevState => {
				return {
					editedWatchlist: selected,
					adding: false,
					editing: false,
					deleting: false,
					saving: false,
					error: null
				};
			});
		}
	};

	onChangeSelection = wl => {
		this.props.actions.selectWatchlist(wl);
	};

	onAddClick = () => {
		this.setState(
			() => ({
				adding: true,
				editedWatchlist: new Watchlist()
			}),
			() => this.props.actions.initAsyncOp(this.state.editedWatchlist, 'CREATE')
		);
	};

	onEditClick = () => {
		this.setState(
			() => ({
				editing: true,
				editedWatchlist: Object.assign(new Watchlist(), this.props.selected)
			}),
			() => this.props.actions.initAsyncOp(this.state.editedWatchlist, 'EDIT')
		);
	};

	onDeleteClick = () => {
		this.setState(
			() => ({
				deleting: true
			}),
			() => this.props.actions.initAsyncOp(this.state.editedWatchlist, 'DELETE')
		);
	};

	onSave = wl => {
		this.state.adding ? this.props.actions.createWatchlist(wl) : this.props.actions.editWatchlist(wl);
	};

	onDelete = () => {
		this.props.actions.deleteWatchlist(this.state.editedWatchlist);
		this.props.onChangeSelection(null);
	};

	onCancel = () => {
		this.setState({
			editing: false,
			deleting: false,
			saving: false,
			error: null
		});
		this.props.actions.resetAsyncOp();
	};

	render() {
		let { editedWatchlist, adding, editing, deleting, saving, error } = this.state;
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
				{Object.keys(watchlists).length === 0 && isViewState && emptylistMsg}

				{isViewState &&
					<Watchlists
						items={watchlists}
						selectedItem={this.props.selected}
						onClick={this.onChangeSelection}
					/>}

				{(adding || editing) &&
					<WatchlistForm
						watchlist={editedWatchlist}
						saving={saving}
						error={error}
						onSave={this.onSave}
						onClose={this.onCancel}
					/>}

				{deleting &&
					<DeleteWatchlistForm
						watchlist={editedWatchlist}
						saving={saving}
						onDelete={this.onDelete}
						onClose={this.onCancel}
					/>}

				<div>
					<Message
						msgtext={this.state.msg}
						msgclass={this.state.msgClass}
						msgstyle={{ background: '#222230', display: 'block' }}
					/>
				</div>
			</Panel>
		);
	}
}

function mapStateToProps(state) {
	return {
		watchlists: selectWatchlists(state),
		selected: selectWatchlists(state)[state.selectedWatchlist],
		asyncOp: selectWatchlistOp(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(watchlistsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistsContainer);
