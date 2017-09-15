import getOpKey from '../../utils/getOpKey';

export default function selectOps(state, scope, payload) {
	if (payload) {
		const opKey = getOpKey(scope, payload);
		return state.opsByKey[opKey];
	}
	return Object.values(state.opsByKey).filter(op => op.scope === scope);
}
