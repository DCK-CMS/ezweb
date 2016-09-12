var Page = require('mongoose').model('Page');

module.exports = {
  // Admin side logic
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
  //admin update
  update: function(req, res, next){
    Page.findByIdAndUpdate(req.params.id, req.body, function(err, newPage){
      if(err) return next(err);

      Page.findById(req.params.id, function(err, page){
        res.json(page);
      });
    });
  },
  //admin delete
  delete: function(req, res, next){
    Page.findById(req.params.id,function(err,page){
      page.remove(function(err){
        if(err) return next(err);

        res.json(page);
      });
    });
  },
  //admin show
  show: function(req, res, next){
    console.log(req.params.id);
    Page.findById(req.params.id, function(err, page){
      res.json(page);
    });
  }
};
