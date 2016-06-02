/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

const NavigationPropTypes = require('./NavigationPropTypes');
const NavigationScenesReducer = require('./NavigationScenesReducer');
const React = require('react');
const {
  Animated,
} = require('react-native');

import type {
  NavigationActionCaller,
  NavigationAnimatedValue,
  NavigationAnimationSetter,
  NavigationLayout,
  NavigationParentState,
  NavigationScene,
  NavigationSceneRenderer,
} from 'NavigationTypeDefinition';

type Props = {
  applyAnimation: NavigationAnimationSetter,
  navigationState: NavigationParentState,
};

type State = {
  layout: NavigationLayout,
  position: NavigationAnimatedValue,
  scenes: Array<NavigationScene>,
};

const {PropTypes} = React;

function applyDefaultAnimation(
  position: NavigationAnimatedValue,
  navigationState: NavigationParentState,
): void {
  Animated.spring(
    position,
    {
      bounciness: 0,
      toValue: navigationState.index,
    }
  ).start();
}

class NavigationTransitioner
  extends React.Component<any, Props, State> {

  _onLayout: (event: any) => void;
  _onProgressChange: (data: {value: number}) => void;
  _positionListener: any;

  props: Props;
  state: State;

  static propTypes = {
    applyAnimation: PropTypes.func,
    navigationState: NavigationPropTypes.navigationState.isRequired,
    renderOverlay: PropTypes.func,
    renderScene: PropTypes.func.isRequired,
  };

  static defaultProps = {
    applyAnimation: applyDefaultAnimation,
  };

  constructor(props: Props, context: any) {
    super(props, context);

    // The initial layout isn't measured. Measured layout will be only available
    // when the component is mounted.
    const layout = {
      height: new Animated.Value(0),
      initHeight: 0,
      initWidth: 0,
      isMeasured: false,
      width: new Animated.Value(0),
    };

    this.state = {
      layout,
      position: new Animated.Value(this.props.navigationState.index),
      scenes: NavigationScenesReducer([], this.props.navigationState),
    };
  }

  componentWillMount(): void {
    this._onLayout = this._onLayout.bind(this);
    this._onProgressChange = this._onProgressChange.bind(this);
  }

  componentDidMount(): void {
    this._positionListener =
      this.state.position.addListener(this._onProgressChange);
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.navigationState !== this.props.navigationState) {
      this.setState({
        scenes: NavigationScenesReducer(
          this.state.scenes,
          nextProps.navigationState,
          this.props.navigationState
        ),
      });
    }
  }

  componentDidUpdate(lastProps: Props): void {
    if (lastProps.navigationState.index !== this.props.navigationState.index) {
      this.props.applyAnimation(
        this.state.position,
        this.props.navigationState,
        lastProps.navigationState
      );
    }
  }

  componentWillUnmount(): void {
    this.state.position.removeListener(this._positionListener);
  }

  _onProgressChange(data: Object): void {
    const delta = Math.abs(data.value - this.props.navigationState.index);
    if (delta > Number.EPSILON) {
      return;
    }

    const scenes = this.state.scenes.filter(scene => {
      return !scene.isStale;
    });

    if (scenes.length !== this.state.scenes.length) {
      this.setState({ scenes });
    }
  }

  render(): ReactElement {
    const {scenes, position, layout} = this.state;
    const {navigationState} = this.props;
    return this.props.render({
      onLayout: this._onLayout,
      scenes,
      position,
      navigationState,
      layout,
    });
  }

  _onLayout(event: any): void {
    const {height, width} = event.nativeEvent.layout;

    const layout = {
      ...this.state.layout,
      initHeight: height,
      initWidth: width,
      isMeasured: true,
    };

    layout.height.setValue(height);
    layout.width.setValue(width);

    this.setState({ layout });
  }
}

module.exports = NavigationTransitioner;
