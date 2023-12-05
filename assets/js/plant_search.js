
//set session storage to contain search parameters
var searchParameter = sessionStorage.getItem("searchParameterKey");
var searchResults = document.getElementById("searchResults");
var nextButton = document.getElementById("next");
var previousButton = document.getElementById("previous");
pageNum = 1;
var searchParameters = JSON.parse(sessionStorage.getItem("searchParameterKey"))

var checkParameters = function () {
    if (searchParameters.button === "searchButton") {
        searchPlantURL = "https://perenual.com/api/species-list?key=" + plantKey + "&q=" + searchParameters.search + "&edible=1&hardiness=1-13&page=" + pageNum;
    }
    if (searchParameters.button === "locationButton") {
        console.log("load a location search page")
        searchPlantURL = "https://perenual.com/api/species-list?key=" + plantKey + "&edible=1&hardiness=" + searchParameters.search + "&page=" + pageNum;
    }
    if (searchParameters.button === "browseButton") {
        console.log("load a browse page")
        searchPlantURL = "https://perenual.com/api/species-list?key=" + plantKey + "&edible=1&hardiness=1-13&page=" + pageNum;
    }

    //fetch results based on search term
    fetch(searchPlantURL, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.data && result.data.length > 0) {
                displayPlants(result);

            } else {
                var noResultItem = document.createElement("li")
                noResultItem.setAttribute("class", "list-item tile is-child box")
                //create text for li
                noResultItem.textContent = 'Sorry, No Results Found. Tip: Avoid using plurals ex: "peppers vs pepper" Tip: Not everything is in our free database, try using "Browse"';
                //append li to ul in the aside
                searchResults.appendChild(noResultItem)

                var tip1ResultItem = document.createElement("li")
                tip1ResultItem.setAttribute("class", "list-item tile is-child box")
                //create text for li
                tip1ResultItem.textContent = 'Tip: Avoid using plurals ex: use"pepper", not peppers"';
                //append li to ul in the aside
                searchResults.appendChild(tip1ResultItem)
                var tip2ResultItem = document.createElement("li")
                tip2ResultItem.setAttribute("class", "list-item tile is-child box")
                //create text for li
                tip2ResultItem.textContent = 'Tip: Not everything is in our free database, try using "Browse" to see what is available';
                //append li to ul in the aside
                searchResults.appendChild(tip2ResultItem)
            }
        });
}
//Create function to display plants on search page
var displayPlants = function (result) {
    //For loop to display all results
    for (var i = 0; i < result.data.length; i++) {
        //Determine if the result is available on free API (first 3000 plants available)
        if (result.data[i].id < 3001) {
            //get common name from data
            var plantCommonName = result.data[i].common_name;
            //get ID code from data
            var plantID = result.data[i].id;
            //create li element on search page
            var resultItem = document.createElement("li");
            //add class to created li
            resultItem.setAttribute("class", "list-item tile is-child box");
            //add the ID code as id for li
            resultItem.setAttribute("id", plantID);
            //create text for li
            resultItem.textContent = plantCommonName;
            if (!result.data[i].default_image || !result.data[i].default_image.thumbnail) {
            } else {
                var plantThumbnail = result.data[i].default_image.thumbnail;
                var plantThumbnailEL = document.createElement("img")
                plantThumbnailEL.setAttribute("src", plantThumbnail)
                plantThumbnailEL.setAttribute("class", "thumbnail")
                resultItem.appendChild(plantThumbnailEL)
            }
            //append li to ul in the aside
            searchResults.appendChild(resultItem);
        }
    }
}
//Event listener to click on search result li and display plant card

var paginationPrevious = function (event) {
    var count = document.getElementById("searchResults").childElementCount;
    if (count == 30 && pageNum > 1) {
        pageNum--
        searchResults.innerHTML = ""
        checkParameters()
    }
}

var paginationNext = function (event) {
    var count = document.getElementById("searchResults").childElementCount;
    if (count == 30 && pageNum < 37) {
        pageNum++
        searchResults.innerHTML = ""
        checkParameters()
    }
}

var clickSearchList = function (event) {
    if (event.target.matches("li")) {
        //set li id as the id number to use in url
        var idNumber = event.target.id
        //define url to use for plant cards
        plantURL = "https://perenual.com/api/species/details/" + idNumber + "?key=" + plantKey;
        //Fetch Plant API with specific plant ID
        fetch(plantURL, requestOptions)
            //Parse  
            .then(response => response.json())
            .then(result => {
                // run function display plant card
                displayPlantCard(result);
            });
    }
}

searchResults.addEventListener("click", clickSearchList);
nextButton.addEventListener("click", paginationNext);
previousButton.addEventListener("click", paginationPrevious);

checkParameters()
