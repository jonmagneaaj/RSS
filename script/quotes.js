let quotes;

fetch("quotes.json")
  .then(response => response.json())
  .then(data => {
    quotes = data;
    let currentQuoteIndex = Math.floor(Math.random() * quotes.length);

    function updateQuote() {
    
      let quote = document.createTextNode(quotes[currentQuoteIndex].quote);
      let i = document.createElement("i");
      i.appendChild(quote);
      document.getElementById("quote").innerHTML = "";
      document.getElementById("quote").appendChild(i);
      document.getElementById("author").innerHTML = quotes[currentQuoteIndex].author ? quotes[currentQuoteIndex].author : "";
      
  

      currentQuoteIndex++;
      if (currentQuoteIndex >= quotes.length) {
        currentQuoteIndex = 0;
      }
    }

    updateQuote();
    setInterval(updateQuote, 5*9000);
  })
  .catch(error => {
    console.error("An error occurred while fetching the JSON file:", error);
  });
