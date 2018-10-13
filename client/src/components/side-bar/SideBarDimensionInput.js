import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { minWidth, minHeight } from '../../constants/boardConstants';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import './side-bar-styles/_SideBarDimensionInput.scss';

class SideBarDimensionInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      widthInputVal: null,
      heightInputVal: null,
    }

    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { boardWidth: lastWidth, boardHeight: lastHeight,  } = prevProps;
    const { boardWidth: nextWidth, boardHeight: nextHeight, } = this.props;

    if (
      lastWidth !== nextWidth
      && nextWidth > minWidth
    ) {
      this.setState({ widthInputVal: nextWidth})
    }

    if (
      lastHeight !== nextHeight
      && nextHeight > minHeight
    ) {
      this.setState({ heightInputVal: nextHeight})
    }
  }

  validate(value) {

    if (isNaN(value)) {
      return '';
    }

    if (Number(value) > 1000) {
      return 1000;
    }

    return Number(value);
  }

  handleWidthChange(event) {
    const {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      boardHeight,
      boardDimensions,
    } = this.props;

    const targetValue = event.target.value;
    const newBoardWidth = this.validate(targetValue);
    const height = boardHeight;
    const width = newBoardWidth;

    const anchorPositions = {
      topLeft: { x: topLeft.x, y: topLeft.y },
      topRight: { x: topLeft.x + width, y: topRight.y },
      bottomLeft: { x: bottomLeft.x, y: topLeft.y + height },
      bottomRight: { x: bottomLeft.x + width, y: topRight.y + height },
    };

    this.setState({ widthInputVal: newBoardWidth });

    if (newBoardWidth >= minWidth) {
      store.dispatch(actions.updateBoardDimensions({ width, height }));
      store.dispatch(actions.updateAnchorPositions(anchorPositions));
      store.dispatch(actions.triggerAnchorUpdate());
    }
  }

  handleHeightChange(event) {
    const {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      boardWidth,
    } = this.props;

    const targetValue = event.target.value;
    const newBoardHeight = this.validate(targetValue);
    const width = boardWidth;
    const height = newBoardHeight;

    const anchorPositions = {
      topLeft: { x: topLeft.x, y: topLeft.y },
      topRight: { x: topLeft.x + width, y: topRight.y },
      bottomLeft: { x: bottomLeft.x, y: topLeft.y + height },
      bottomRight: { x: bottomLeft.x + width, y: topRight.y + height },
    };

    this.setState({ heightInputVal: newBoardHeight});

    if (newBoardHeight >= minHeight) {
      store.dispatch(actions.updateBoardDimensions({ width, height }));
      store.dispatch(actions.updateAnchorPositions(anchorPositions));
      store.dispatch(actions.triggerAnchorUpdate());
    }
  }

  render() {
    const { boardWidth, boardHeight } = this.props;
    const { widthInputVal, heightInputVal } = this.state;

    return (
      <form className="dimension-input-form">
        <div className="dimension-bar">Dimensions</div>
        <div className="dimension-input-wrapper">
          <div className="input-wrapper">
            <input
              type="text"
              className="width-input dimension-input"
              value={widthInputVal === null ? boardWidth : widthInputVal}
              onChange={this.handleWidthChange}
            />
            <label htmlFor="width">Width</label>
          </div>
          <div className="input-wrapper">
            <input
              className="height-input dimension-input"
              type="text"
              value={heightInputVal === null ? boardHeight : heightInputVal}
              onChange={this.handleHeightChange}
            />
            <label htmlFor="height">Height</label>
          </div>
        </div>
      </form>

    );
  }
}

const mapStateToProps = state => ({
  boardWidth: state.boardSpecs.width,
  boardHeight: state.boardSpecs.height,
  topLeft: state.anchorPositions.topLeft,
  topRight: state.anchorPositions.topRight,
  bottomLeft: state.anchorPositions.bottomLeft,
  bottomRight: state.anchorPositions.bottomRight,
});

export default connect(mapStateToProps)(SideBarDimensionInput);

SideBarDimensionInput.propTypes = {
  boardWidth: PropTypes.number,
  boardHeight: PropTypes.number,
  topLeft: PropTypes.object.isRequired,
  topRight: PropTypes.object.isRequired,
  bottomLeft: PropTypes.object.isRequired,
  bottomRight: PropTypes.object.isRequired,
};
