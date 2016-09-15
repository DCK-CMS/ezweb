var Page = require('mongoose').model('Page');
var Header = require('mongoose').model('Header');

module.exports =  {
  // Visitor side logic
  getPage: function(req, res, next){
    var pageArr = [];
    Page.findOne({"slug": req.params.slug}, function(err, page){

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
        return res.render('404');
      }

    });
  },

  getHome: function(req, res) {
    res.render('404');
  }
};
