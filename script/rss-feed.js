const feedURL = 'https://www.nrk.no/toppsaker.rss';

// URL of the backup image to use if the feed item doesn't have an image
const backupImageURL = '/resources/nrk_bakgrunn.jpeg';

// Fetch the RSS feed from the given URL
fetch(feedURL)
  // Convert the response to text
  .then((response) => response.text())
  // Parse the text as XML
  .then((data) => {
    // Create a new DOM parser
    const parser = new DOMParser();
    // Parse the XML data
    const xml = parser.parseFromString(data, 'text/xml');
    // Get a list of all the 'item' elements in the XML
    const items = xml.querySelectorAll('item');

    // Get the output container element
    const outputContainer = document.getElementById('output');
    // Get the image element
    const imageElement = document.getElementById('my-image');
    // Create h2 and p elements
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    // Initialize a counter variable
    let i = 0;
    // Set an interval to update the page content every 10 seconds
    setInterval(() => {
      // If the counter has reached the end of the list of items, reset it to 0
      if (i >= items.length) {
        i = 0;
      }

      // Get the current item
      const item = items[i];
      // Get a list of all the 'media:content' elements in the XML
      const imageElements = xml.getElementsByTagName('media:content');
      // Get the first 'media:content' element
      const firstImageElement = imageElements[i];
      // Get the 'url' attribute of the first 'media:content' element
      const firstImageURL = firstImageElement.getAttribute('url');
      // Get the text content of the 'title' element of the current item
      const title = item.querySelector('title').textContent;
      // Get the text content of the 'description' element of the current item
      const description = item.querySelector('description').textContent;

      // Set the src attribute of the image element to the first image URL
      // or the backup image URL if the first image URL is invalid
      imageElement.src = firstImageURL || backupImageURL;

      // Set the text content of the h2 and p elements
      h2.textContent = title;
      p.textContent = description;


      // Add the 'fade-out' class to the output container     //nyyyyyyyyyyyyy
      outputContainer.classList.add('fade-out');
        // Wait for the transition to finish
      setTimeout(() => {


      // Clear the output container and append the h2 and p elements
      outputContainer.innerHTML = '';
      outputContainer.appendChild(h2);
      outputContainer.appendChild(p);

      // Fjerne fade-out
      outputContainer.classList.remove('fade-out');
      // Add the 'fade-in' class to the output container
      outputContainer.classList.add('fade-in');

      }, 500); // 500ms (duration of the 'fade-out' transition)

      // Fjerne fade-in
      outputContainer.classList.remove('fade-in');
 


      // Increment the counter
      i++;
    }, 10000); // 10 second interval
  })
  // Catch any errors that occur during the fetch or parsing
  .catch((error) => {
    console.error(error);
  });