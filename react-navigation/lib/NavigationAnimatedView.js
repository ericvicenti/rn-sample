/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var NavigationPropTypes=require('./NavigationPropTypes');
var NavigationScenesReducer=require('./NavigationScenesReducer');
var React=require('react');var _require=




require('react-native');var Animated=_require.Animated;var StyleSheet=_require.StyleSheet;var View=_require.View;var 

























PropTypes=React.PropTypes;

function applyDefaultAnimation(
position,
navigationState)
{
Animated.spring(
position,
{
bounciness:0,
toValue:navigationState.index}).

start();}var 


NavigationAnimatedView=function(_React$Component){_inherits(NavigationAnimatedView,_React$Component);




















function NavigationAnimatedView(props,context){_classCallCheck(this,NavigationAnimatedView);


// The initial layout isn't measured. Measured layout will be only available
// when the component is mounted.
var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(NavigationAnimatedView).call(this,props,context));var layout={
height:new Animated.Value(0),
initHeight:0,
initWidth:0,
isMeasured:false,
width:new Animated.Value(0)};


_this.state={
layout:layout,
position:new Animated.Value(_this.props.navigationState.index),
scenes:NavigationScenesReducer([],_this.props.navigationState)};return _this;}_createClass(NavigationAnimatedView,[{key:'componentWillMount',value:function componentWillMount()



{
this._onLayout=this._onLayout.bind(this);
this._onProgressChange=this._onProgressChange.bind(this);}},{key:'componentDidMount',value:function componentDidMount()


{
this._positionListener=
this.state.position.addListener(this._onProgressChange);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
if(nextProps.navigationState!==this.props.navigationState){
this.setState({
scenes:NavigationScenesReducer(
this.state.scenes,
nextProps.navigationState,
this.props.navigationState)});}}},{key:'componentDidUpdate',value:function componentDidUpdate(





lastProps){
if(lastProps.navigationState.index!==this.props.navigationState.index){
this.props.applyAnimation(
this.state.position,
this.props.navigationState,
lastProps.navigationState);}}},{key:'componentWillUnmount',value:function componentWillUnmount()




{
this.state.position.removeListener(this._positionListener);}},{key:'_onProgressChange',value:function _onProgressChange(


data){
var delta=Math.abs(data.value-this.props.navigationState.index);
if(delta>Number.EPSILON){
return;}


var scenes=this.state.scenes.filter(function(scene){
return !scene.isStale;});


if(scenes.length!==this.state.scenes.length){
this.setState({scenes:scenes});}}},{key:'render',value:function render()



{
var overlay=this._renderOverlay();
var scenes=this._renderScenes();
return (
React.createElement(View,{
onLayout:this._onLayout,
style:this.props.style},
React.createElement(View,{style:styles.scenes,key:'scenes'},
scenes),

overlay));}},{key:'_renderScenes',value:function _renderScenes()




{
return this.state.scenes.map(this._renderScene,this);}},{key:'_renderScene',value:function _renderScene(


scene){var _props=



this.props;var navigationState=_props.navigationState;var renderScene=_props.renderScene;var _state=




this.state;var position=_state.position;var scenes=_state.scenes;

return renderScene({
layout:this.state.layout,
navigationState:navigationState,
position:position,
scene:scene,
scenes:scenes});}},{key:'_renderOverlay',value:function _renderOverlay()



{
if(this.props.renderOverlay){var _props2=



this.props;var _navigationState=_props2.navigationState;var _renderOverlay2=_props2.renderOverlay;var _state2=




this.state;var _position=_state2.position;var _scenes=_state2.scenes;

return _renderOverlay2({
layout:this.state.layout,
navigationState:_navigationState,
position:_position,
scene:_scenes[_navigationState.index],
scenes:_scenes});}


return null;}},{key:'_onLayout',value:function _onLayout(


event){var _event$nativeEvent$la=
event.nativeEvent.layout;var height=_event$nativeEvent$la.height;var width=_event$nativeEvent$la.width;

var layout=_extends({},
this.state.layout,{
initHeight:height,
initWidth:width,
isMeasured:true});


layout.height.setValue(height);
layout.width.setValue(width);

this.setState({layout:layout});}}]);return NavigationAnimatedView;}(React.Component);NavigationAnimatedView.propTypes={applyAnimation:PropTypes.func,navigationState:NavigationPropTypes.navigationState.isRequired,renderOverlay:PropTypes.func,renderScene:PropTypes.func.isRequired};NavigationAnimatedView.defaultProps={applyAnimation:applyDefaultAnimation};



var styles=StyleSheet.create({
scenes:{
flex:1}});



module.exports=NavigationAnimatedView;