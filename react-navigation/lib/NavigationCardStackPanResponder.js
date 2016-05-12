/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @typechecks
 */
'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _require=

require('react-native');var Animated=_require.Animated;
var NavigationAbstractPanResponder=require('./NavigationAbstractPanResponder');

function clamp(min,value,max){
if(value<min){
return min;}

if(value>max){
return max;}

return value;}







/**
 * The duration of the card animation in milliseconds.
 */
var ANIMATION_DURATION=250;

/**
 * The threshold to invoke the `onNavigate` action.
 * For instance, `1 / 3` means that moving greater than 1 / 3 of the width of
 * the view will navigate.
 */
var POSITION_THRESHOLD=1/3;

/**
 * The threshold (in pixels) to start the gesture action.
 */
var RESPOND_THRESHOLD=15;

/**
 * The distance from the edge of the navigator which gesture response can start for.
 * For horizontal scroll views, a distance of 30 from the left of the screen is the
 * standard maximum position to start touch responsiveness.
 */
var RESPOND_POSITION_MAX_HORIZONTAL=30;
var RESPOND_POSITION_MAX_VERTICAL=null;

/**
 * The threshold (in pixels) to finish the gesture action.
 */
var DISTANCE_THRESHOLD=100;

/**
 * Primitive gesture directions.
 */
var Directions={
'HORIZONTAL':'horizontal',
'VERTICAL':'vertical'};




/**
 * Pan responder that handles gesture for a card in the cards stack.
 *
 *     +------------+
 *   +-+            |
 * +-+ |            |
 * | | |            |
 * | | |  Focused   |
 * | | |   Card     |
 * | | |            |
 * +-+ |            |
 *   +-+            |
 *     +------------+
 */var 
NavigationCardStackPanResponder=function(_NavigationAbstractPa){_inherits(NavigationCardStackPanResponder,_NavigationAbstractPa);






function NavigationCardStackPanResponder(
direction,
props)
{_classCallCheck(this,NavigationCardStackPanResponder);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(NavigationCardStackPanResponder).call(this));

_this._isResponding=false;
_this._isVertical=direction===Directions.VERTICAL;
_this._props=props;
_this._startValue=0;return _this;}_createClass(NavigationCardStackPanResponder,[{key:'onMoveShouldSetPanResponder',value:function onMoveShouldSetPanResponder(


event,gesture){
var props=this._props;

if(props.navigationState.index!==props.scene.index){
return false;}


var layout=props.layout;
var isVertical=this._isVertical;
var index=props.navigationState.index;
var currentDragDistance=gesture[isVertical?'dy':'dx'];
var currentDragPosition=gesture[isVertical?'moveY':'moveX'];
var maxDragDistance=isVertical?
layout.height.__getValue():
layout.width.__getValue();

var positionMax=isVertical?
RESPOND_POSITION_MAX_VERTICAL:
RESPOND_POSITION_MAX_HORIZONTAL;

if(positionMax!=null&&currentDragPosition>positionMax){
return false;}


return (
Math.abs(currentDragDistance)>RESPOND_THRESHOLD&&
maxDragDistance>0&&
index>0);}},{key:'onPanResponderGrant',value:function onPanResponderGrant()



{var _this2=this;
this._isResponding=false;
this._props.position.stopAnimation(function(value){
_this2._isResponding=true;
_this2._startValue=value;});}},{key:'onPanResponderMove',value:function onPanResponderMove(



event,gesture){
if(!this._isResponding){
return;}


var props=this._props;
var layout=props.layout;
var isVertical=this._isVertical;
var axis=isVertical?'dy':'dx';
var index=props.navigationState.index;
var distance=isVertical?
layout.height.__getValue():
layout.width.__getValue();

var value=clamp(
index-1,
this._startValue-gesture[axis]/distance,
index);


props.position.setValue(value);}},{key:'onPanResponderRelease',value:function onPanResponderRelease(


event,gesture){var _this3=this;
if(!this._isResponding){
return;}


this._isResponding=false;

var props=this._props;
var isVertical=this._isVertical;
var axis=isVertical?'dy':'dx';
var index=props.navigationState.index;
var distance=gesture[axis];

props.position.stopAnimation(function(value){
_this3._reset();
if(distance>DISTANCE_THRESHOLD||value<=index-POSITION_THRESHOLD){
props.onBackGesture();}});}},{key:'onPanResponderTerminate',value:function onPanResponderTerminate()




{
this._isResponding=false;
this._reset();}},{key:'_reset',value:function _reset()


{
var props=this._props;
Animated.timing(
props.position,
{
toValue:props.navigationState.index,
duration:ANIMATION_DURATION}).

start();}}]);return NavigationCardStackPanResponder;}(NavigationAbstractPanResponder);



function createPanHandlers(
direction,
props)
{
var responder=new NavigationCardStackPanResponder(direction,props);
return responder.panHandlers;}


function forHorizontal(
props)
{
return createPanHandlers(Directions.HORIZONTAL,props);}


function forVertical(
props)
{
return createPanHandlers(Directions.VERTICAL,props);}


module.exports={
// constants
ANIMATION_DURATION:ANIMATION_DURATION,
DISTANCE_THRESHOLD:DISTANCE_THRESHOLD,
POSITION_THRESHOLD:POSITION_THRESHOLD,
RESPOND_THRESHOLD:RESPOND_THRESHOLD,

// enums
Directions:Directions,

// methods.
forHorizontal:forHorizontal,
forVertical:forVertical};