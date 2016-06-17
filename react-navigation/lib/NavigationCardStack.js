/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * 
 */
'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var NavigationAnimatedView=require('NavigationAnimatedView');
var NavigationCard=require('NavigationCard');
var NavigationCardStackStyleInterpolator=require('NavigationCardStackStyleInterpolator');
var NavigationContainer=require('NavigationContainer');
var NavigationCardStackPanResponder=require('NavigationCardStackPanResponder');
var NavigationPropTypes=require('NavigationPropTypes');
var React=require('react');
var ReactComponentWithPureRenderMixin=require('ReactComponentWithPureRenderMixin');
var StyleSheet=require('StyleSheet');

var emptyFunction=require('fbjs/lib/emptyFunction');var 

PropTypes=React.PropTypes;var 
Directions=NavigationCardStackPanResponder.Directions;























/**
 * A controlled navigation view that renders a stack of cards.
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
NavigationCardStack=function(_React$Component){_inherits(NavigationCardStack,_React$Component);














function NavigationCardStack(props,context){_classCallCheck(this,NavigationCardStack);return _possibleConstructorReturn(this,Object.getPrototypeOf(NavigationCardStack).call(this,
props,context));}_createClass(NavigationCardStack,[{key:'componentWillMount',value:function componentWillMount()


{
this._renderScene=this._renderScene.bind(this);}},{key:'shouldComponentUpdate',value:function shouldComponentUpdate(


nextProps,nextState){
return ReactComponentWithPureRenderMixin.shouldComponentUpdate.call(
this,
nextProps,
nextState);}},{key:'render',value:function render()



{
return (
React.createElement(NavigationAnimatedView,{
navigationState:this.props.navigationState,
renderOverlay:this.props.renderOverlay,
renderScene:this._renderScene
// $FlowFixMe - style should be declared
,style:[styles.animatedView,this.props.style]}));}},{key:'_renderScene',value:function _renderScene(




props){
var isVertical=this.props.direction==='vertical';

var style=isVertical?
NavigationCardStackStyleInterpolator.forVertical(props):
NavigationCardStackStyleInterpolator.forHorizontal(props);

var panHandlers=isVertical?
NavigationCardStackPanResponder.forVertical(props):
NavigationCardStackPanResponder.forHorizontal(props);

return (
React.createElement(NavigationCard,_extends({},
props,{
key:'card_'+props.scene.key,
panHandlers:panHandlers,
renderScene:this.props.renderScene,
style:style})));}}]);return NavigationCardStack;}(React.Component);NavigationCardStack.propTypes={direction:PropTypes.oneOf([Directions.HORIZONTAL,Directions.VERTICAL]),navigationState:NavigationPropTypes.navigationParentState.isRequired,renderOverlay:PropTypes.func,renderScene:PropTypes.func.isRequired};NavigationCardStack.defaultProps={direction:Directions.HORIZONTAL,renderOverlay:emptyFunction.thatReturnsNull};





var styles=StyleSheet.create({
animatedView:{
flex:1}});



module.exports=NavigationContainer.create(NavigationCardStack);