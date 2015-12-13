var React = require('react-native');

var {
	View,
	StyleSheet
} = React;

var styles = StyleSheet.create({
	separator: {
		height: 1,
		flex: 1,
		backgroundColor: '#E4E4E4',
		marginLeft: 15,
		marginTop: 15
	}	
});

class Separator extends React.Component {
	render(){
		return (
			<View style={styles.separator} />
		)
	}
}

module.exports = Separator;