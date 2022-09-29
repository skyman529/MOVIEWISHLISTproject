// step one grab relavent html element
// var submitbtnEl = $("#search-movie")
var submitbtnEl = document.querySelector('#search-movie');
var searchInputEl = document.querySelector('.search');
var movieTitleEL = document.querySelector('#Title');
var movieReleasedEL = document.querySelector('#Released');
var moviePosterEL = document.querySelector('#Poster');
var moviePlotEL = document.querySelector('#Plot');
// add event listener to connect the function so it happens
// submitbtnEl.click(getmoviedata)
submitbtnEl.addEventListener('click', getmoviedata);


// query's citys weather pulls data
  function getmoviedata(event) {
    event.preventDefault();
   
    var searchInputEl = $("#search")
    var title = searchInputEl.val()
    console.log(title);
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=a8088794`)
  .then(response => response.json())
  .then(response => 
    {
        console.log(response)
        var Title = response.Title;
        var Released = response.Released;
        var Poster = response.Poster;
        var Plot = response.Plot;

       
        movieTitleEL.textContent = Title;
        movieReleasedEL.textContent = Released;
        moviePosterEL.textContent = Poster;
        moviePlotEL.textContent = Plot;
       
        


    }
  )
  .catch(err => console.error(err));
    
  }
  
// jQuery for navbar

$(document).ready(function(){
  $('.sidenav').sidenav();
});



