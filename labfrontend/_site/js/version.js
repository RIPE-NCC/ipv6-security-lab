$(function() {
  $.get("/version.txt", function(data) {
    $("#version").html("Lab version: " + data);
  });
});
