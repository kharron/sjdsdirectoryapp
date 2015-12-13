/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./app/components/Main');
var Api = require('./app/utils/api');

var {
  AppRegistry,
  StyleSheet,
  Text,
	NavigatorIOS,
  View,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111111'
	},
});

class sjdsdirectory extends React.Component{
  render() {
    return (
    <NavigatorIOS
    	style={styles.container}
      initialRoute={{
        title: 'SJDS Directory',
        component: Main,
      }} />
    );
  }
};


AppRegistry.registerComponent('sjdsdirectory', () => sjdsdirectory);
