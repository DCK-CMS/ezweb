$(function(){
  /* ---- Toggle Sidebar ---- */
  $("#menu-toggle").click( function(e){
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $(".page-container").toggleClass("toggled");

  });

});
