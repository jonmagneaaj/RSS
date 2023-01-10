

const feedURL = 'https://www.nrk.no/toppsaker.rss';

fetch(feedURL)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const items = xml.querySelectorAll('item');
    const item = items[0]; // Use only the first item
    const imageElements = xml.getElementsByTagName('media:content');
    const firstImageElement = imageElements[0];
    const firstImageURL = firstImageElement.getAttribute('url');
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;

    const outputContainer = document.getElementById('output');
    const imageElement = document.getElementById('my-image');
    imageElement.src = firstImageURL;

    // Create h2 and p elements
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    // Set the text content of the h2 and p elements
    h2.textContent = title;
    p.textContent = description;

    // Append the h2 and p elements to the output container
    outputContainer.appendChild(h2);
    outputContainer.appendChild(p);
  });



