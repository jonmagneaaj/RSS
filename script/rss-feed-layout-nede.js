const feedURLnede = 'https://www.nrk.no/nyheter/siste.rss';

fetch(feedURLnede)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const items = xml.querySelectorAll('item');

    let i = 1;
    let isTransitioning = false;

    function updateOutput() {
      if (isTransitioning) {
        return;
      }

      isTransitioning = true;

      if (i >= 1) {
        i = 0;
      }

      const item = items[i];
      const title = item.querySelector('title').textContent;
      let description = item.querySelector('description').textContent;
      const outputContainer = document.getElementById('outputNede');

      const h2 = document.createElement('h4');
      const p = document.createElement('h5');
      h2.textContent = title;

      if (description.length > 390) {
        let sentences = description.split('. ');
        let truncatedText = sentences.slice(0, 2).join('. ');
        if (truncatedText.slice(-1) !== '.') {
          truncatedText += '.';
        }
        description = truncatedText;
      }

      p.textContent = description;

      outputContainer.classList.add('fade-out');

      setTimeout(() => {
        outputContainer.innerHTML = '';
        outputContainer.appendChild(h2);
        outputContainer.appendChild(p);
        outputContainer.classList.remove('fade-out');
        outputContainer.classList.add('fade-in');

        setTimeout(() => {
          isTransitioning = false;
          i++;
        }, 500);
      }, 500);
    }

    updateOutput();
  })
  .catch((error) => {
    console.error(error);
  });
