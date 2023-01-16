// Use the Fetch API to read the JSON file
fetch('/resources/firmaliste.json')
  .then(response => response.json())
  .then(firmaliste => {
    // Get the element where you want to append the list
    let listContainer = document.getElementById("list-container");

    // Iterate through the firmaliste array
    for (let i = 0; i < firmaliste.length; i++) {
        // Get the current company and floor
        let company = firmaliste[i].company;
        let floor = firmaliste[i].floor;

        // Create a new list item
        let newItem = document.createElement("li");
        newItem.innerHTML = `${company} - ${floor}. Etasje`;

        // Append the new item to the list
        listContainer.appendChild(newItem);
    }
  });
