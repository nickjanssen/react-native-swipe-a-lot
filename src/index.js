import React, {
  Component,
} from 'react'
import ReactNative, {
  Platform,
  ScrollView,
  View,
  ViewPagerAndroid,
  ViewPropTypes,
} from 'react-native'
import {PropTypes} from 'prop-types'

import Circles from './Circles'
import FixedSizeView from './FixedSizeView'
import reducer from './reducer'

import { createStore } from 'redux'

import { EventEmitter } from 'events'

export default class SwipeALot extends Component {
  constructor(props) {
    super(props)

    this.store = createStore(reducer)
    this.emitter = new EventEmitter()

    this.autoplayInterval = null
    this.autoplayPageCurrentlyBeingTransitionedTo = 0
  }

  getAutoplaySettings() {
    // This seems to be the recommended way to setup default props with nested objects
    // See https://github.com/facebook/react/issues/2568
    return Object.assign({
      enabled: false,
      disableOnSwipe: false,
      delayBetweenAutoSwipes: 5000
    }, this.props.autoplay)
  }

  onSetActivePage(page) {
    if (this.props.onSetActivePage) {
      this.props.onSetActivePage(page)
    }
  }

  componentDidMount() {

    this.store.dispatch({
      type: 'SET_ACTIVE_PAGE',
      page: 0
    })

    this.swipeToPageListener = ({ page }) => {
      this.store.dispatch({
        type: 'SET_ACTIVE_PAGE',
        page
      })

      if (Platform.OS === 'android') {
        this.swiper.setPage(page)
      }
      else {
        const { width } = this.store.getState()
        this.swiper.scrollTo({
          x: page * width
        })
      }

      this.onSetActivePage(page)
      if (this.getAutoplaySettings().disableOnSwipe &&
        this.autoplayPageCurrentlyBeingTransitionedTo !== page) {
        this.stopAutoplay()
      }
    }

    this.emitter.addListener('swipeToPage', this.swipeToPageListener)

    if (this.getAutoplaySettings().enabled) {
      this.startAutoplay()
    }
  }

  componentWillUnmount() {
    this.emitter.removeListener('swipeToPage', this.swipeToPageListener)
  }

  startAutoplay() {
    if (this.autoplayInterval) return

    this.autoplayInterval = setInterval(() => {
      let { page } = this.store.getState()
      const numOfPages = this.props.children.length || 1
      page++
      if (page >= numOfPages) page = 0
      this.swipeToPage(page)
      this.autoplayPageCurrentlyBeingTransitionedTo = page
    }, this.getAutoplaySettings().delayBetweenAutoSwipes)
  }

  stopAutoplay() {
    if (!this.autoplayInterval) return

    clearInterval(this.autoplayInterval)
  }

  getPage() {
    let { page } = this.store.getState()
    return page
  }

  swipeToPage(page) {
    this.emitter.emit('swipeToPage', { page })
  }

  static get propTypes() {
    return {
      wrapperStyle: PropTypes.object,
      circleWrapperStyle: ViewPropTypes.style,
      circleDefaultStyle: ViewPropTypes.style,
      circleActiveStyle: ViewPropTypes.style,
      children: PropTypes.any,
      emitter: PropTypes.object,
      autoplay: PropTypes.object,
      onSetActivePage: PropTypes.func,
    }
  }

  render() {
    return (
      <View style={[this.props.wrapperStyle, {flex: 1}]} onLayout={() => {
          const page = this.getPage()
          this.swipeToPage(page)
        }}>
        {(() => {
          if (Platform.OS === 'ios') {
            return (
              <ScrollView
                ref={(c) => this.swiper = c}
                pagingEnabled={true}
                horizontal={true}
                bounces={false}
                removeClippedSubviews={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  const { width } = this.store.getState()
                  const page = e.nativeEvent.contentOffset.x / width
                  this.swipeToPage(page)
                }}
                onLayout={(event) => {
                  const {x, y, width, height} = event.nativeEvent.layout
                  this.store.dispatch({
                    type: 'SET_DIMS',
                    width,
                    height
                  })
                }}
                automaticallyAdjustContentInsets={false}>
                {React.Children.map(this.props.children, (c, i) => {
                  return <FixedSizeView store={this.store} key={`view${i}`}>{c}</FixedSizeView>
                })}
              </ScrollView>
            )
          }
          else if (Platform.OS === 'android') {
            return (
              <ViewPagerAndroid
                ref={(c) => this.swiper = c}
                initialPage={0}
                onPageSelected={(e) => {
                  this.swipeToPage(e.nativeEvent.position)
                }}
                style={{
                  flex: 1
                }}>
                {React.Children.map(this.props.children, (c) => {
                  return <View>{c}</View>
                })}
              </ViewPagerAndroid>
            )
          }
        })()}
        <Circles store={this.store} emitter={this.emitter}
          circleWrapperStyle={this.props.circleWrapperStyle}
          circleDefaultStyle={this.props.circleDefaultStyle}
          circleActiveStyle={this.props.circleActiveStyle}>
          {this.props.children}
        </Circles>
      </View>
    )
  }
}
