/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
'use strict';function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var _require=

require('react-native');var PanResponder=_require.PanResponder;

var invariant=require('fbjs/lib/invariant');





var EmptyPanHandlers={
onMoveShouldSetPanResponder:null,
onPanResponderGrant:null,
onPanResponderMove:null,
onPanResponderRelease:null,
onPanResponderTerminate:null};


/**
 * Abstract class that defines the common interface of PanResponder that handles
 * the gesture actions.
 */var
NavigationAbstractPanResponder=



function NavigationAbstractPanResponder(){var _this=this;_classCallCheck(this,NavigationAbstractPanResponder);
var config={};
Object.keys(EmptyPanHandlers).forEach(function(name){
var fn=_this[name];

invariant(
typeof fn==='function',
'subclass of `NavigationAbstractPanResponder` must implement method %s',
name);


config[name]=fn.bind(_this);
},this);

this.panHandlers=PanResponder.create(config).panHandlers;
};


module.exports=NavigationAbstractPanResponder;