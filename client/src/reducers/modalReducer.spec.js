/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actions from 'actions/indexActions';
import { modal } from './modalReducer';

describe('modal reducer', () => {
    // Fetch Basic Info about User
  it('It should return the correct boolean', () => {
    const initialState = {
      showModal: false,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const expectedState = {
      showModal: true,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const resultState = modal(deepFreeze(initialState), {
      type: 'TOGGLE_MODAL',
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should return updated modalProps', () => {
    const initialState = {
      showModal: false,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const expectedState = {
      showModal: false,
      modalType: 'ONBOARD',
      modalProps: {
        color: 'red',
        text: 'hello',
      },
    };

    const resultState = modal(deepFreeze(initialState), {
      type: 'UPDATE_MODAL_PROPS',
      modalProps: {
        color: 'red',
        text: 'hello',
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update state for project delete confirmation', () => {
    const initialState = {
      showModal: false,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const expectedState = {
      showModal: true,
      modalType: 'CONFIRM',
      modalProps: {
        color: 'red',
        text: 'hello',
      },
    };

    const resultState = modal(deepFreeze(initialState), {
      type: 'CONFIRM_PROJECT_DELETE',
      modalProps: {
        color: 'red',
        text: 'hello',
      },
    });

    assert.deepEqual(resultState, expectedState);
  });

  it('It should update update the modal type', () => {
    const initialState = {
      showModal: false,
      modalType: 'ONBOARD',
      modalProps: null,
    };

    const expectedState = {
      showModal: false,
      modalType: 'CONFIRM',
      modalProps: null,
    };

    const resultState = modal(deepFreeze(initialState), {
      type: 'CHANGE_MODAL_TYPE',
      modalType: 'CONFIRM',
    });

    assert.deepEqual(resultState, expectedState);
  });
});
