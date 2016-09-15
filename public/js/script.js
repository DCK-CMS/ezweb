$(function() {
  /* ---- Toggle Sidebar ---- */
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $(".page-container").toggleClass("toggled");
  });

  /* ---- Images selection ---- */
  var ImgsArr = [];

  $(".img-item").click(function(e) {
    e.preventDefault();
    // toggling selection CSS
    $(this).toggleClass("selected");
    $(this).children('.selected-tick').toggleClass("selected");
    var id = $(this).children('.select-img').data('image').id;
    //push selected imgs to an array
    if (ImgsArr.length > 0) {
      for (var i = 0; i < ImgsArr.length; i++) {
        if (ImgsArr[i].id === id) {
          ImgsArr.splice(i, 1);
          console.log(ImgsArr);
          return;
        }
      }
    }
    ImgsArr.push({
      id: id,
      url: $(this).children('.select-img').data('image').url
    });
    console.log(ImgsArr);
  });
  /* ---- Images selected submit ---- */
  $(".chooseImg-btn").click(function(e) {
    e.preventDefault();
    for (var n = 0; n < ImgsArr.length; n++) {
      var html = "<a><img class='select-img' src='" + ImgsArr[n].url + "' /><textarea rows='3'cols='15' name='description'></textarea><input type='hidden' name='img' value='" + ImgsArr[n].id + "'></a>";
      $('.selected-img-container').prepend(html);
    }

  });

  //url shortener
  $("#homeForm").submit(function(e) {
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
    }).done(function(data) {
      $('#imgUrl').val(data.getElementsByTagName('ShortUrl')[0].innerHTML);
      form.submit();
    });
  });

});
