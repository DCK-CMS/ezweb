var Image = require('mongoose').model('Image'),
cloudinary = require('cloudinary');

module.exports = {
  index: function(req, res) {
    Image.find({}, function(err, images) {
      res.render('admin/gallery/index', {
        title: 'Gallery',
        imageArr: images
      });
      // console.log(images);
    });
  },
  create: function(req, res, next) {
    console.log(req.body);
    cloudinary.uploader.upload(req.files.img_path.path, function(result) {
      console.log(result.url);
    }, {
      public_id: "test"
    });
    // var newImage = new Image(req.body);
    // newImage.save(function(err){
    //   if(err) return next(err);
    //
    //   res.redirect('/admin/gallery');
    // });
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

        res.json(image);
      });
    });
  }
};
