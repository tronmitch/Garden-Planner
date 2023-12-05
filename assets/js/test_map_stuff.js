// Selecting elements
const buttonEl = document.getElementById('locationButton');
const inputEl = document.getElementById('locationInput');

// File path for JSON data
const filePath = '.../assets/docs/data.json';

// Fetching zip code data
const zipCodeData = fetch(filePath)
  .then(response => response.json())
  .then(data => data);

// Object to store zone data
let zoneData = {};
let zipCode = '';

// Function to get zip code from city name
function getZipCode(city) {
  const apiKey = 'AIzaSyBwYeLd2bVkQbfhrXRnBLNd_EmkzSREn6E';
  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;

  // Step 1: Get coordinates (latitude and longitude) for the city
  return fetch(geocodingApiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const reverseGeocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`;

        // Step 2: Reverse geocode to get detailed address information
        return fetch(reverseGeocodingApiUrl)
          .then(response => response.json())
          .then(data => {
            if (data.status === 'OK' && data.results.length > 0) {
              const addressComponents = data.results[0].address_components;

              // Find the zip code from the address components
              zipCode = addressComponents.find(component => component.types.includes('postal_code')).long_name;
              return zipCode;
            }
          });
      }
    });
}

// Event listener for button click
buttonEl.addEventListener('click', function (event) {
  event.preventDefault();
  var buttonID = event.target.id;

  // Get button clicked ID and input value
  const buttonClickedID = event.target.parentNode.id;
  const input = $(`#${buttonClickedID} input`).val();

  // Get zip code from the input city
  getZipCode(input)
    .then(x => {
      if (buttonClickedID && buttonClickedID === 'Location_search') {
        // Fetch zone data based on the obtained zip code
        fetch(filePath)
          .then(response => response.json())
          .then(data => {
            zoneData = data.find(obj => obj['zipcode'] === x);
            console.log(zoneData);

            var zone = zoneData.zone
            for (var i = 3; i < 13; i++) {
              // console.log(i)
              if (zone === i + "a" || zone === i || zone === i + "b") {
                var lower = i-2
                var upper = i+2
                var hardinessZone = lower + "-" + upper ;
                console.log(hardinessZone)
              }
              sessionStorage.setItem("searchParameterKey", hardinessZone)
              var searchParameters = {
                button: buttonID,
                search: hardinessZone
            }
            sessionStorage.setItem("searchParameterKey", JSON.stringify(searchParameters));
            window.location.href = "./results.html";
            }
          });
      }
    });
});
