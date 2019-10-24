import { SELECT_CATEGORY, SET_VIDEOMODE } from "../actions/types";
const INITIAL_STATE_SALSA = {
  categorySelected: ""
};

export default (state = INITIAL_STATE_SALSA, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return { ...state, categorySelected: action.payload };
    case SET_VIDEOMODE:
      return { ...state, isVideoMode: action.payload };
    default:
      return state;
  }
};
