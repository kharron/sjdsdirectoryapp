var api = {
	getSearchAll(keyword) {
		keyword = keyword.toLowerCase().trim();
		var url = `http://api.sjdsdirectory.com/searchall/?keyword=${keyword}`;
		return fetch(url).then((res) => res.json());
	},
	getCategories() {
		var url = `http://api.sjdsdirectory.com/getcats`;
		return fetch(url).then((res) => res.json());
	},
	getSearchByCat(category) {
		var url = `http://api.sjdsdirectory.com/category/${category}`;
		console.log("Search by Cat: " + url);
		return fetch(url).then((res) => res.json());
	},
	getCompany(compId) {
		var url = `http://api.sjdsdirectory.com/getbusiness/?id=${compId}`;
		console.log("Search by Prod Id: " + url);
		return fetch(url).then((res) => res.json());
	}
}

module.exports = api;