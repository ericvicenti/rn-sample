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
'use strict';





/**
 * Utility that builds the style for the card in the cards stack.
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
 */

/**
 * Render the initial style when the initial layout isn't measured yet.
 */
function forInitial(props){var

navigationState=

props.navigationState;var scene=props.scene;

var focused=navigationState.index===scene.index;
var opacity=focused?1:0;
// If not focused, move the scene to the far away.
var translate=focused?0:1000000;
return{
opacity:opacity,
transform:[
{translateX:translate},
{translateY:translate}]};


}

function forHorizontal(props){var

layout=


props.layout;var position=props.position;var scene=props.scene;

if(!layout.isMeasured){
return forInitial(props);
}

var index=scene.index;
var inputRange=[index-1,index,index+1];
var width=layout.initWidth;

var opacity=position.interpolate({
inputRange:inputRange,
// outputRange: [1, 1, 0.3],
outputRange:[0,1,0]});

// debugger;
// const screenWidth = props.layout.width.__getValue();
// const left = position.interpolate({
//   inputRange,
//   outputRange: [screenWidth, 0, -screenWidth],
// });
// const right = position.interpolate({
//   inputRange,
//   outputRange: [-screenWidth, 0, screenWidth],
// });
var scale=position.interpolate({
inputRange:inputRange,
outputRange:[1,1,0.95]});


var translateY=0;
var translateX=position.interpolate({
inputRange:inputRange,
outputRange:[width,0,-10]});


return{
opacity:opacity,
// position: 'absolute',
// left: 100,
// right: 100,
// left:0,right:0,
// top:0,bottom:0,
transform:[
{scale:scale},
{translateX:translateX},
{translateY:translateY}]};


}

function forVertical(props){var

layout=


props.layout;var position=props.position;var scene=props.scene;

if(!layout.isMeasured){
return forInitial(props);
}

var index=scene.index;
var inputRange=[index-1,index,index+1];
var height=layout.initHeight;

var opacity=position.interpolate({
inputRange:inputRange,
outputRange:[1,1,0.3]});


var scale=position.interpolate({
inputRange:inputRange,
outputRange:[1,1,0.95]});


var translateX=0;
var translateY=position.interpolate({
inputRange:inputRange,
outputRange:[height,0,-10]});


return{
opacity:opacity,
transform:[
{scale:scale},
{translateX:translateX},
{translateY:translateY}]};


}

module.exports={
forHorizontal:forHorizontal,
forVertical:forVertical};