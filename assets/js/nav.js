// variables
var menu = $(".dropdown-trigger")
var navLocation = $(".dropdown")
var navList = document.querySelector(".navMenu")
//event listener
menu.on("click",activatingNav)
//function to activate nav
function activatingNav(){
    if (navLocation.hasClass("is-active")){
        navLocation.removeClass("is-active")
        navList.setAttribute('style', 'display:inline')

    }else{
    navLocation.addClass("is-active")
    navList.setAttribute('style', 'display:none')
}
}
//activateNav function end