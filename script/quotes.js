let quotes;

fetch("quotes.json")
  .then(response => response.json())
  .then(data => {
    quotes = data;
    let currentQuoteIndex = 0;

    function updateQuote() {
      document.getElementById("quote").innerHTML = quotes[currentQuoteIndex].quote;
      document.getElementById("author").innerHTML = quotes[currentQuoteIndex].author;

      currentQuoteIndex++;
      if (currentQuoteIndex >= quotes.length) {
        currentQuoteIndex = 0;
      }
    }

    updateQuote();
    setInterval(updateQuote, 30000);
  })
  .catch(error => {
    console.error("An error occurred while fetching the JSON file:", error);
  });