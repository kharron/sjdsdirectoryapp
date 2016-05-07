var React = require('react-native');
var Separator = require('../helpers/Separator');
Profile = require('./Profile');

var {
	Text,
	View,
	ScrollView,
	Image,
	TouchableHighlight,
	StyleSheet
} = React;

var styles = StyleSheet.create({
	container: {
		marginTop: 25,
		flex: 1,
	},
	viewContainer: {
		marginTop: 15,
		flex: 1
	},
	buttonText: {
		color: 'black',
		fontSize: 18,
		alignSelf: 'center'
	},
	image: {
		height: 200,
	},
	headerName: {
		fontSize: 16,
	},
	pageText: {
		marginLeft: 15,
		marginRight: 10,
	}
});

class Results extends React.Component{
	constructor (props){
		console.log("RESULTS Props: " + Object.keys(props));
		super(props);
		this.state = {
			keyword: '',
			resultList: this.createResultView(),
			isLoading: false,
			error: false
		}
	}
	getUrl(){
		var res = this.props.searchInfo
		var url = "http://api.sjdsdirectory.com/media/business_images/" + res[0].id + "/" + res[0].image;
		console.log("URL: ", url);
		//return url;
	}

	getCats(catList){
		var catString = '';
		for (i=0; i < catList.length; i++){
			if (i>0){
			 catString += "," + catList[i];
			} else {
			 catString = catList[i];
			}
		}
		return catString;
	}

	gotoProfile(compId) {
		this.setState({
			isLoading: true
		});
		api.getCompany(compId)
			.then((res) => {
				console.log(res);
				this.props.navigator.push({
					title: "Company Profile",
					component: Profile,
					passProps: {compInfo: res}
				});
			});
		console.log("Made it Here");
	}
	createResultView(){
		var res = this.props.searchInfo
		console.log(res);
		var baseUrl = "http://api.sjdsdirectory.com/";
		//console.log(res);
		resultList = [];
		//console.log("Results: ", res.results[i]);
		if (this.props.resType == "search"){
			res.results = res;
		}
	    resKeys = Object.keys(res.results);
	    //console.log("KEYS: " + res.results);
	    self = this;
	    resKeys.forEach((i) => {
	    	if (res.results[i].id == null) { 

	    	} else {
				var url = baseUrl + "media/business_images/" + res.results[i].id + "/" + res.results[i]['photos'][0];
				var catlist = res.results[i]['cats'];
				console.log(catlist);
				
				//var cats = getCats(catlist);
				cats = '';
				resultList.push(
				 <View key={i} style={styles.viewContainer}>
			 		<TouchableHighlight onPress={this.gotoProfile.bind(this, res.results[i].id)}>
			 			<Text style={styles.headerName}> {res.results[i].name} </Text>
			 		</TouchableHighlight>
			 		<TouchableHighlight onPress={this.gotoProfile.bind(this, res.results[i].id)}>
			 			<Image source={{uri: url}} style={styles.image} />
			 		</TouchableHighlight>
			 		<Text style={styles.pageText}>
			 			{catlist}
			 		</Text>
				 	<Text style={styles.pageText}> {res.results[i].description} </Text>
				 	<Separator />
				 </View>
				 )
			}
		});
		return resultList;
	}
	render(){
		return (
			<ScrollView style={styles.container}>
				{this.state.resultList}
			</ScrollView>
		)
	}
};

module.exports = Results;