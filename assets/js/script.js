// step one grab relavent html element
var submitbtnEl = $("#searchbtn")
// the logic of the fucntion that i will want to occur
// add event listener to connect the function so it happens
submitbtnEl.click(getWeatherdata)
// query's citys weather pulls data
  function getWeatherdata() {
    var inputEl = $("#input")
    var city= inputEl.val()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5a600330dcc1a04f3349222a9a1a298`)
  .then(response => response.json())
  .then(response => 
    {
        console.log(response)

    }
  )
  .catch(err => console.error(err));
    
  }
  
// jQuery for navbar

$(document).ready(function(){
  $('.sidenav').sidenav();
});