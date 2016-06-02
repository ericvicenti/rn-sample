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
'use strict';

var invariant=require('fbjs/lib/invariant');






var SCENE_KEY_PREFIX='scene_';

/**
 * Helper function to compare route keys (e.g. "9", "11").
 */
function compareKey(one,two){
var delta=one.length-two.length;
if(delta>0){
return 1;}

if(delta<0){
return -1;}

return one>two?1:-1;}


/**
 * Helper function to sort scenes based on their index and view key.
 */
function compareScenes(
one,
two)
{
if(one.index>two.index){
return 1;}

if(one.index<two.index){
return -1;}


return compareKey(
one.key,
two.key);}



function areScenesShallowEqual(
one,
two)
{
return (
one.key===two.key&&
one.index===two.index&&
one.isStale===two.isStale&&
one.route===two.route&&
one.route.key===two.route.key);}



function NavigationScenesReducer(
scenes,
nextState,
prevState)
{

var prevScenes=new Map();
var freshScenes=new Map();
var staleScenes=new Map();

// Populate stale scenes from previous scenes marked as stale.
scenes.forEach(function(scene){var 
key=scene.key;
if(scene.isStale){
staleScenes.set(key,scene);}

prevScenes.set(key,scene);});


var nextKeys=new Set();
nextState.routes.forEach(function(route,index){
var key=SCENE_KEY_PREFIX+route.key;
var scene={
index:index,
isStale:false,
key:key,
route:route};

invariant(
!nextKeys.has(key),
'navigationState.routes['+index+'].key "'+key+'" conflicts with'+
'another child!');

nextKeys.add(key);

if(staleScenes.has(key)){
// A previously `stale` scene is now part of the nextState, so we
// revive it by removing it from the stale scene map.
staleScenes.delete(key);}

freshScenes.set(key,scene);});


if(prevState){
// Look at the previous routes and classify any removed scenes as `stale`.
prevState.routes.forEach(function(route,index){
var key=SCENE_KEY_PREFIX+route.key;
if(freshScenes.has(key)){
return;}

staleScenes.set(key,{
index:index,
isStale:true,
key:key,
route:route});});}




var nextScenes=[];

var mergeScene=function mergeScene(nextScene){var 
key=nextScene.key;
var prevScene=prevScenes.has(key)?prevScenes.get(key):null;
if(prevScene&&areScenesShallowEqual(prevScene,nextScene)){
// Reuse `prevScene` as `scene` so view can avoid unnecessary re-render.
// This assumes that the scene's navigation state is immutable.
nextScenes.push(prevScene);}else 
{
nextScenes.push(nextScene);}};



staleScenes.forEach(mergeScene);
freshScenes.forEach(mergeScene);

return nextScenes.sort(compareScenes);}


module.exports=NavigationScenesReducer;