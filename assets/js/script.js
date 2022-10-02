var searchMovieBtn = document.querySelector('#search-movie');
var searchBarBtn = document.querySelector('.search-bar-button');
var searchBarBtnTwo = document.querySelector('.search-bar-button-two');
var wishListBtn = document.querySelector('.wishlist-button');
var wishListBtnTwo= document.querySelector('.wishlist-button-two');
var movieTitleEL = document.querySelector('.Title');
var movieReleasedEL = document.querySelector('.Released');
var moviePosterEL = document.querySelector('.Poster');
var moviePlotEL = document.querySelector('.Plot');
var results = document.querySelector('#results');
var wishlist = document.querySelector('#wishlist');
var searchMovie = document.querySelector('#search-movie-bar');
var addWishlistBtn = document.querySelector('#add-button');
var upcoming = document.querySelector('#upcoming');
var carousel = document.querySelectorAll('.carousel-pic');

// declare global vars and objects
var movieTitle;
var moviesObj = []; // populated from localStorage on page init





// Return Movie Data from endpoint
  function getmoviedata(event) {
    event.preventDefault();
    results.setAttribute("style", "display");
    var searchInputEl = $("#search-movie-input")
    var title = searchInputEl.val()
    
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
        movieTitle = Title;
    }
  )
  .catch(err => console.error(err));
    
  }
// Renders Movie Search or Wishlist from Main Nav
  function searchBarPage(event) {
    event.preventDefault();
    searchMovie.setAttribute("style", "display");
    upcoming.setAttribute("style", "display");
    results.setAttribute("style", "display:none");
    wishlist.setAttribute("style", "display:none");
    wishlistContainer.setAttribute("style", "display:none");
  }

  function wishListPage(event) {
  
    event.preventDefault();
    renderWishlist(); //builds wishlist elements on screen
    searchMovie.setAttribute("style", "display:none");
    upcoming.setAttribute("style", "display:none");
    results.setAttribute("style", "display:none");
    wishlist.setAttribute("style", "display");
    wishlistContainer.setAttribute("style", "display");
    
  }


// jQuery for navbar
$(document).ready(function(){
  $('.sidenav').sidenav();
});

// jQuery for carousel
$(document).ready(function(){
  $('.carousel').carousel();
});

// scroll to the results

$('#search-movie').click(function () {
  var offset = $('#results').offset().top;
  $('html,body').animate({
    scrollTop: offset
  }, 100);
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
 
  // Clear wishlist html element
  wishlist.innerHTML = "";
  
  // Render a new li for each wishlist
  for (var i = 0; i < moviesObj.length; i++) {
    var movie = moviesObj[i];
    var li = document.createElement("li");    
    
    li.setAttribute("data-index", i);
    li.setAttribute("class", "collection-item valign-wrapper");

    

    var button = document.createElement("button");
    button.textContent = "-";
    button.setAttribute("class", "right waves-effect waves-circle waves-light btn-floating secondary-content blue lighten-5 deep-purple-text text-darken-2 hoverable");
    button.setAttribute("style", "margin-right: 20px;");
    button.setAttribute("font-weight", "bolder;");
    li.appendChild(button);
    wishlist.appendChild(li);


    var h4 = document.createElement("h4");
    h4.textContent = movie;
    li.appendChild(h4);
    h4.setAttribute("class", "left Title header black-text left");


  }
}

// Saves Movie to Wishlist
function storeWishlist() {
  moviesObj.push(movieTitle); // adds movie to local object
  localStorage.setItem("Wishlist", JSON.stringify(moviesObj)); //replaces localStorage wishlist values with our moviesObj
  
    // displays wishlist after adding a movie
    renderWishlist();
    wishlist.setAttribute("style", "display");
    wishlistContainer.setAttribute("style", "display");
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
searchBarBtnTwo.addEventListener('click', searchBarPage);
wishListBtn.addEventListener('click', wishListPage);
wishListBtnTwo.addEventListener('click', wishListPage);


// TMDB API fetch for upcoming movie results
fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=dd204bc02415589bf9e5f5b40b5ad914&language=en-US&page=1')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (var i = 0; i < carousel.length; i++) {
      carousel[i].src = "https://image.tmdb.org/t/p/original/" + data.results[i].poster_path;
    }
  });

