const feedURL = 'https://www.nrk.no/toppsaker.rss';
const backupImageURL = './resources/nrk_bakgrunn.jpeg';

fetch(feedURL)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const items = xml.querySelectorAll('item');

    const outputContainer = document.getElementById('output');
    const imageElement = document.getElementById('my-image');
    imageElement.src = backupImageURL;

    let i = 0;
    
    let isTransitioning = false;

function updateOutput() {
  if (isTransitioning) {
    return;
  }
  isTransitioning = true;
  if (i >= 9) {               // 9 pleide å være items.length
    i = 0;
  }

  const item = items[i];
  const title = item.querySelector('title').textContent;
  const description = item.querySelector('description').textContent;
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  h2.textContent = title;
  p.textContent = description;
  
  if (p.textContent.length > 330) {
    p.textContent = p.textContent.substring(0, 330) + " (...)";
  }

  const imageElements = item.getElementsByTagName('media:content');
  let firstImageURL = backupImageURL;
  if (imageElements.length > 0) {
    firstImageURL = imageElements[0].getAttribute('url');
  }
  imageElement.classList.add('fade-out');
  outputContainer.classList.add('fade-out');
  
    setTimeout(() => {
      imageElement.src = firstImageURL;
      imageElement.classList.remove('fade-out');
      outputContainer.innerHTML = '';
      outputContainer.appendChild(h2);
      outputContainer.appendChild(p);
      outputContainer.classList.remove('fade-out');
      setTimeout(() => {
        imageElement.classList.add('fade-in');
        outputContainer.classList.add('fade-in');
      }, 200); // match the duration to 0.2s
      
      setTimeout(() => {
        isTransitioning = false;
        i++;
      }, 500); // match the duration to 0.2s
    }, 500); // match the duration to 0.2s
    
    
}
setInterval(updateOutput, 3*9000);

    

  })
  .catch((error) => {
    console.error(error);
  });