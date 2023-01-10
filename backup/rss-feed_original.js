

// Step 1: Find the URL of the RSS feed
const feedURL = 'https://www.nrk.no/toppsaker.rss';

// Step 2: Fetch the RSS feed from the URL
fetch(feedURL)
  .then(response => response.text())
  .then(data => {
    // Step 3: Parse the XML data into a DOM object
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');

    // Step 4: Extract the relevant information from the feed
    const items = xml.querySelectorAll('item');
    let counter = 0;
    for (const item of items) {
      if (counter >= 1) {
        break;
      }

      //hente bilde-url
      const imageElements = xml.getElementsByTagName("media:content");
      const firstImageElement = imageElements[0];
      const firstImageURL = firstImageElement.getAttribute("url");

      const title = item.querySelector('title').textContent;
      const description = item.querySelector('description').textContent;
      const mediaContent = item.querySelector('media\\:content');
      const mediaImageURL = mediaContent ? mediaContent.getAttribute('url') : 'https://media.istockphoto.com/id/1222806141/photo/computer-error.jpg?s=612x612&w=0&k=20&c=QqNEXgbPj31_dIabFdYxu61_H0XJCKc5S_2LO7Z_TeU=';

      
      /*
      console.log("Total: "+item);
      console.log("bilde URL: "+mediaImageURL);
      console.log("media Content: "+mediaContent);
      console.log(firstImageURL);
      */
      
        
     

      // Get a reference to the output container



const outputContainer = document.getElementById('output');
const imageContainer = document.getElementById('image');
const imageElement = document.getElementById('my-image');
imageElement.src = firstImageURL;


// Add the title, description, and media image to the page
outputContainer.innerHTML += `<h2>${title}</h2>`;
outputContainer.innerHTML += `<p>${description}</p>`;





      counter++;
    }
  });





