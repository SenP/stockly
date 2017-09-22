import { bool, func, instanceOf, string } from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
// deps
import { Watchlist } from '../../services';
import Message from '../common/Message';

const msgClasses = {
	error: 'msg text-center text-danger',
	info: 'msg text-center text-info'
};
const MsgStyle = { textAlign: 'center', marginTop: '20px' };
const BtnStyle = { marginLeft: '5px' };

DeleteWatchlistForm.propTypes = {
	watchlist: instanceOf(Watchlist).isRequired,
	onDelete: func.isRequired,
	onClose: func.isRequired,
	saving: bool,
	error: string
};

function DeleteWatchlistForm({ watchlist, saving = false, onDelete, onClose, error = null }) {
	const msg = saving ? `Deleting ${watchlist.name}...please wait.` : `  Delete '${watchlist.name}' watchlist?  `;
	const msgClass = saving ? msgClasses.info : msgClasses.error;

	return (
		<div>
			<div className="text-center" style={{ margin: '10px' }}>
				<Message msgtext={msg} msgclass={msgClass} />
			</div>
			<div className="text-center">
				<Button bsStyle="danger" bsSize="xsmall" style={BtnStyle} onClick={onDelete} disabled={saving}>
					Yes
				</Button>
				<Button bsStyle="default" bsSize="xsmall" style={BtnStyle} onClick={onClose} disabled={saving}>
					No
				</Button>
			</div>
			<div style={MsgStyle}>
				<Message msgtext={error} msgclass={msgClass} />
			</div>
		</div>
	);
}

export default DeleteWatchlistForm;
