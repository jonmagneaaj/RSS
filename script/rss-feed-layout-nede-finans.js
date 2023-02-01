const feedURLfinans = 'https://ws.finansavisen.no/api/articles.rss?category=B%C3%B8rs';

fetch(feedURLfinans)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const items = xml.querySelectorAll('item');

    const outputContainer = document.getElementById('outputFinans');

    let i = 0;
    
    let isTransitioning = false;

function updateOutput() {
  if (isTransitioning) {
    return;
  }
  isTransitioning = true;
  if (i >= 10) {               // 9 pleide å være items.length
    i = 0;
  }

  const item = items[i];
  const title = item.querySelector('title').textContent;
  const description = item.querySelector('description').textContent;
  const h2 = document.createElement('h4');
  const p = document.createElement('h5');
  h2.textContent = title;
  p.textContent = description;
  
  if (p.textContent.length > 300) {
    var sentences = p.textContent.split('. ');
    var truncatedText = sentences.slice(0, 2).join('. ');
    if (truncatedText.slice(-1) !== ".") {
        truncatedText += ".";
    }
    p.textContent = truncatedText;
}

  
  outputContainer.classList.add('fade-out');
  
    setTimeout(() => {

      outputContainer.innerHTML = '';
      outputContainer.appendChild(h2);
      outputContainer.appendChild(p);
      outputContainer.classList.remove('fade-out');
      setTimeout(() => {
       
        outputContainer.classList.add('fade-in');
      }, 200); // match the duration to 0.2s
      
      setTimeout(() => {
        isTransitioning = false;
        i++;
      }, 500); // match the duration to 0.2s
    }, 500); // match the duration to 0.2s
    
    
}

updateOutput(); // call the function immediately
setInterval(updateOutput, 300000);

    

  })
  .catch((error) => {
    console.error(error);
  });