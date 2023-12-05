var plantFavorites = JSON.parse(localStorage.getItem("plantFavorites"))
//console.log(plantFavorites)


var searchParameter = sessionStorage.getItem("searchParameterKey");

var searchResults = document.getElementById("searchResults");

//clear any results in the search results field

//searchResults.innerHTML = ""

//Set URL for search function

//fetch results based on search term



//Create function to display plants on search page
var displayFavoritePlantsPage = function () {
    //For loop to display all results
    //console.log(plantFavorites)
    for (var i = 0; i < plantFavorites.length; i++) {
        idNumber = plantFavorites[i];
        plantURL = "https://perenual.com/api/species/details/" + idNumber + "?key=" + plantKey;
        fetch(plantURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    //get common name from data
                    var plantCommonName = result.common_name;
                    //get ID code from data
                    var plantID = result.id;
                    //create li element on search page
                    var resultItem = document.createElement("li");
                    //add class to created li
                    resultItem.setAttribute("class", "list-item tile is-child box");
                    //add the ID code as id for li
                    resultItem.setAttribute("id", plantID);
                    //create text for li
                    resultItem.textContent = plantCommonName;
                     if (!result.default_image || !result.default_image.thumbnail) {
                     } else {
                         var plantThumbnail = result.default_image.thumbnail;
                         var plantThumbnailEL = document.createElement("img")
                         plantThumbnailEL.setAttribute("src", plantThumbnail)
                         plantThumbnailEL.setAttribute("class", "thumbnail")
                         resultItem.appendChild(plantThumbnailEL)
                     }
                    //append li to ul in the aside
                    searchResults.appendChild(resultItem);

                } else {
                    var noResultItem = document.createElement("li")
                    noResultItem.setAttribute("class", "list-item tile is-child box")
                    //create text for li
                    noResultItem.textContent = "Sorry, No Favorites Found";
                    //append li to ul in the aside
                    searchResults.appendChild(noResultItem)
                }
            })
    }
}





//Event listener to click on search result li and display plant card


 var clickSearchList = function (event) {
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

 searchResults.addEventListener("click", clickSearchList);

displayFavoritePlantsPage()