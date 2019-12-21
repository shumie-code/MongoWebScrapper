// Grab the articles as a json 
$.getJSON("/articles", function(data) {
    // For loop to iterate through each article 
    for (var i = 0; i < data.length; i++) {
        // Display the appropriate information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
    //Empty the notes from the note section
    $("notes").empty();
    // Save the id from the p tag

    // Now make an ajax call for the Article
    $.ajax({ 
        method: "GET",
        url: "/articles/" + thisid
    })
    // With that done add the note information to the page
    .then(function(data) {
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id the article saved saved to it
        $("#notes").append("<button data-id='" + data._id + " ' id='savenote'>Save Note</button>");

        //If theres a note in the article
        if (data.note) {
            // Place the title of the note in the title input
            $("#titleinput").val(data.note.title);
            // Place the body of the note in the body of the textarea
            $("#bodyinput").val(data.note.body);
        }
    });
});


// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisid = $(this).attr("data-id");

    // RUn a POST request to change the note, using whats entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles" + thisid,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note text area
            body: $("#bodyinput").val()
        }
    })
    // With that done
    .then(function(data) 
    {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
    });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput"),val("");
});