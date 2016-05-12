/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
*/
'use strict';

const React = require('react');
const ReactNative = require('react-native');

const {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} = ReactNative;

type Props = {
}

let backBtnSource = {
  uri: 'https://raw.githubusercontent.com/facebook/react-native/master/Libraries/CustomComponents/NavigationExperimental/assets/back-icon%401x.ios.png',
};

if (Platform.OS !== 'web') {
  backBtnSource = require('./assets/back-icon.png');
}

const NavigationHeaderBackButton = (props: Props) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={props.onBackPress}>
    <Image style={styles.button} source={backBtnSource} />
  </TouchableOpacity>
);

NavigationHeaderBackButton.propTypes = {
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 24,
    width: 24,
    margin: Platform.OS === 'ios' ? 10 : 16,
    // resizeMode: 'contain'
  }
});

module.exports = NavigationHeaderBackButton;
