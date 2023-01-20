fetch('./resources/firmaliste.json')
  .then(response => {
    if(!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  })
  .then(firmaliste => {
    // Get the element where you want to append the list
    let listContainer = document.getElementById("list-container");

    // Create an array to hold the columns
    let columns = [];
    for (let i = 0; i < 6; i++) {
        let column = document.createElement("div");
        column.classList.add("column");
        let header = document.createElement("h5");
        header.textContent = `${i+1}.etg`;
        column.appendChild(header);
        listContainer.appendChild(column);
        columns.push(column);
    }

    // Iterate through the firmaliste array
    for (let i = 0; i < firmaliste.length; i++) {
        // Get the current company and floor
        let company = firmaliste[i].company;
        let floor = firmaliste[i].floor;

        // Create a new list item
        let newItem = document.createElement("h4");
        newItem.textContent = company;

        // Append the new item to the appropriate column
        columns[(floor-1)%6].appendChild(newItem);
    }
  }).catch(error => {
    console.log(error);
  });
