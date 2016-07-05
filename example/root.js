import React, { PropTypes } from 'react'

import { View, Text, Image } from 'react-native'

import SwipeALot from '../src/index'

const styles = {
  wrapper: {
    flex: 1,
  },
  image: {
    flex: 1,
    // tintColor: 'blue',
    // resizeMode: 'cover',
    // justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null
  },
  titleBase: {

    // bottom: 100,
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width:1, height: 1}
  }
}

export default class Root extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <SwipeALot autoplay={{
            enabled: true,
            disableOnSwipe: true
          }}>
          <View style={styles.wrapper}>
            <Image
              style={styles.image}
              source={require('./images/1.jpg')}
            >
              <Text style={[styles.titleBase, {
                  top: 30
                }]}>Simple Swiping Component.</Text>
            </Image>
          </View>
          <View style={styles.wrapper}>
            <Image
              style={styles.image}
              source={require('./images/2.jpg')}
            >
              <Text style={[styles.titleBase, {color: 'gold', textShadowColor: 'black', top: 120}]}>Support for iOS{'\n'}and Android.</Text>
            </Image>
          </View>
          <View style={styles.wrapper}>
            <Image
              style={styles.image}
              source={require('./images/3.jpg')}
            >
              <View style={{
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: 0,
                  top: 30,
                  alignItems: 'center',
                }}>
                <Text style={[styles.titleBase, {color: 'rgb(255, 165, 29)', textShadowColor: 'red'}]}>Works with any View!</Text>
              </View>
              <View style={{
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: 40,
                  top: 0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text style={[styles.titleBase, {fontSize: 20}]}>Whether your view is positioned absolutely or takes only a portion of the screen.</Text>
              </View>
            </Image>
          </View>
          <View style={styles.wrapper}>
            <Image
              style={styles.image}
              source={require('./images/4.jpg')}
            >
              <View style={{
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: 0,
                  top: 50,
                  alignItems: 'center',
                }}>
                <Text style={[styles.titleBase, {color: 'cyan', textShadowColor: 'red'}]}>Any device orientation</Text>
              </View>
              <View style={{
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: 80,
                  top: 0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text style={[styles.titleBase, {fontSize: 20}]}>Adjusts itself to landscape/portrait mode when you rotate your phone.</Text>
              </View>
            </Image>
          </View>
          <View style={styles.wrapper}>
            <Image
              style={styles.image}
              source={require('./images/5.jpg')}
            >
              <View style={{
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: 0,
                  top: 50,
                  alignItems: 'center',
                }}>
                <Text style={[styles.titleBase, {color: 'pink', textShadowColor: 'red'}]}>Includes autoplay!</Text>
              </View>
              <View style={{
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: 80,
                  top: 0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text style={[styles.titleBase, {fontSize: 20}]}>Automatically goes to the next slide after a set amount of seconds.</Text>
              </View>
            </Image>
          </View>
        </SwipeALot>
      </View>
    )
  }
}
