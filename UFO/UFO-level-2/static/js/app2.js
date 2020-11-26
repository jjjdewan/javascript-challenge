// Homewrok - JavaScript and DOM Manipulation: 
// Level 2: Multiple Search Categories (Optional)
// by Jahangir Dewan

// get data from data.js
var dataTable = data;

// Function to define display UFO sightings
//
function displayMyTable(ufoSightings) {
  var tableBody = d3.select("tbody");
  ufoSightings.forEach((ufoRecord) => {
    var trow = tableBody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = trow.append("td");
      cell.html(value);
    });
  });
};

// Function to remove data and clear table
//
function deleteTableBody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};
  
// Initialize display: all UFO sightings
//
console.log(dataTable);
displayMyTable(dataTable);

// define button to filter table
//
var button = d3.select("#filter-btn");

// filter the database
button.on("click", function(event) {
  
  d3.event.preventDefault();
  deleteTableBody();
  
  var myFilteredData = dataTable;
  var myInput = document.getElementsByClassName("form-control");
  
  // Go through all the input fields
  //
  for (var i = 0; i < myInput.length; i++) {
	
	var myID = myInput[i].id;
	var getField = d3.select("#" + myID).property("value");
	
	// If field not empty then get filtered data to be displayed
	if (getField.trim() !== "") {
	  var myFilteredData = myFilteredData.filter(ufoSighting =>
	    // matching case insensitive
        //
		ufoSighting[myID].toUpperCase().trim() ===
		getField.toUpperCase().trim());
	};
  };
 
  // display message if no records found
  if (myFilteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No Records Found</h4>");
  };
  
  // display the data
  //
  console.log(myFilteredData);
  displayMyTable(myFilteredData);
});


// Reset data
//
resetButton.on("click", () => {
  myTBody.html("");
  getData(dataTable)
  console.log("Table reset")
})
