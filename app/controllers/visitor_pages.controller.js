var Page = require('mongoose').model('Page');
var Header = require('mongoose').model('Header');

module.exports =  {
  // Landing page (root)
  getRoot: function(req, res, next) {
    var pageArr = [];
    Page.find({}, function(err, pages){
      if(err) return next(err);

      // loop through retreieve page object
      for (var i = 0; i < pages.length; i++) {
        var pgObj = {
          title: pages[i].title,
          slug: pages[i].slug
        };
        pageArr.push(pgObj);
      }

      res.render('landing_page', {
        arr: pageArr
      });
    });
  },

  // Visitor side logic
  getPage: function(req, res, next){
    var pageArr = [];

    Page.findOne({"slug": req.params.slug}, function(err, page){

      if(err) return next(err);
      if(page){

        var pageData = page;

        if(err) return next(err);

        Page.find({}, function(err, pages){
          if(err) return next(err);

          for(var i = 0; i < pages.length; i++){
            var pg = {
              title: pages[i].title,
              slug: pages[i].slug
            };
            pageArr.push(pg);
          }
          Header.find({'type':'css'}, function(err, headerAttr){

            Header.find({'type':'url'}, function(err, logoUrl){
              res.render('templates/'+page.template+'_template', {
                pageData: page, arr: pageArr, styleArr: headerAttr, url: logoUrl});
            });

          });

        });
      } else {
        console.log('template not found ');
        return res.render('error_partials/404');
      }

    });
  }

};
