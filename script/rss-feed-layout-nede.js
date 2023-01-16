const feedURL = 'https://www.nrk.no/nyheter/siste.rss';

fetch(feedURL)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const items = xml.querySelectorAll('item');

    const outputContainer = document.getElementById('output');

    let i = 0;
    
    let isTransitioning = false;

function updateOutput() {
  if (isTransitioning) {
    return;
  }
  isTransitioning = true;
  if (i >= 5) {               // 9 pleide å være items.length
    i = 0;
  }

  const item = items[i];
  const title = item.querySelector('title').textContent;
  const description = item.querySelector('description').textContent;
  const h2 = document.createElement('h5');
  const p = document.createElement('h6');
  h2.textContent = title;
  p.textContent = description;
  
  if (p.textContent.length > 175) {
    p.textContent = p.textContent.substring(0, 175) + " (...)";
  }

  
  outputContainer.classList.add('fade-out');
  
    setTimeout(() => {

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
setInterval(updateOutput, 6000);

    

  })
  .catch((error) => {
    console.error(error);
  });