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
'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();








var _reactAddonsPureRenderMixin=require('react-addons-pure-render-mixin');var _reactAddonsPureRenderMixin2=_interopRequireDefault(_reactAddonsPureRenderMixin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var React=require('React');var ReactNative=require('react-native');var NavigationHeaderTitle=require('./NavigationHeaderTitle');var NavigationHeaderBackButton=require('./NavigationHeaderBackButton');var NavigationPropTypes=require('./NavigationPropTypes');var NavigationHeaderStyleInterpolator=require('./NavigationHeaderStyleInterpolator');var


Animated=



ReactNative.Animated;var Platform=ReactNative.Platform;var StyleSheet=ReactNative.StyleSheet;var View=ReactNative.View;
























var APPBAR_HEIGHT=Platform.OS==='ios'?44:56;
var STATUSBAR_HEIGHT=Platform.OS==='ios'?20:0;var
PropTypes=React.PropTypes;var

NavigationHeader=function(_React$Component){_inherits(NavigationHeader,_React$Component);function NavigationHeader(){_classCallCheck(this,NavigationHeader);return _possibleConstructorReturn(this,(NavigationHeader.__proto__||Object.getPrototypeOf(NavigationHeader)).apply(this,arguments));}_createClass(NavigationHeader,[{key:'shouldComponentUpdate',value:function shouldComponentUpdate(




























nextProps,nextState){
return _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.call(
this,
nextProps,
nextState);

}},{key:'render',value:function render()

{var _this2=this;var _props=
this.props;var scenes=_props.scenes;var style=_props.style;var viewProps=_props.viewProps;

var scenesProps=scenes.map(function(scene){
var props=NavigationPropTypes.extractSceneRendererProps(_this2.props);
props.scene=scene;
return props;
});

return(
React.createElement(View,_extends({style:[styles.appbar,style]},viewProps),
scenesProps.map(this._renderLeft,this),
scenesProps.map(this._renderTitle,this),
scenesProps.map(this._renderRight,this)));


}},{key:'_renderLeft',value:function _renderLeft(

props){
return this._renderSubView(
props,
'left',
this.props.renderLeftComponent,
NavigationHeaderStyleInterpolator.forLeft,
this.props.onBackPress);

}},{key:'_renderTitle',value:function _renderTitle(

props){
return this._renderSubView(
props,
'title',
this.props.renderTitleComponent,
NavigationHeaderStyleInterpolator.forCenter,
this.props.onBackPress);

}},{key:'_renderRight',value:function _renderRight(

props){
return this._renderSubView(
props,
'right',
this.props.renderRightComponent,
NavigationHeaderStyleInterpolator.forRight,
this.props.onBackPress);

}},{key:'_renderSubView',value:function _renderSubView(


props,
name,
renderer,
styleInterpolator,
onBackPress)
{var

scene=

props.scene;var navigationState=props.navigationState;var


index=


scene.index;var isStale=scene.isStale;var key=scene.key;

var offset=navigationState.index-index;

if(Math.abs(offset)>2){
// Scene is far away from the active scene. Hides it to avoid unnecessary
// rendering.
return null;
}

var subView=renderer(props,onBackPress);
if(subView===null){
return null;
}

var pointerEvents=offset!==0||isStale?'none':'box-none';
return(
React.createElement(Animated.View,{
pointerEvents:pointerEvents,
key:name+'_'+key,
style:[
styles[name],
styleInterpolator(props)]},

subView));


}}]);return NavigationHeader;}(React.Component);NavigationHeader.defaultProps={renderTitleComponent:function renderTitleComponent(props){var navigationState=props.navigationState;var title=String(navigationState.title||'');return React.createElement(NavigationHeaderTitle,null,title);},renderLeftComponent:function renderLeftComponent(props,onBackPress){return props.scene.index>0?React.createElement(NavigationHeaderBackButton,{onBackPress:onBackPress}):null;},renderRightComponent:function renderRightComponent(props){return null;}};NavigationHeader.propTypes=_extends({},NavigationPropTypes.SceneRenderer,{renderLeftComponent:PropTypes.func,renderRightComponent:PropTypes.func,renderTitleComponent:PropTypes.func,style:View.propTypes.style,viewProps:PropTypes.shape(View.propTypes)});


var styles=StyleSheet.create({
appbar:{
alignItems:'center',
backgroundColor:Platform.OS==='ios'?'#EFEFF2':'#FFF',
borderBottomColor:'rgba(0, 0, 0, .15)',
borderBottomWidth:Platform.OS==='ios'?StyleSheet.hairlineWidth:0,
flexDirection:'row',
height:APPBAR_HEIGHT+STATUSBAR_HEIGHT,
justifyContent:'flex-start',
left:0,
marginBottom:16,// This is needed for elevation shadow
// elevation: Platform.OS === 'android' ? 2 : undefined,
position:'absolute',
right:0,
top:0},


title:{
bottom:0,
left:APPBAR_HEIGHT,
marginTop:STATUSBAR_HEIGHT,
position:'absolute',
right:APPBAR_HEIGHT,
top:0},


left:{
bottom:0,
left:0,
marginTop:STATUSBAR_HEIGHT,
position:'absolute',
top:0},


right:{
bottom:0,
marginTop:STATUSBAR_HEIGHT,
position:'absolute',
right:0,
top:0}});



NavigationHeader.HEIGHT=APPBAR_HEIGHT+STATUSBAR_HEIGHT;
NavigationHeader.Title=NavigationHeaderTitle;
NavigationHeader.BackButton=NavigationHeaderBackButton;

module.exports=NavigationHeader;