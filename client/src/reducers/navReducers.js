import * as actions from '../actions/indexActions';
import { moduleData } from '../config/moduleData';

const defaultState = {
  showSavingMessage: false,
}

export const nav = (state = defaultState, action) => {
  switch (action.type) {
    // change to update entity request
    case actions.UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        showSavingMessage: true,
      };
    case actions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        showSavingMessage: false,
      };
    default:
      return state;
  }
};
