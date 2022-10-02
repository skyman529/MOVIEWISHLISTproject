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
    results.setAttribute("style", "display:none");
    wishlist.setAttribute("style", "display:none");
    wishlistContainer.setAttribute("style", "display:none");
  }

  function wishListPage(event) {
  
    event.preventDefault();
    renderWishlist(); //builds wishlist elements on screen
    searchMovie.setAttribute("style", "display:none");
    results.setAttribute("style", "display:none");
    wishlist.setAttribute("style", "display");
    wishlistContainer.setAttribute("style", "display");
    
  }

// jQuery for navbar carousel and scroll
$(document).ready(function(){
  $('.sidenav').sidenav();
});
$(document).ready(function(){
  $('.carousel').carousel();
});

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
    button.setAttribute("class", "right waves-effect waves-circle waves-light btn-floating secondary-content red lighten-2 deep-purple-text text-darken-2 hoverable");
    button.setAttribute("style", "margin-right: 20px;");
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


// function that grabs carousel item then
function getcarouselitem(index) {
  return document.querySelector('#carousel-item'+ index);
}
// updates the Background
function updateBackground(urlofposter, index) {
  var posterart = getcarouselitem(index);
  posterart.setAttribute("style",
   "background-image: url('" +urlofposter + "');");
}

// updates the the background with images  
// which can be updated to upcomining title poster art from imdb api

updateBackground("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.B5_YJzRGth8Wrx8GYa2NMgAAAA%26pid%3DApi&f=1&ipt=26ee93f62f1d49480d628872ce94cd4e1b6c7b6f0772ddc258b7f566b4b77621&ipo=images", 1)
updateBackground("https://source.unsplash.com/686x1016/?cinema", 2)
updateBackground("https://source.unsplash.com/686x1016/?horror", 3)
updateBackground("https://source.unsplash.com/686x1016/?monsters", 4)
updateBackground("https://source.unsplash.com/686x1016/?topgun", 5)

// listeners to call functions on Movie Search or Wishlist clicks
addWishlistBtn.addEventListener('click', storeWishlist);
searchMovieBtn.addEventListener('click', getmoviedata);

// navigation listeners
searchBarBtn.addEventListener('click', searchBarPage);
wishListBtn.addEventListener('click', wishListPage)
