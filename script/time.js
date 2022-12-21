function updateDate() {
    var date = new Date();
    var day = date.getDay();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var month = date.getMonth();
    var dayOfMonth = date.getDate();
  
    // Pad the minutes with a leading zero if necessary
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    // Convert the day number to the name of the day
    var days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    var dayName = days[day];
  
    // Convert the month number to the name of the month
    var months = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
    var monthName = months[month];
  
    // Insert the date, day, and time into the HTML elements
    document.getElementById("Dhour").innerHTML = "<h1>" + hour + ":" + minutes + "</h1>";
    document.getElementById("Dday").innerHTML = "<h2>" + dayName + "</h2>";
    document.getElementById("Ddate").innerHTML = "<h3>" + dayOfMonth + " " + monthName + "</h3>";
  }
  
  setInterval(updateDate, 60000); // update the date every minute (60000 milliseconds)