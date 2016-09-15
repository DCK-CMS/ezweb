var Page = require('mongoose').model('Page');
var Image = require('mongoose').model('Image');
var Header = require('mongoose').model('Header');

module.exports = {
  // Admin side logic
  index: function(req, res, next) {
    res.render('admin/pages/index', {
      title: "Pages"
    });
  },

  new: function(req, res, next) {
    Image.find({}, function(err, images) {
      Header.find({}, function(err, headerAttr){

        //retrieve all styles
        var styleArr = headerAttr.filter(function(data){
          return data.type === 'css';
        });
        //retrieve logo name
        var logoUrl = headerAttr.filter(function(data){
          return data.type === 'url';
        });

        console.log(logoUrl);
        res.render('admin/pages/new', {
          title: 'Select your template',
          message: req.flash('error'),
          imageArr: images,
          url: logoUrl,
          styles: styleArr
        });

      });
    });
  },

  create: function(req, res, next) {
    //remove caps and spaces from url
    req.body.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();

    var newPage = new Page(req.body);
    newPage.save(function(err) {
      if (err) {
        for(var key in err.errors){
          req.flash('error',err.errors[key].message);
        }
        res.redirect('/admin/pages/new');
      } else {
        res.json(newPage);
      }


    });
  },
  //admin update
  update: function(req, res, next) {
    Page.findByIdAndUpdate(req.params.id, req.body, function(err, newPage) {
      if (err) return next(err);

      Page.findById(req.params.id, function(err, page) {
        res.json(page);
      });
    });
  },
  //admin delete
  delete: function(req, res, next) {
    Page.findById(req.params.id, function(err, page) {
      page.remove(function(err) {
        if (err) return next(err);

        res.json(page);
      });
    });
  },
  //admin show
  show: function(req, res, next){
    Page.findById(req.params.id, function(err, page){
      Image.find({}, function(err, images) {
        res.render('admin/pages/show', {
          title: 'Editing <page.title> template',
          page: page,
          imageArr: images
        });
      });

    });
  },
  updateHeader: function(req, res, next){
    var reqObj = req.body;
    for(var item in reqObj){

      if(item !== 'url'){
        var attr = item.split('&')[0];
        var classVal = item.split('&')[1];
        console.log("these are items: " + item);

        //retrieve header for each of form values and update
         Header.update({'attribute': attr, 'class': classVal}, {value: reqObj[item]}, function(err, headerAttr){});

      } else {
        console.log({'attribute':item},{value:reqObj[item]});
        Header.update({'attribute':item},{value:reqObj[item]}, function(err, headerAttr){});
      }

    }
    res.redirect('/admin/pages/new');
  }
};
