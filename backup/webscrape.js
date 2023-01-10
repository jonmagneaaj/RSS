const request = require('request');
const fs = require('fs');
const xpath = require('xpath');  // Include the xpath library
const { JSDOM } = require('jsdom');  // Include the jsdom library

function scrape() {
  console.log('Scraping started');

  // Make a request to the webpage
  request('https://e24.no', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      // Parse the HTML into a DOM object
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      // Evaluate the XPath expression and select the elements
      const elements = xpath.select('/html/body/div/div[3]/div/div[1]/div', doc);

      // Initialize an array to store the data
      const data = [];

      // Iterate over the elements
      elements.forEach(element => {
        // Get the value of the aria-label attribute
        const ariaLabel = element.getAttribute('aria-label');
        // If the attribute is not empty, add it to the array
        if (ariaLabel.trim()) {
          data.push(ariaLabel);
        }
      });

      // Open a stream to the file
      const stream = fs.createWriteStream('webscrapejs6.txt');

      // Write the data to the file
      stream.write(data.join('\n'));

      // Close the stream
      stream.end();
    }
  });
}

// Call the scrape function
scrape();
