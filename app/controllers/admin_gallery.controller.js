module.exports = {
  index: function(req, res) {
    res.render('admin/gallery/index', {
      title: 'Gallery'
    });
  }
};
