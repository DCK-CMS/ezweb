var Image = require('mongoose').model('Image'),
  cloudinary = require('cloudinary');

module.exports = {
  index: function(req, res) {
    Image.find({}, function(err, images) {
      res.render('admin/gallery/index', {
        title: 'Gallery',
        message: req.flash('error'),
        imageArr: images
      });
      // console.log(images);
    });
  },
  create: function(req, res, next) {
    if(req.body.name){
      var newImage = new Image();
      newImage.name = req.body.name;
      cloudinary.uploader.upload(req.files.img_path.path, function(result) {
        newImage.img_url = result.url;
        newImage.save(function(err) {
          if (err) return next(err);
          res.redirect('/admin/gallery');
        });
      }, {
        public_id: req.body.name
      });
    }else {
      req.flash('error','Please key in a name for the image');
      res.redirect('/admin/gallery');
    }


  },
  show: function(req, res, next) {
    Image.findById(req.params.id, function(err, image) {
      res.json(image);
    });
  },
  update: function(req, res, next) {
    Image.findByIdAndUpdate(req.params.id, req.body, function(err, newImage) {
      if (err) return next(err);

      Image.findById(req.params.id, function(err, image) {
        res.json(image);
      });
    });
  },
  delete: function(req, res, next) {
    Image.findById(req.params.id, function(err, image) {
      image.remove(function(err) {
        if (err) return next(err);
        cloudinary.uploader.destroy(image.name, function(result) {
          res.redirect('/admin/gallery');
        });
      });
    });
  }
};
