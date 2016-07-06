# SwipeALot

A swipe component for React Native that works on iOS and Android.

![](http://i.imgur.com/P11FPpR.gif)

#### Table of Contents

* [Why create this?](#why-create-this)
* [Features](#features)
* [Getting started](#getting-started)
* [Running the demo](#running-the-demo)
* [Configuration](#configuration)
* [API](#api)
  * [How to use](#how-to-use)
  * [Methods](#methods)
* [License](#license)

## Why create this?

I've found existing swiping components to be buggy and not working fully on both platforms.

## Features

* Autoplay
* Horizontal swiping
* Works when orientation changes
* Cross-platform
* Works with any view size
* Custom styling
* Pressable circle buttons
* API

## Getting started

Install the npm package.

```
npm i react-native-swipe-a-lot --save-dev
```

Import the SwipeALot component wherever you'd like to use it.

```
import SwipeALot from 'react-native-swipe-a-lot'
```

In your render method, simply use it as a wrapper around Views.

```
class Root extends React.Component {
  render() {
    return (
      <SwipeALot>
        <View>
          <Text>This is slide 1</Text>
        </View>
        <View>
          <Text>This is slide 2</Text>
        </View>  
      </SwipeALot>
    )
  }
}
```

## Running the demo

First run `npm install`

Then simply run `react-native run-android` or `react-native run-ios`

## Configuration

You can pass these props to the component:

`autoplay` makes the component automatically swipe to other pages. It is disabled by default. Pass an object as a prop here to configure it:

```
{
  enabled: false,
  disableOnSwipe: false,
  delayBetweenAutoSwipes: 5000
}
```

`wrapperStyle` defines how the container that contains the swiping views looks. By default no styling is applied.

`circleDefaultStyle` defines how the inactive circles on your swiper component look. You can pass an object here with style properties that you wish to override.

Default style:
```
{
  width: PixelRatio.getPixelSizeForLayoutSize(6),
  height: PixelRatio.getPixelSizeForLayoutSize(6),
  margin: 10,
  backgroundColor: 'rgb(158, 158, 158)',
  borderRadius: PixelRatio.getPixelSizeForLayoutSize(3)
}
```

`circleActiveStyle` defines how the active circle on your swiper component looks. You can pass an object here with style properties that you wish to override.

Default style:
```
{
  backgroundColor: 'rgb(245, 245, 245)',
}
```

## API

### How to use

Simply save a reference to your component and then call these methods from anywhere in your app.

You can save a reference like this:

```
<SwipeALot ref={(c) => this.swiper = c}>
```

Then simply call the following methods on your variable, e.g. `this.swiper.swipeToPage(1)`

### Methods

`getPage()`

Gets the current page index

`swipeToPage(page)`

 Jump to a page. This can be used to overlay buttons on top that

`stopAutoplay()`

Stops Autoplay.

`startAutoplay()`

Starts Autoplay.


## License

MIT
