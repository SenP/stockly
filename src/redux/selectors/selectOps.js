import getOpKey from '../../utils/getOpKey';

export default ({ opsByKey }, scope, payload) => {
	if (payload) {
		const opKey = getOpKey(scope, payload);
		return opsByKey[opKey];
	}
	const opKey = Object.keys(opsByKey).filter(key => key.startsWith(scope));
	return opKey.length > 0 ? opsByKey[opKey[0]] : null;
};
