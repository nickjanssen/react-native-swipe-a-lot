
import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

class FixedSizeView extends Component {
  static get propTypes() {
    return {
      store: PropTypes.object,
      children: PropTypes.object
    }
  }

  componentDidMount() {
    const { store } = this.props
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { width, height } = this.props.store.getState()

    return (
      <View style={{width, height}}>
        {this.props.children}
      </View>
    )
  }
}

export default FixedSizeView
