//Set variable for search button
var searchButton = document.getElementById("searchButton");
var browseButton = document.getElementById("browseButton");
var locationButton = document.getElementById("locationButton");
var searchResults = document.querySelector("#searchResults");


//event listener for search button
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  var buttonID = event.target.id;
  var searchInput = document.getElementById("searchInput");
  if (!searchInput.value) {
      return null
  } else {
      var searchParameters = {
          button: buttonID,
          search: searchInput.value
      }
      sessionStorage.setItem("searchParameterKey", JSON.stringify(searchParameters));
  window.location.href = "./results.html";
}
})

locationButton.addEventListener("click", function (event) {
  event.preventDefault()
  
  var buttonID = event.target.id;
  if (!locationInput.value) {
      return null
  } else {
      var searchParameters = {
          button: buttonID,
          search: locationInput.value
      }
      sessionStorage.setItem("searchParameterKey", JSON.stringify(searchParameters));
      //window.location.href = "./results.html";
  }
  searchInput.text = "";
})

browseButton.addEventListener("click", function (event) {
  event.preventDefault()
  var buttonID = event.target.id;
      var searchParameters = {
          button: buttonID,
          search: 0
      }
      sessionStorage.setItem("searchParameterKey", JSON.stringify(searchParameters));
      window.location.href = "./results.html";
  }
)