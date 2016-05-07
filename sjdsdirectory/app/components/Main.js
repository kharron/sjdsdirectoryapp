var React = require('react-native');
var api = require('../utils/api');
var Categories = require('./Categories');
var Results = require('./Results');

var {
	View,
	Image,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

styles = StyleSheet.create({
	imageContainer: {
		flex: 1
	},
	mainContainer: {
		flex: 1,
		padding: 0,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#48BBEC',
	},
	title: {
		color: 'white',
		justifyContent: 'center',
		alignSelf: 'center',
		fontSize: 20,
		marginBottom: 20
	},
	buttonText: {
		color: "#ffffff",
		alignSelf: 'center',
		fontSize: 18,
		paddingTop: 9
	},
	button: {
		height: 45,
		marginTop: 10,
		marginBottom: 10,
		alignSelf: 'stretch',
		backgroundColor: "#000000"
	},
	searchInput: {
		height: 50,
		padding: 4,
		borderRadius: 7,
		color: 'black',
		justifyContent: 'center',
		backgroundColor: "#ffffff"
	},
	catText: {
		fontSize: 18,
		color: 'white'
	}
});

class Main extends React.Component {
	constructor(props){
		console.log("PROPS: " + Object.keys(props));
		super(props);
		this.state = {
			keyword: '',
			catList: '',
			isLoading: false,
			error: false
		}
	}

	handleChange(event) {
		this.setState({
			keyword: event.nativeEvent.text
		});
	}
	
	handleSubmit() {
		// update indicatorIOS spinner
		// fetch data from API
		// reroute to the next page for search results
		this.setState({
			isLoading: true
		});
		keyword = this.state.keyword;
		keyword = "tacos";
		api.getSearchAll(keyword)
			.then((res) => {
				console.log(res);	
				this.props.navigator.push({
					title: "Results",
					component: Results,
					passProps: {searchInfo: res, resType: "search"}
				});
			});
		console.log('SUBMIT', keyword);
	}

	// get results from selecting a category
	handleCategory(cat){
		this.setState({
			isLoading: true
		});
		api.getSearchByCat(cat)
			.then((res) => {
				console.log("RESULTS: " + res);
				this.props.navigator.push({
					title: "Results",
					component: Results,
					passProps: {searchInfo: res, resType: "cat"}
				});
			});
		console.log("Cat Touched: " + cat);
	}
	render() {
		return (

			<Image source={require('../images/bg-home.jpg')} style={styles.mainContainer}>
				<Text style={styles.title}> Search San Juan Del Sur </Text>
				<TextInput
					style={styles.searchInput}
					value={this.state.keyword}
					onChange={this.handleChange.bind(this)} />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="white">
					<Text style={styles.buttonText}> Search </Text>
				</TouchableHighlight>
				<Categories {...this.props} />
			</Image>
		)
	}
};

module.exports = Main;
