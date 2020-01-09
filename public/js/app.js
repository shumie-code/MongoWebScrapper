// Onclick function for scrape
$("#scrape").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/scraped/" + thisId
  }).then(function(data) {
    window.location = "/";
  });
});

// Click function for save button
$(".save").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId
  }).then(function(data) {
    window.location = "/";
  });
});

// Click function for delete button
$(".delete").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/delete/" + thisId
  }).then(function(data) {
    window.location = "/";
  });
});

// Click function for note button
$(".save-note").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      body: $("#noteText" + thisId).val()
    }
  }).then(function(data) {
    console.log(data);
    $("#noteText" + thisId).val("");
    $(".modalNote").modal("hide");
    window.location = "/saved";
  });
});

// Click function for deleting one note
$(".deleteNote").on("click", function() {
  $.ajax({
    method: "POST",
    url: "/deleteNote/" + thisId
  }).then(function(data) {
    console.log(data);
    window.location = "/";
  });
});
