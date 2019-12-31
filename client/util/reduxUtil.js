const makeActionCreator = type => payload => {
  const action = { type, payload };

  return action;
};

const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => {
  if (action.type in handlers) {
    return handlers[action.type](state, action);
  }
  return state;
};

const createRequestTypes = actionType => ({
  REQUEST: `${actionType}_REQUEST`,
  SUCCESS: `${actionType}_SUCCESS`,
  FAILURE: `${actionType}_FAILURE`
});

const makeAsyncActionCreator = ({ REQUEST, SUCCESS, FAILURE }) => ({
  request: payload => ({
    type: REQUEST,
    payload
  }),
  success: payload => ({
    type: SUCCESS,
    payload
  }),
  failure: payload => ({
    type: FAILURE,
    payload
  })
});

export {
  makeActionCreator,
  createReducer,
  createRequestTypes,
  makeAsyncActionCreator
};
