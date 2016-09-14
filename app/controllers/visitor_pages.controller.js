var Page = require('mongoose').model('Page');
var Header = require('mongoose').model('Header');

module.exports =  {
  // Visitor side logic
  getPage: function(req, res, next){
    var pageArr = [];

    Page.findOne({"slug": req.params.slug}, function(err, page){
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

          Header.find({'type':'text'}, function(err, appName){
            res.render('templates/'+page.template+'_template', {
              pageData: page, arr: pageArr, styleArr: headerAttr, logo: appName});
          });

        });

      });
    });
  },

  getHome: function(req, res) {
    res.render('templates/home_test');
  }
};
