React = require('react-native');
api = require('../utils/api');
Results = require('./Results');


var {
	Text,
	ScrollView,
	StyleSheet,
	Image,
	View,
	TouchableHighlight
} = React;


var styles = StyleSheet.create({
	container: {
		marginTop: 25,
		flex: 1,
	},
	mainContainer: {
		flex: 1,
		padding: 0,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#48BBEC',
	},
	viewContainer: {
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		flex: 1
	},
	rowContainer: {
		marginTop: 15,
	},
	firstContainer: {
		marginTop: 10
	},
	catText: {
		fontSize: 18,
		color: 'black',
		marginLeft: 15
	},
	image: {
		height: 300,
	},
	fixSeparator: {
		marginLeft: -30
	},
	header: {
		fontSize: 20,
		color: 'white',
		marginLeft: 15,
		fontWeight: 'bold',
	},
	viewHeader: {
		marginBottom: 15
	}
})

class Profile extends React.Component{
	constructor (props){
		console.log("Profile Props: " + props.compInfo.photos);
		super(props)
		this.state = {
			keyword: "",
			catList: '',
			isLoading: false,
			error: false
		}
	}
	render(){
		console.log(this.props.compInfo.name);
		var baseUrl = "http://api.sjdsdirectory.com/";
		photoKeys = Object.keys(this.props.compInfo.photos);
		imgList = [];
		photoKeys.forEach((i) => {
			url = baseUrl + "media/business_images/" + this.props.compInfo.id + "/" + this.props.compInfo.photos[i];
			imgList.push(<View style={styles.viewContainer}><Image source={{uri: url}} style={styles.image} /></View>)
		});
		console.log(imgList);
		return (
			<ScrollView style={styles.container}>
				{imgList}
			</ScrollView>
		)
	}
};


module.exports = Profile;