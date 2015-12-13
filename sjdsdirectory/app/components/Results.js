var React = require('react-native');
var Separator = require('../helpers/Separator');

var {
	Text,
	View,
	ScrollView,
	Image,
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

	render(){
		var res = this.props.searchInfo
		var baseUrl = "http://api.sjdsdirectory.com/";
		console.log(res);
		viewList = [];
		console.log("Results Count: ", res.length);
	    resKeys = Object.keys(res);
	    console.log(resKeys);
	    resKeys.forEach(function(i){
			var url = baseUrl + "media/business_images/" + res[i].id + "/" + res[i]['photos'][0];
			var catlist = res[i]['cats'];
			console.log(catlist);
			
			//var cats = getCats(catlist);
			cats = '';
			viewList.push(
			 <View key={i} style={styles.viewContainer}>
		 		<Text style={styles.headerName}> {res[i].name} </Text>
		 		<Image source={{uri: url}} style={styles.image} />
		 		<Text style={styles.pageText}>
		 			{catlist}
		 		</Text>
			 	<Text style={styles.pageText}> {res[i].description} </Text>
			 	<Separator />
			 </View>
			 )
		});
		console.log("View List: ", viewList);
		return (
			<ScrollView style={styles.container}>
				{viewList}
			</ScrollView>
		)
	}
};

module.exports = Results;