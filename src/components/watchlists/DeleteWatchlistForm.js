import React from 'react';
import { instanceOf, func, bool, string } from 'prop-types';
import { Button } from 'react-bootstrap';

import { Watchlist } from '../../services';
import Message from '../common/Message';

const msgClasses = {
	error: 'msg text-center text-danger',
	info: 'msg text-center text-info'
};

DeleteWatchlistForm.propTypes = {
	watchlist: instanceOf(Watchlist).isRequired,
	onDelete: func.isRequired,
	onClose: func.isRequired,
	saving: bool,
	error: string
};

export default function DeleteWatchlistForm({ watchlist, saving = false, onDelete, onClose, error = null }) {
	const msg = saving ? `Deleting ${watchlist.name}...please wait.` : `  Delete '${watchlist.name}' watchlist?  `;
	const msgClass = saving ? msgClasses.info : msgClasses.error;

	return (
		<div>
			<div className="text-center" style={{ margin: '10px' }}>
				<Message msgtext={msg} msgclass={msgClass} />
			</div>
			<div className="text-center">
				<Button
					bsStyle="danger"
					bsSize="xsmall"
					style={{ marginLeft: '5px' }}
					onClick={onDelete}
					disabled={saving}
				>
					Yes
				</Button>
				<Button
					bsStyle="default"
					bsSize="xsmall"
					style={{ marginLeft: '5px' }}
					onClick={onClose}
					disabled={saving}
				>
					No
				</Button>
			</div>
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<Message msgtext={error} msgclass={msgClass} />
			</div>
		</div>
	);
}
