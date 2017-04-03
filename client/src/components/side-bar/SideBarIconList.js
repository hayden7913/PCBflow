import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import SideBarIcon from './SideBarIcon';
import { modulesData } from 'components/modules/modulesData'

function SideBarIconList(props) {
  const { moduleBank } = props;
  const iconList =  modulesData.map((module, index) => {
    return (
      <SideBarIcon 
        key={index} 
        moduleData = {module}
        toggleDraggingToBoard = {props.toggleDraggingToBoard}
        toggleIsClicked={props.toggleIsClicked}
      /> 
    )
  });
  
  const style = {
    "magrin": "10px auto"
  }
  
  return (
    <div style={style}>
      {iconList}
    </div>
  )
}  
  
const mapStateToProps = (state, props) => ({
  moduleBank: state.moduleBank
});

export default connect(mapStateToProps)(SideBarIconList);