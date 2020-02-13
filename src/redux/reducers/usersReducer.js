import actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  loading: false,
  user: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER: {
      return { ...initialState, loading: true };
    }
    case actionTypes.GET_USER_SUCCESS: {
      return { ...state, user: action.payload, loading: false };
    }
    case actionTypes.GET_USER_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    }
    case actionTypes.RESET_USER_SEARCH: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}
