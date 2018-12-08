import {
  BUS_SEARCH_BEGIN,
  BUS_SEARCH_SUCCESS,
  BUS_SEARCH_FAILURE
} from "../constants/action-types";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function searchReducer(state = initialState, action) {
  switch(action.type) {
    case BUS_SEARCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case BUS_SEARCH_SUCCESS:
      return {
        ...state,
        items: action.payload.busBudSearchResults,
        loading: false,
        error: null
      };

    case BUS_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}