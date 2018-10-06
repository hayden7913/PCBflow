import * as actions from 'actions/indexActions';
import { moduleData } from '../config/moduleData';

const defaultState = {
  show: false,
}

export const contextMenu = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE_IS_CONTEXT_MENU_OPEN:
      return {
        show: !state.show,
      };
    default:
      return state;
  }
};
