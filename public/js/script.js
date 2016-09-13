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

  //url shortener
  $("#homeForm").submit(function(e){
    e.preventDefault();
    var api_url = "https://sjehutch-passbeemedia-shorturl.p.mashape.com/CreateUrl";
    //user input
    var queryUrl = $('#imgUrl').val();
    //retrieve form object
    var form = this;
    //make ajax call to url shortener
    $.ajax({
      url: api_url,
      dataType: "xml",
      headers: {
        "X-Mashape-Key": "ZZdWwwpLxlmsh4gztf1wv4yL6pLBp1Km2bVjsngmxiEKPQ39vr"
      },
      data: {
        real_url: queryUrl
      }
    }).done(function(data){
      $('#imgUrl').val(data.getElementsByTagName('ShortUrl')[0].innerHTML);
      form.submit();
    });
  });

});
