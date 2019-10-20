import { fromJS } from "immutable";
import actionTypes from "../actions/types";
const initialState = fromJS({
  count: 10
});

export default (state = initialState, { type }) => {
  switch (type) {
    case actionTypes.DECREASE:
      // return state.update("count", v => v - 1);
      return state.updateIn(["count"], v => v - 1);

    default:
      return state;
  }
};
