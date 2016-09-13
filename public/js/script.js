$(function(){
  /* ---- Toggle Sidebar ---- */
  $("#menu-toggle").click( function(e){
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $(".page-container").toggleClass("toggled");
  });

  /* ---- Toggle images seletion ---- */
  $(".img-item").click(function(e) {
    e.preventDefault();

    $(this).toggleClass("selected");
    $(this).children('.selected-tick').toggleClass("selected");
  });


});
