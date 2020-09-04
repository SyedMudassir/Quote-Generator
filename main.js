const  quoteContainer = document.getElementById("quote-container");
const  quoteText = document.getElementById("quote");
const  quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitterButton");
const  newQuoteBtn = document.getElementById("newQuoteButton");
const loader = document.getElementById("loader");
// Show Loading spinner
function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// // Remove Loading spinner
function removeLoadingSpinner(){
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get Quote From API
async function getQuote () {
  showLoadingSpinner();
  const proxyUrl = "https://powerful-falls-72254.herokuapp.com/";
  const apiUrl = "http://api.forismatic.com/api/1.0/?getQuote&lang=en&format=json";
try{
  const respone = await fetch(proxyUrl + apiUrl);
  const data = await response.json();
//   Setting Author Name to Unknow  
  if (data.quoteAuthor === ""){
    quoteAuthor.innerText = "Unknown"
  } else{
    quoteAuthor.innerText = data.quoteAuthor;
  }
//  Adding class to reduce font size for long quotes
  if(data.quoteText.length >120){
    quoteText.classList.add("long-text");
  }
  else{
    quoteText.classList.remove("long-text");
  }
  quoteText.innerText = data.quoteText;
  removeLoadingSpinner();
}
  catch(error){
    getQuote();
  }
}
function tweetQuote(){
  const quote = quoteText.innerText;
  const author = quoteAuthor.innertext;
  const tweetUrl =`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl,"_blank");
}
twitterButton.addEventListener("click",tweetQuote);
newQuoteButton.addEventListener("click",getQuote);
// onLoad
getQuote();