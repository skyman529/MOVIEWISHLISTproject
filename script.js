// step one grab relavent html element
var submitbtnEl = $("#searchbtn")
// the logic of the fucntion that i will want to occur
// add event listener to connect the function so it happens
submitbtnEl.click(getmoviedata)
// query's citys weather pulls data
  function getmoviedata() {
    var inputEl = $("#input")
    var title= inputEl.val()
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=a8088794`)
  .then(response => response.json())
  .then(response => 
    {
        console.log(response)

    }
  )
  .catch(err => console.error(err));
    
  }
 

  function createCard(card)
  {
    var cardEl = $("<div>") 
    cardEl.appendTo(card)
  }
createCard(submitbtnEl)
