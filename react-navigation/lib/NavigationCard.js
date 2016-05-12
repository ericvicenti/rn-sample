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
'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();














var _reactAddonsPureRenderMixin=require('react-addons-pure-render-mixin');var _reactAddonsPureRenderMixin2=_interopRequireDefault(_reactAddonsPureRenderMixin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var NavigationCardStackPanResponder=require('./NavigationCardStackPanResponder');var NavigationCardStackStyleInterpolator=require('./NavigationCardStackStyleInterpolator');var NavigationPointerEventsContainer=require('./NavigationPointerEventsContainer');var NavigationPropTypes=require('./NavigationPropTypes');var React=require('react');var _require=require('react-native');var Animated=_require.Animated;var StyleSheet=_require.StyleSheet;var View=_require.View;var 




















PropTypes=React.PropTypes;var 

SceneView=function(_React$Component){_inherits(SceneView,_React$Component);function SceneView(){_classCallCheck(this,SceneView);return _possibleConstructorReturn(this,Object.getPrototypeOf(SceneView).apply(this,arguments));}_createClass(SceneView,[{key:'shouldComponentUpdate',value:function shouldComponentUpdate(






nextProps,nextState){
return (
nextProps.sceneRendererProps.scene.navigationState!==
this.props.sceneRendererProps.scene.navigationState);}},{key:'render',value:function render()



{
return this.props.sceneRenderer(this.props.sceneRendererProps);}}]);return SceneView;}(React.Component);



/**
 * Component that renders the scene as card for the <NavigationCardStack />.
 */SceneView.propTypes={sceneRenderer:PropTypes.func.isRequired,sceneRendererProps:NavigationPropTypes.SceneRenderer};var 
NavigationCard=function(_React$Component2){_inherits(NavigationCard,_React$Component2);function NavigationCard(){_classCallCheck(this,NavigationCard);return _possibleConstructorReturn(this,Object.getPrototypeOf(NavigationCard).apply(this,arguments));}_createClass(NavigationCard,[{key:'shouldComponentUpdate',value:function shouldComponentUpdate(











nextProps,nextState){
return _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.call(
this,
nextProps,
nextState);}},{key:'render',value:function render()



{var _props=





/* NavigationSceneRendererProps */
this.props;var panHandlers=_props.panHandlers;var pointerEvents=_props.pointerEvents;var renderScene=_props.renderScene;var style=_props.style;var props=_objectWithoutProperties(_props,['panHandlers','pointerEvents','renderScene','style']);

var viewStyle=style===undefined?
NavigationCardStackStyleInterpolator.forHorizontal(props):
style;

var viewPanHandlers=panHandlers===undefined?
NavigationCardStackPanResponder.forHorizontal(props):
panHandlers;

return (
React.createElement(Animated.View,_extends({},
viewPanHandlers,{
pointerEvents:pointerEvents,
ref:this.props.onComponentRef,
style:[styles.main,viewStyle]}),
React.createElement(SceneView,{
sceneRenderer:renderScene,
sceneRendererProps:props})));}}]);return NavigationCard;}(React.Component);NavigationCard.propTypes=_extends({},NavigationPropTypes.SceneRenderer,{onComponentRef:PropTypes.func.isRequired,panHandlers:NavigationPropTypes.panHandlers,pointerEvents:PropTypes.string.isRequired,renderScene:PropTypes.func.isRequired,style:PropTypes.any});






var styles=StyleSheet.create({
main:{
backgroundColor:'#E9E9EF',
bottom:0,
left:0,
position:'absolute',
right:0,
// shadowColor: 'black',
// shadowOffset: {width: 0, height: 0},
// shadowOpacity: 0.4,
// shadowRadius: 10,
top:0}});



NavigationCard=NavigationPointerEventsContainer.create(NavigationCard);

NavigationCard.CardStackPanResponder=NavigationCardStackPanResponder;
NavigationCard.CardStackStyleInterpolator=NavigationCardStackStyleInterpolator;

module.exports=NavigationCard;