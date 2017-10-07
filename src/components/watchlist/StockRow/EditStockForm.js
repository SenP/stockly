import React from 'react';
import { instanceOf, func, bool, string } from 'prop-types';
import { Button, FormControl } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
// deps
import { Stock } from '../../../services';
import Message from '../../common/Message';

const msgClasses = {
	error: 'msg text-center text-danger',
	info: 'msg text-center text-info'
};
const ButtonStyle = { marginRight: '10px' };
const MsgStyle = { textAlign: 'center', marginTop: '10px' };

EditStockForm.propTypes = {
	stock: instanceOf(Stock).isRequired,
	onChange: func.isRequired,
	onSave: func.isRequired,
	onClose: func.isRequired,
	isFormValid: bool,
	saving: bool,
	error: string
};

function EditStockForm({ stock, onChange, onSave, onClose, isFormValid = false, saving = false, error = null }) {
	const msg = saving ? 'Saving...please wait.' : error;
	const msgClass = saving ? msgClasses.info : msgClasses.error;

	return (
		<tr>
			<td>{stock.code}</td>
			<td className="number-field">
				<FormControl
					type="text"
					name="unitsOwned"
					bsSize="small"
					value={stock.unitsOwned}
					onChange={onChange}
					maxLength={9}
					autoFocus
				/>
			</td>
			<td className="number-field">
				<FormControl
					type="text"
					name="avgPrice"
					bsSize="small"
					value={stock.avgPrice}
					onChange={onChange}
					maxLength={8}
				/>
			</td>
			<td colSpan="7">
				<span className="center-block">
					<Button
						bsSize="small"
						bsStyle="success"
						style={ButtonStyle}
						onClick={onSave}
						disabled={saving || !isFormValid}
					>
						<FontAwesome name="check" />
					</Button>

					<Button bsSize="small" bsStyle="danger" onClick={onClose} disabled={saving}>
						<FontAwesome name="close" />
					</Button>

					<span style={MsgStyle}>
						<Message msgtext={msg} msgclass={msgClass} />
					</span>
				</span>
			</td>
		</tr>
	);
}

export default EditStockForm;
