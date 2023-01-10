const fs = require('fs');
let i = 0; // initialize a counter variable

setInterval(() => {
    fs.readFile('resources/poems.txt', 'utf8', function(err, data) {
        if (err) throw err;
        const strings = data.split('\n\n'); // split the file content by blank lines
        
        // If the counter has reached the end of the list of strings, reset it to 0
        if (i >= strings.length) {
            i = 0;
        }

        // Get the current string
        const string = strings[i];
        // Display the current string
        console.log(string);

        // Increment the counter
        i++;

    });
}, 10000); // 10 second interval