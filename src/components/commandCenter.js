'use strict'

import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'

import * as constants from '../constants.js'
import * as actions from '../actions'

const TEXTINPUT_REF = 'urlInput';

class CommandCenter extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onCommandPress}
        activeOpacity={0.8}
      >
      <View
        style={[
          styles.addressBar,
          this.props.mode == constants.MODE_NAVIGATION &&
          styles.addressBarNavigation,
          this.props.mode == constants.MODE_COMMAND &&
          styles.addressBarCommand,
        ]}
        onClick={this.onClick}
      >
        <Text style={[
          styles.urlText,
          this.props.mode == constants.MODE_NAVIGATION &&
          styles.urlTextNavigation,
          this.props.mode == constants.MODE_COMMAND &&
          styles.urlTextCommand,
        ]}>Test</Text>
        <TextInput
          ref={TEXTINPUT_REF}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="web-search"
          defaultValue={''}
          onSubmitEditing={this.onSubmitEditing}
          onChange={this.handleTextInputChange}
          clearButtonMode="while-editing"
          style={[
            styles.textInput,
            this.props.mode == constants.MODE_NAVIGATION &&
            styles.textInputNavigation,
            this.props.mode == constants.MODE_COMMAND &&
            styles.textInputCommand,
          ]}
        />
      </View>
      </TouchableOpacity>
    );
  }

  onSubmitEditing = (event) => {
    this.props.onInputSubmit();
  };

  handleTextInputChange = (event) => {
    //console.log('!!!! EVENT', event)
  };
}

CommandCenter.propTypes = {
  mode: PropTypes.string.isRequired,
  onCommandPress: PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
  addressBar: {
    backgroundColor: '#000'
  },
  addressBarNavigation: {
    height: constants.HEIGHT_CC_NAVIGATION,
    alignItems: 'center',
  },
  addressBarCommand: {
    height: constants.HEIGHT_CC_COMMAND,
  },
  urlText: {
    height: constants.HEIGHT_CC_NAVIGATION,
    color: 'white',
    fontSize: 15,
    paddingTop: 5,
    fontWeight: '600',
  },
  urlTextNavigation: {
  },
  urlTextCommand: {
    opacity: 0,
    height: 0,
  },
  textInput: {
    backgroundColor: '#000',
    color: 'white',
    fontSize: 15,
  },
  textInputNavigation: {
    height: constants.HEIGHT_CC_NAVIGATION,
    opacity: 0,
  },
  textInputCommand: {
    height: constants.HEIGHT_CC_COMMAND-4,
    opacity: 1,
  }
})

export default connect(
  (state, props) => ({
    mode: state.mode,
  }),
  (dispatch) => ({
    onCommandPress: () => dispatch(actions.commandShow()),
    onComandInput: (input) => dispatch(actions.commandInput(input)),
    onInputSubmit: () => dispatch(actions.commandSelect(0)),
  })
)(CommandCenter)