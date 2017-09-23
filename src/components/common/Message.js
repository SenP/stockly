import React from 'react';
import { string, object } from 'prop-types';

Message.propTypes = {
	msgtext: string,
	msgclass: string,
	msgstyle: object
};

function Message({ msgtext, msgclass, msgstyle }) {
	return (
		!!msgtext && (
			<span className={msgclass} style={msgstyle}>
				{msgtext}
			</span>
		)
	);
}
export default Message;
