import React, { PureComponent } from 'react';
import { instanceOf, func, bool, string } from 'prop-types';
import { Panel, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
// deps
import { Stock, QuotesService } from '../../../services';
import Autosuggest from 'react-autosuggest';
import './autoSuggestStyles.css';
import Message from '../../common/Message';

const msgClasses = {
	error: 'msg text-center text-danger',
	info: 'msg text-center text-info'
};
const PanelStyle = { marginBottom: '5px' };
const ButtonStyle = { margin: '0px 5px' };
const MsgStyle = { textAlign: 'center', marginTop: '10px' };

// start - autosuggest helper functions
const getSuggestions = (value, minLength = 0, exact = false) => {
	const inputValue = exact ? value : value.trim().toLowerCase();
	const inputLength = inputValue.length;
	return inputLength <= minLength ? [] : QuotesService.searchTickers(inputValue, exact);
};

const getSuggestionValue = suggestion => suggestion.code;

const renderSuggestion = ticker => (
	<div>
		{ticker.name} <br /> (<em> {ticker.code} </em>)
	</div>
);
// end - autosuggest helper functions

export default class AddStockForm extends PureComponent {
	static propTypes = {
		stock: instanceOf(Stock),
		saving: bool,
		error: string,
		onChange: func.isRequired,
		onSave: func.isRequired,
		onClose: func.isRequired
	};

	state = {
		stock: this.props.stock,
		suggestions: [],
		error: ''
	};

	isFormValid = () => {
		const { stock } = this.state;
		return (
			stock.code &&
			stock.code.trim() !== '' &&
			stock.unitsOwned &&
			stock.unitsOwned > 0 &&
			stock.avgPrice &&
			stock.avgPrice > 0 
		);
	};

	handleChange = ({ target }) => {
		this.setState(
			prevState => ({
				stock: Object.assign(new Stock(), prevState.stock, {
					[target.name]: target.value.trim()
				})
			}),
			() => this.props.onChange(this.state.stock)
		);
	};

	// autosuggest helpers
	onStockSelect = (event, { newValue }) => {
		this.setState(
			prevState => ({
				stock: Object.assign(new Stock(), prevState.stock, {
					code: newValue
				})
			}),
			() => this.props.onChange(this.state.stock)
		);
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({ suggestions: getSuggestions(value) });
	};

	onSuggestionsClearRequested = () => {
		this.setState({ suggestions: [] });
	};
	// end autosuggest helpers

	submitForm = evt => {
		this.setState({ error: '' });
		const error = this.props.onSave(this.state.stock);
		error && this.setState({ error });
	};

	closeForm = () => {
		this.setState({
			stock: new Stock(),
			error: ''
		});
		this.props.onClose();
	};

	render = () => {
		const { saving } = this.props;
		const msg = saving ? 'Saving...please wait.' : this.state.error || this.props.error;
		const msgClass = saving ? msgClasses.info : msgClasses.error;
		const { code = '', name = '', unitsOwned = 0, avgPrice = 0 } = this.state.stock;

		const formTitle = (
			<span style={{ textAlign: 'center' }}>
				<h4>Add Stock</h4>
			</span>
		);

		// autosuggest props
		const { suggestions } = this.state;
		const inputProps = {
			placeholder: 'Enter stock code...',
			value: code,
			onChange: this.onStockSelect,
			className: 'form-control input-sm'
		};

		const renderInputComponent = inputProps => (
			<div>
				<input type="text" name="code" {...inputProps} autoFocus />
			</div>
		);
		// end autosuggest props

		const Spacing = <span>&nbsp;&nbsp;&nbsp;</span>;

		return (
			<Panel header={formTitle} style={PanelStyle}>
				<Form inline>
					<FormGroup>
						<ControlLabel>Stock: </ControlLabel>{' '}
						<Autosuggest
							suggestions={suggestions}
							onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
							onSuggestionsClearRequested={this.onSuggestionsClearRequested}
							getSuggestionValue={getSuggestionValue}
							renderSuggestion={renderSuggestion}
							inputProps={inputProps}
							renderInputComponent={renderInputComponent}
						/>
						<span>
							<em>{name}</em>
						</span>
					</FormGroup>
					{Spacing}

					<FormGroup>
						<ControlLabel>Units Owned: </ControlLabel>{' '}
						<FormControl
							type="text"
							name="unitsOwned"
							bsSize="small"
							value={unitsOwned}
							onChange={this.handleChange}
						/>
					</FormGroup>
					{Spacing}

					<FormGroup>
						<ControlLabel> Buy Price: $ </ControlLabel>{' '}
						<FormControl
							type="text"
							name="avgPrice"
							bsSize="small"
							value={avgPrice}
							onChange={this.handleChange}
						/>
					</FormGroup>
					{Spacing}

					<span>
						<Button
							type="button"
							bsStyle="success"
							bsSize="small"
							onClick={this.submitForm}
							disabled={saving || !this.isFormValid()}
							style={ButtonStyle}
						>
							Submit
						</Button>
						<Button
							type="button"
							bsStyle="danger"
							bsSize="small"
							onClick={this.closeForm}
							disabled={saving}
						>
							Cancel
						</Button>
					</span>
					<div style={MsgStyle}>
						<Message msgtext={msg} msgclass={msgClass} />
					</div>
				</Form>
			</Panel>
		);
	};
}
