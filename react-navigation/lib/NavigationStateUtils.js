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
'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else {return Array.from(arr);}}

var invariant=require('fbjs/lib/invariant');






function getParent(state){
if(
state instanceof Object&&
state.routes instanceof Array&&
state.routes[0]!==undefined&&
typeof state.index==='number'&&
state.routes[state.index]!==undefined)
{
return state;}

return null;}


function get(state,key){
var parentState=getParent(state);
if(!parentState){
return null;}

var childState=parentState.routes.find(function(child){return child.key===key;});
return childState||null;}


function indexOf(state,key){
var parentState=getParent(state);
if(!parentState){
return null;}

var index=parentState.routes.map(function(child){return child.key;}).indexOf(key);
if(index===-1){
return null;}

return index;}


function push(state,newChildState){
var lastChildren=state.routes;
return _extends({},
state,{
routes:[].concat(_toConsumableArray(
lastChildren),[
newChildState]),

index:lastChildren.length});}



function pop(state){
if(!state){
return state;}

var lastChildren=state.routes;
if(lastChildren.length<=1){
return state;}

return _extends({},
state,{
routes:lastChildren.slice(0,lastChildren.length-1),
index:lastChildren.length-2});}



function reset(state,nextChildren,nextIndex){
var parentState=getParent(state);
if(!parentState){
return state;}

var routes=nextChildren||parentState.routes;
var index=nextIndex==null?parentState.index:nextIndex;
if(routes===parentState.routes&&index===parentState.index){
return state;}

return _extends({},
parentState,{
routes:routes,
index:index});}



function set(state,key,nextChildren,nextIndex){
if(!state){
return {
routes:nextChildren,
index:nextIndex,
key:key};}


var parentState=getParent(state);
if(!parentState){
return {
routes:nextChildren,
index:nextIndex,
key:key};}


if(nextChildren===parentState.routes&&nextIndex===parentState.index&&key===parentState.key){
return parentState;}

return _extends({},
parentState,{
routes:nextChildren,
index:nextIndex,
key:key});}



function jumpToIndex(state,index){
var parentState=getParent(state);
if(parentState&&parentState.index===index){
return parentState;}

return _extends({},
parentState,{
index:index});}



function jumpTo(state,key){
var parentState=getParent(state);
if(!parentState){
return state;}

var index=parentState.routes.indexOf(parentState.routes.find(function(child){return child.key===key;}));
invariant(
index!==-1,
'Cannot find child with matching key in this NavigationState');

return _extends({},
parentState,{
index:index});}



function replaceAt(state,key,newState){
var parentState=getParent(state);
if(!parentState){
return state;}

var routes=[].concat(_toConsumableArray(parentState.routes));
var index=parentState.routes.indexOf(parentState.routes.find(function(child){return child.key===key;}));
invariant(
index!==-1,
'Cannot find child with matching key in this NavigationState');

routes[index]=newState;
return _extends({},
parentState,{
routes:routes});}



function replaceAtIndex(state,index,newState){
var parentState=getParent(state);
if(!parentState){
return state;}

var routes=[].concat(_toConsumableArray(parentState.routes));
routes[index]=newState;
return _extends({},
parentState,{
routes:routes});}



var NavigationStateUtils={
getParent:getParent,
get:get,
indexOf:indexOf,
push:push,
pop:pop,
reset:reset,
set:set,
jumpToIndex:jumpToIndex,
jumpTo:jumpTo,
replaceAt:replaceAt,
replaceAtIndex:replaceAtIndex};


module.exports=NavigationStateUtils;