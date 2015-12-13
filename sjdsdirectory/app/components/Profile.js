var React = require('react-native')

var = {
	Text,
	View,
	StyleSheet,
	Image
	} = React

class Profile extends React.Component{
	render(){
		return (
			<View style={styles.container}>
				<Image source={{uri: this.props.compInfo.image}} />
				<Text> { this.props.compInfo.name } </Text>
			</View>
		)
	}
};

Profile.propTypes = {
	compInfo: React.PropTypes.object.isRequired
}

module.exports = Profile;