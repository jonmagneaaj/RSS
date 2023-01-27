fetch('firmaliste.json')
  .then(response => {
    if(!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  })
  .then(firmaliste => {
    // Get the element where you want to append the list
    let listContainer = document.getElementById("list-container");

    // Create a new div element
    let list = document.createElement("div");
    list.style.display = "flex";
    list.style.flexDirection = "column";

    // Iterate through the firmaliste array
    for (let i = 0; i < firmaliste.length; i++) {
        // Get the current company and floor
        let company = firmaliste[i].company;
        let floor = firmaliste[i].floor;

        // Create a new div element for company and floor
        let newItem = document.createElement("h12");
        newItem.style.marginBottom = "15px";
        newItem.style.display = "flex";
        newItem.style.alignItems = "center";

        // Create h4 element for company
        let companyName = document.createElement("h12");
        companyName.textContent = company;
        companyName.style.textAlign = "left";
        newItem.appendChild(companyName);

        // Create a span element for floor
        let floorNumber = document.createElement("span");
      
        floorNumber.textContent = floor + ". etg";
        floorNumber.style.flexGrow = "1";
        floorNumber.style.textAlign = "right";
        floorNumber.style.paddingLeft = "150px";
        newItem.appendChild(floorNumber);

        // Append the new item to the div
        list.appendChild(newItem);
    }
    // Append the div to the list container
    listContainer.appendChild(list);
  }).catch(error => {
    console.log(error);
  });
