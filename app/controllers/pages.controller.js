module.exports = {
  index: function(req, res, next) {
    res.render('admin/pages/index', {
      title: "Admin page"
    });
  }

};
