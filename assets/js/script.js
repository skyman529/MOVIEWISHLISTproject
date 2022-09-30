// step one grab relavent html element
// var submitbtnEl = $("#search-movie")
var submitbtnEl = document.querySelector('#search-movie');
var searchBarBtn = document.querySelector('.search-bar-button');
var wishListBtn = document.querySelector('.wishlist-button');
var movieTitleEL = document.querySelector('.Title');
var movieReleasedEL = document.querySelector('.Released');
var moviePosterEL = document.querySelector('.Poster');
var moviePlotEL = document.querySelector('.Plot');
var results = document.querySelector('#results');
var wishlist = document.querySelector('#wishlist');
var searchMovie = document.querySelector('#search-movie-bar');
// add event listener to connect the function so it happens
// submitbtnEl.click(getmoviedata)
submitbtnEl.addEventListener('click', getmoviedata);
searchBarBtn.addEventListener('click', searchBarPage);
wishListBtn.addEventListener('click', wishListPage)


// query's citys weather pulls data
  function getmoviedata(event) {
    event.preventDefault();
    results.setAttribute("style", "display");
    var searchInputEl = $("#search-movie-input")
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
        moviePosterEL.src = Poster;
        moviePlotEL.textContent = Plot;
       
        


    }
  )
  .catch(err => console.error(err));
    
  }

  function searchBarPage(event) {
    event.preventDefault();
    searchMovie.setAttribute("style", "display");
    results.setAttribute("style", "display:none");
    wishlist.setAttribute("style", "display:none");
  }

  function wishListPage(event) {
    event.preventDefault();
    searchMovie.setAttribute("style", "display:none");
    results.setAttribute("style", "display:none");
    wishlist.setAttribute("style", "display");
  }
// jQuery for navbar

$(document).ready(function(){
  $('.sidenav').sidenav();
});



