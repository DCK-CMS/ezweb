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
  }

};
