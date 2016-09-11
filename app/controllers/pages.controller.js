var Page = require('mongoose').model('Page');

module.exports = {
  index: function(req, res, next) {
    res.render('admin/pages/index', {
      title: "Pages"
    });
  },

  new: function(req, res, next) {
    res.render('admin/pages/new', {
      title: "Select your template"
    });
  },

  create: function(req, res, next){
    //remove caps and spaces from url
    req.body.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();

    var newPage = new Page(req.body);
    newPage.save(function(err){
      if(err) return next(err);

      res.json(newPage);
    });
  },

  getPage: function(req, res, next){
    var pageArr = [];

    Page.findOne({"slug": req.params.slug}, function(err, page){
      var pageData = page;

      Page.find({}, function(err, pages){
        for(var i = 0; i < pages.length; i++){
          console.log(pages[i].title);
          var pg = {
            title: pages[i].title,
            slug: pages[i].slug
          };
          pageArr.push(pg);
          console.log(pageArr);
        }
        res.render('admin/user/templates/'+page.template+'_template',{pageData: page, arr: pageArr});
      });
    });
  }
};
