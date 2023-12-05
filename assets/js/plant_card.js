
//Function to display info on plant card
var displayPlantCard = function (result) {
  //define list where info plant will be populated
  plantInfo = document.querySelector("#plantInfo");
  //clear any data in plant info section
  plantInfo.innerHTML = "";
  //define variable for image area
  var plantImage = document.querySelector("#plantImage");
  //Clear any data in image section
  plantImage.innerHTML = ""

  if (!result.default_image || !result.default_image.thumbnail) {

  } else {
    //variable to pull image from data
    var plantImg = result.default_image.small_url;
    //create img element in HTML
    var plantImgEl = document.createElement("img")
    // Set attribute and src for img in HTML
    plantImgEl.setAttribute("src", plantImg)
    //append image to HTML
    plantImage.append(plantImgEl)
  }

  //Items to append to list in plant info

  //Create li for plant info
  var plantCommonNameLi = document.createElement("li")
  //Create variable that pulls common name for plant
  var plantCommonName = result.common_name;
  //Set class for created li
  plantCommonNameLi.setAttribute("class", "card-list-item");
  //Create test for li
  plantCommonNameLi.textContent = "Common name: " + plantCommonName;
  //Append li to list
  plantInfo.appendChild(plantCommonNameLi);
  var cardTitle = document.querySelector("#card-title");
  cardTitle.textContent = plantCommonName

  //Repeat for desired data
  var plantTypeLi = document.createElement("li")
  var plantType = result.type;
  plantTypeLi.setAttribute("class", "card-list-item");
  plantTypeLi.textContent = "Type: " + plantType;
  plantInfo.appendChild(plantTypeLi);

  var plantCycleLi = document.createElement("li")
  var plantCycle = result.cycle;
  plantCycleLi.setAttribute("class", "card-list-item");
  plantCycleLi.textContent = "Cycle: " + plantCycle;
  plantInfo.appendChild(plantCycleLi);

  var plantMaintenanceLi = document.createElement("li")
  var plantMaintenance = result.maintenance;
  plantMaintenanceLi.setAttribute("class", "card-list-item");
  plantMaintenanceLi.textContent = "Maintenance: " + plantMaintenance;
  plantInfo.appendChild(plantMaintenanceLi);

  var plantSunlightLi = document.createElement("li")
  var plantSunlight = result.sunlight;
  plantSunlightLi.setAttribute("class", "card-list-item");
  plantSunlightLi.textContent = "Sunlight: " + plantSunlight;
  plantInfo.appendChild(plantSunlightLi);

  var plantWateringLi = document.createElement("li")
  var plantWatering = result.watering;
  plantWateringLi.setAttribute("class", "card-list-item");
  plantWateringLi.textContent = "Watering: " + plantWatering;
  plantInfo.appendChild(plantWateringLi);

  var plantHardinessLi = document.createElement("li")
  var plantHardinessMin = result.hardiness.min;
  var plantHardinessMax = result.hardiness.max;
  plantHardinessLi.setAttribute("class", "card-list-item");
  plantHardinessLi.textContent = "Hardiness Zone: " + plantHardinessMin + "-" + plantHardinessMax;
  plantInfo.appendChild(plantHardinessLi);

  var plantDimensionLi = document.createElement("li")
  var plantDimension = result.dimension;
  plantDimensionLi.setAttribute("class", "card-list-item");
  plantDimensionLi.textContent = "Dimensions, " + plantDimension;
  plantInfo.appendChild(plantDimensionLi);

  var idNumber = result.id;
  var saveButton = document.createElement("button");
  saveButton.setAttribute("class", "save-button Btn button is-rounded is-small");
  saveButton.setAttribute("id", idNumber );
  saveButton.textContent = "Save to Favorites";
  plantInfo.append(saveButton);

  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "remove-button Btn button is-rounded is-small");
  deleteButton.setAttribute("id", idNumber );
  deleteButton.textContent = "Remove from Favorites";
  plantInfo.append(deleteButton);

  var removeFromFavorites =function() {
    var plantFavorites = JSON.parse(localStorage.getItem("plantFavorites"));
    var index = plantFavorites.indexOf(idNumber);
    var x = plantFavorites.splice(index, 1);
    localStorage.setItem("plantFavorites", JSON.stringify(plantFavorites));
    window.location.reload();
  }

  var saveToFavorites = function () {
  var plantFavorites = JSON.parse(localStorage.getItem("plantFavorites"));
  if(plantFavorites == null){
  var  plantFavorites =[];
  plantFavorites.push(idNumber);
  localStorage.setItem("plantFavorites", JSON.stringify(plantFavorites));
  } else {
    if ( !plantFavorites.includes(idNumber)) {
      plantFavorites.push(idNumber);
      localStorage.setItem("plantFavorites", JSON.stringify(plantFavorites));
      
    }
  }
}
    var saveButton = document.querySelector(".save-button");
    var deleteButton = document.querySelector(".remove-button");
    deleteButton.addEventListener("click", removeFromFavorites);
    saveButton.addEventListener("click", saveToFavorites);
}
