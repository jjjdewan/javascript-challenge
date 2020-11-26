// Homewrok - JavaScript and DOM Manipulation: 
// Level 1: Automatic Table and Date Search (Required)
// 
// by Jahangir Dewan
// from data.js
var myTableData = data;

// YOUR CODE HERE!
var myTBody = d3.select("tbody");
var myButton = d3.select("#filter-btn");

var inputDateTime = d3.select("#datetime");
var inputMyCity = d3.select("#city");
var resetButton = d3.select("#reset-btn");
var myColumns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// getData to Populate all data for each ufo_sightings
//
var getData = (dataInput) => {
	dataInput.forEach(ufo_sightings => {
		var row = myTBody.append("tr");
		myColumns.forEach(myColumns => row.append("td").text(ufo_sightings[myColumns])
		)
	});
}

//Get all the data and populate table
//
getData(data);

// Button to filter data and display results based on the search criteria
//
myButton.on("click", () => {
	d3.event.preventDefault();
	var inputDate = inputDateTime.property("value").trim();
	var inputCity = inputMyCity.property("value").toLowerCase().trim();
    
	// Using filter to get data for matching then display record based on input date and city name
    //
	var filterMyDate = data.filter(data => data.datetime === inputDate);
	console.log(filterMyDate)
    
	var filterMyCity = data.filter(data => data.city === inputCity);
	console.log(filterMyCity)
    
	var filterMyData = data.filter(data => data.datetime === inputDate && data.city === inputCity);
	console.log(filterMyData)

	// Append and create data table
    //
	myTBody.html("");

	let myReply = {
		filterMyData, filterMyCity, filterMyDate
	}
    
    // get data if user input conatains both matching date and city then get me the data record
	if (myReply.filterMyData.length !== 0) {
		getData(filterMyData);
	}
        // else if user input coontains either matching date or city then get me the data record
        //
		else if (myReply.filterMyData.length === 0 && ((myReply.filterMyCity.length !== 0 || myReply.filterMyDate.length !== 0))){
			getData(filterMyCity) || getData(filterMyDate);
	
		}
		else {
			myTBody.append("tr").append("td").text("No results found!");
		}
})

// Reset data
//
resetButton.on("click", () => {
	myTBody.html("");
	getData(data)
	console.log("Table reset")
})
