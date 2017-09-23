import React from 'react';
import { instanceOf, func, bool } from 'prop-types';
import { Button } from 'react-bootstrap';
// deps
import { Stock } from '../../../services';
import Message from '../../common/Message';

const msgClasses = {
	error: 'msg text-center text-danger',
	info: 'msg text-center text-info'
};

DeleteStockForm.propTypes = {
	stock: instanceOf(Stock).isRequired,
	saving: bool,
	onDelete: func.isRequired,
	onClose: func.isRequired
};

function DeleteStockForm({ stock, saving = false, onDelete, onClose }) {
	const msg = saving ? `Deleting ${stock.name}...please wait.` : `  Delete '${stock.name}' from this watchlist?  `;
	const msgClass = saving ? msgClasses.info : msgClasses.error;

	return (
		<tr>
			<td>{stock.code}</td>
			<td colSpan="8" style={{ textAlign: 'center' }}>
				<span style={{ textAlign: 'center', marginTop: '10px' }}>
					<Message msgtext={msg} msgclass={msgClass} />
				</span>
			</td>
			<td>
				<span>
					<Button
						bsSize="xsmall"
						bsStyle="danger"
						style={{ marginRight: '10px' }}
						onClick={onDelete}
						disabled={saving}
					>
						Yes
					</Button>
					<Button bsSize="xsmall" bsStyle="default" onClick={onClose} disabled={saving}>
						No
					</Button>
				</span>
			</td>
		</tr>
	);
}

export default DeleteStockForm;
