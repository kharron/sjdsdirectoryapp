React = require('react-native');
api = require('../utils/api');
Results = require('./Results');
Separator = require('../helpers/Separator');

var {
	Text,
	ScrollView,
	StyleSheet,
	View,
	TouchableHighlight
} = React;

var styles = StyleSheet.create({
	container: {
		marginTop: 15
	},
	rowContainer: {
		marginTop: 15,
		flex: 1,
	},
	firstContainer: {
		marginTop: 10,
		flex: 1,
	},
	catText: {
		fontSize: 18,
		color: 'white',
		marginLeft: 15
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

class Categories extends React.Component {
	constructor (props){
		console.log("PROPS: " + Object.keys(props));
		super(props)
		this.state = {
			keyword: "",
			catList: this.getCats(),
			isLoading: false,
			error: false
		}
	}

	getCats() {		
		api.getCategories()
		.then((res) => {
			var cList = this.createList(res);
			this.setState({
				catList: cList
			});
		});
		 
	}

	handleTouch(cat, res){
		this.setState({
			isLoading: true
		});
		api.getSearchByCat(cat)
			.then((res) => {
				console.log("RESULTS: " + res);
				this.props.navigator.push({
					title: "Results",
					component: Results,
					passProps: {searchInfo: res}
				});
			});
		console.log("Cat Touched: " + cat);
	}
	createList(res){
		catKeys = Object.keys(res);
		catList = [];
		j = 0;
		catKeys.forEach((i) => {
			if (j>0){
				catList.push(
				<TouchableHighlight
					onPress={this.handleTouch.bind(this, res[i], res)}
					underlayColor='white'>
				<View key={i} style={styles.rowContainer}>
					<Text style={styles.catText}> {res[i]} </Text>
					<Separator style={styles.fixSeparator} />
				</View>
				</TouchableHighlight>
				)
			} else {
				catList.push(

				<TouchableHighlight
					onPress={this.handleTouch.bind(this, res[i], res)}
					underlayColor='white'>
				<View key={i} style={styles.firstContainer}>
					
					<Text style={styles.catText}> {res[i]} </Text>
					<Separator style={styles.fixSeparator} />
				</View>
				</TouchableHighlight>
				)
			}
			j += 1;
		});
		return catList;
	}
	render() {
		return (
			<ScrollView>
			<View style={styles.viewHeader}><Text style={styles.header}> Categories </Text></View>
				{this.state.catList}
			</ScrollView>
		)
	}
};

module.exports = Categories;