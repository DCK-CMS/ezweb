var Page = require('mongoose').model('Page');

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
        res.render('templates/'+page.template+'_template', {
          pageData: page, arr: pageArr});
      });
    });
  },
};
