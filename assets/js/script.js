// web selectors for listeners and displaying content

var searchMovieBtn = document.querySelector('#search-movie');
var searchBarBtn = document.querySelector('.search-bar-button');
var wishListBtn = document.querySelector('.wishlist-button');
var movieTitleEL = document.querySelector('.Title');
var movieReleasedEL = document.querySelector('.Released');
var moviePosterEL = document.querySelector('.Poster');
var moviePlotEL = document.querySelector('.Plot');
var results = document.querySelector('#results');
var wishlist = document.querySelector('#wishlist');
var searchMovie = document.querySelector('#search-movie-bar');
var addWishlistBtn = document.querySelector('#add-button');

// declare global vars and objects
var movieTitle;
var moviesObj = []; // populated from localStorage on page init





// Return Movie Data from endpoint
  function getmoviedata(event) {
    event.preventDefault();
    results.setAttribute("style", "display");
    var searchInputEl = $("#search-movie-input")
    var title = searchInputEl.val()
    movieTitle = title;
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=a8088794`)
  .then(response => response.json())
  .then(response => 
    {
        // set local vars from returned API object
        var Title = response.Title;
        var Released = response.Released;
        var Poster = response.Poster;
        var Plot = response.Plot;

        // render movie content from vars
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


/// Movie Wishlist Functions to save to localStorage;

function storeWishlist() {
  moviesObj.push(movieTitle);
  localStorage.setItem("Wishlist", JSON.stringify(moviesObj));
}

// called on page load to store city search history from localStorage in var

function init() {
 var storedWishlist = JSON.parse( localStorage.getItem('Wishlist'));
  // TODO: Describe the functionality of the following `if` statement.
  console.log(storedWishlist);
  if (storedWishlist !== null) {
    moviesObj = storedWishlist;
  }
  
  // renderWishlist();
}
init();



// // TODO: What is the purpose of this function?
function renderWishlist() {
  // Clear todoList element and update todoCountSpan
  wishlist.innerHTML = "";
  
  // Render a new li for each wishlist
  for (var i = 0; i < moviesObj.length; i++) {
    var movie = moviesObj[i];
    console.log(movie);
    var li = document.createElement("li");
    li.textContent = "movie hard coded";
    li.setAttribute("data-index", i);
    var button = document.createElement("button");
    button.textContent = "Clear :heavy_check_mark:";
    li.appendChild(button);
    wishlist.appendChild(li);
  }
}
renderWishlist();

// function to save event description on save button click
addWishlistBtn.addEventListener('click', storeWishlist);
searchMovieBtn.addEventListener('click', getmoviedata);

searchBarBtn.addEventListener('click', searchBarPage);
wishListBtn.addEventListener('click', wishListPage)

