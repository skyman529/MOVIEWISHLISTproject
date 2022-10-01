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
// Renders Movie Search or Wishlist from Main Nav
  function searchBarPage(event) {
    event.preventDefault();
    searchMovie.setAttribute("style", "display");
    results.setAttribute("style", "display:none");
    wishlist.setAttribute("style", "display:none");
  }

  function wishListPage(event) {
    console.log("wishlistPage function called");
    event.preventDefault();
   
    searchMovie.setAttribute("style", "display:none");
    results.setAttribute("style", "display:none");
    wishlist.setAttribute("style", "display");
    renderWishlist();
  }

// jQuery for navbar
$(document).ready(function(){
  $('.sidenav').sidenav();
});


// called on page load to poplate Wishlist global object from localStorage

function init() {
 var storedWishlist = JSON.parse( localStorage.getItem('Wishlist'));
  // if 
  if (storedWishlist !== null) {
    moviesObj = storedWishlist;
  }
  
}



// Renders Wishlist Items from localStorage and displays in Wishlist Card
function renderWishlist() {
 
  // Clear todoList element and update todoCountSpan
  wishlist.innerHTML = "";
  
  // Render a new li for each wishlist
  for (var i = 0; i < moviesObj.length; i++) {
    var movie = moviesObj[i];
    var li = document.createElement("li");
    li.textContent = movie;
    li.setAttribute("data-index", i);
    li.setAttribute("class", "collection-item");
    var button = document.createElement("button");
    button.textContent = "Remove";
    button.setAttribute("class", "waves-effect waves-light btn teal lighten-5 deep-purple-text text-darken-2 hoverable");
    li.appendChild(button);
    wishlist.appendChild(li);
  }
  
}

// Saves Movie to Wishlist
function storeWishlist() {
  moviesObj.push(movieTitle); // adds movie to local object
  localStorage.setItem("Wishlist", JSON.stringify(moviesObj)); //replaces localStorage wishlist values with our moviesObj
  
  // displays wishlist after adding a movie
  renderWishlist();
  wishlist.setAttribute("style", "display");
}

// Removes Movie from Wishlist
wishlist.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the movie element from the list
    var index = element.parentElement.getAttribute("data-index");
    moviesObj.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    localStorage.setItem("Wishlist", JSON.stringify(moviesObj));
    renderWishlist();
    

  }
});

init();

// listeners to call functions on Movie Search or Wishlist clicks
addWishlistBtn.addEventListener('click', storeWishlist);
searchMovieBtn.addEventListener('click', getmoviedata);

// navigation listeners
searchBarBtn.addEventListener('click', searchBarPage);
wishListBtn.addEventListener('click', wishListPage)

