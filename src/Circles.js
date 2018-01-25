
import React, { Component } from 'react'
import {
  PixelRatio,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native'
import {PropTypes} from 'prop-types'

const styles = {
  circleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: PixelRatio.getPixelSizeForLayoutSize(16),
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'center',
  },
  circleDefault: {
    width: PixelRatio.getPixelSizeForLayoutSize(6),
    height: PixelRatio.getPixelSizeForLayoutSize(6),
    margin: 10,
    backgroundColor: 'rgb(158, 158, 158)',
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(3)
  },
  circleActive: {
    backgroundColor: 'rgb(245, 245, 245)',
  }
}
class Circles extends Component {
  static get propTypes() {
    return {
      store: PropTypes.object,
      emitter: PropTypes.object,
      circleWrapperStyle: ViewPropTypes.style,
      circleDefaultStyle: ViewPropTypes.style,
      circleActiveStyle: ViewPropTypes.style,
      children: PropTypes.any
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
    const selectedPage = this.props.store.getState().page

    return (
      <View style={[styles.circleWrapper, this.props.circleWrapperStyle]} pointerEvents='box-none'>
        {React.Children.map(this.props.children, (c, i) => {
          return (
            <TouchableWithoutFeedback key={`circle${i}`} onPress={() => {
              this.props.emitter.emit('swipeToPage', {
                page: i
              })
            }}>
              <View>
                <View
                style={[styles.circleDefault,
                  this.props.circleDefaultStyle,
                  i === selectedPage && styles.circleActive,
                  i === selectedPage && this.props.circleActiveStyle]}>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    )
  }
}

export default Circles
