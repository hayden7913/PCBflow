import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'reduxFiles/store';
import './Modal.css';
 
export default class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget);
    this._render();
  }
  
  componentDidUpdate() {
    this._render();
  }
  
  componentWillUnmount() {
      ReactDOM.unmountComponentAtNode(this.modalTarget);
      document.body.removeChild(this.modalTarget);
  }
  
  _render() {
    ReactDOM.render(
      <Provider store={store}>
        <div>{this.props.children}</div>
      </Provider>,
      this.modalTarget
    );
  }
  
  render() {
    return <noscript />;
  }
}
