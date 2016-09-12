var Image = require('mongoose').model('Image');

module.exports = {
  index: function(req, res) {
    Image.find({}, function(err, images){
      res.render('admin/gallery/index', {
        title: 'Gallery', imageArr: images
      });
    });
  },
  create: function(req, res, next){
    console.log(req.body);

    var newImage = new Image(req.body);
    newImage.save(function(err){
      if(err) return next(err);

      res.redirect('/admin/gallery');
    });
  }
};
