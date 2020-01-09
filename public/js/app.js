// Onclick function for scrape
$("#scrape").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/scraped/" + thisId
    }).then(function(data) {
        window.location = "/"
    })
});

// Click function for save button
$(".save").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/saved/" +thisId
    }).then(function(data) {
        window.location ="/"
    })
});

// Click function for "delete" button
$(".delete").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/delete/" + thisId
    }).then(function(data) {
        window.location = "/"
    })
});

// Click function for button
