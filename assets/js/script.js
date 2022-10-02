// relavent html elements
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
var upcoming = document.querySelector('#upcoming');
var carousel = document.querySelectorAll('.carousel-pic');

// event listeners to buttons
submitbtnEl.addEventListener('click', getmoviedata);
searchBarBtn.addEventListener('click', searchBarPage);
wishListBtn.addEventListener('click', wishListPage)


// OMDB API fetch for search bar results
function getmoviedata(event) {
  event.preventDefault();
  results.setAttribute("style", "display");
  var searchInputEl = $("#search-movie-input")
  var title = searchInputEl.val()
  console.log(title);
  fetch(`https://www.omdbapi.com/?t=${title}&apikey=a8088794`)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      var Title = response.Title;
      var Released = response.Released;
      var Poster = response.Poster;
      var Plot = response.Plot;

      movieTitleEL.textContent = Title;
      movieReleasedEL.textContent = Released;
      moviePosterEL.src = Poster;
      moviePlotEL.textContent = Plot;

    })

    .catch(err => console.error(err));

}

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

// Rendering serch page
function searchBarPage(event) {
  event.preventDefault();
  searchMovie.setAttribute("style", "display");
  upcoming.setAttribute("style", "display");
  results.setAttribute("style", "display:none");
  wishlist.setAttribute("style", "display:none");
}

// Rendering watchlist page
function wishListPage(event) {
  event.preventDefault();
  searchMovie.setAttribute("style", "display:none");
  upcoming.setAttribute("style", "display:none");
  results.setAttribute("style", "display:none");
  wishlist.setAttribute("style", "display");
}

// jQuery for navbar
$(document).ready(function () {
  $('.sidenav').sidenav();
});

// jQuery for carousel
$(document).ready(function () {
  $('.carousel').carousel();
});

// scroll to the results
$('#search-movie').click(function () {
  var offset = $('#results').offset().top;
  $('html,body').animate({
    scrollTop: offset
  }, 100);
});